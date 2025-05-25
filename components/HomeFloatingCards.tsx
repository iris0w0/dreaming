import React, { useRef, useEffect, useState } from 'react';

interface FloatingCard {
  id: string;
  imageSrc: string;
}

interface HomeFloatingCardsProps {
  cards: FloatingCard[];
  cardWidth?: number;
  cardHeight?: number;
  speed?: number; // px per second
  centerScale?: number;
  gap?: number;
  hoverScale?: number;
}

const HomeFloatingCards: React.FC<HomeFloatingCardsProps> = ({
  cards,
  cardWidth = 240,
  cardHeight = 320,
  speed = 80,
  centerScale = 1.25,
  gap = 48,
  hoverScale = 1.5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hoveredCardKey, setHoveredCardKey] = useState<string | null>(null);

  // 计算一组卡片的总长度
  const groupLength = cards.length * (cardWidth + gap);

  // 计算需要渲染多少组卡片，保证填满容器
  const minGroups = containerWidth > 0 ? Math.ceil(containerWidth / groupLength) + 2 : 2;

  // 初始化容器宽度
  useEffect(() => {
    if (!containerRef.current) return;
    setContainerWidth(containerRef.current.offsetWidth);
  }, [cardWidth, gap, cards.length]);

  // resize监听
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 动画主循环
  useEffect(() => {
    let lastTime = performance.now();
    let rafId: number;

    const animate = (now: number) => {
      if (paused) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      const dt = (now - lastTime) / 1000; // 秒
      lastTime = now;

      setOffset(prev => {
        let next = prev + speed * dt;
        if (next >= groupLength) {
          next -= groupLength;
        }
        return next;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [speed, cardWidth, gap, paused, groupLength]);

  // 计算中心点
  const centerX = containerWidth / 2;

  // 渲染多组卡片
  const renderedCards = Array.from({ length: minGroups }).flatMap((_, groupIdx) =>
    cards.map((card, i) => {
      const cardKey = `${card.id}-${groupIdx}`;
      const globalIdx = groupIdx * cards.length + i;
      // 计算卡片的基础位置（无缝环形）
      let x = (globalIdx * (cardWidth + gap) - offset) % (groupLength * minGroups);
      // 让卡片居中显示
      x = x - (groupLength * minGroups - containerWidth) / 2;

      // 只渲染在可见区域附近的卡片，提升性能
      if (x + cardWidth < -cardWidth || x > containerWidth + cardWidth) return null;

      // 计算距离中心的归一化距离
      const distToCenter = Math.abs(x + cardWidth / 2 - centerX);
      const maxDist = centerX;
      // scale: 中心最大，边缘最小
      let scale = Math.max(0.8, centerScale - (distToCenter / maxDist) * (centerScale - 0.8));
      // 如果悬停，且是当前卡片，则进一步放大
      if (hoveredCardKey === cardKey) {
        scale = hoverScale;
      }
      // zIndex: 中心最大
      const zIndex = Math.round(1000 - distToCenter) + (hoveredCardKey === cardKey ? 1000 : 0);
      // opacity: 中心1，边缘0.5
      const opacity = Math.max(0.5, 1 - distToCenter / (maxDist * 1.2));

      return (
        <div
          key={cardKey}
          className="absolute transition-transform duration-200"
          style={{
            left: x,
            top: '50%',
            width: cardWidth,
            height: cardHeight,
            transform: `translateY(-50%) scale(${scale})`,
            background: 'transparent',
            borderRadius: 24,
            boxShadow: '0 8px 32px 0 #0002',
            zIndex,
            opacity,
            cursor: 'pointer',
            transition: 'box-shadow 0.3s, opacity 0.3s, transform 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            userSelect: 'none',
          }}
          onMouseEnter={() => {
            setPaused(true);
            setHoveredCardKey(cardKey);
          }}
          onMouseLeave={() => {
            setPaused(false);
            setHoveredCardKey(null);
          }}
        >
          <img
            src={card.imageSrc}
            alt={card.id}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 24,
              display: 'block',
            }}
          />
        </div>
      );
    })
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      style={{ minHeight: cardHeight + 40 }}
    >
      {renderedCards}
    </div>
  );
};

export default HomeFloatingCards;
