
import React, { useEffect, useState } from 'react';

interface RotatingLabels3DProps {
  labels: string[];
  radius: number;
  fontSize: number;
  duration: number; // 动画一圈秒数
  color: string;
  centerZ?: number; // 控制3D感强度
  children?: React.ReactNode; // 图片插槽
}

const RotatingLabels3D: React.FC<RotatingLabels3DProps> = ({
  labels,
  radius,
  fontSize,
  duration,
  color,
  centerZ = 60,
  children,
}) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setAngle((prev) => (prev + 360 / (duration * 60)) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration]);

  const count = labels.length;
  type LabelInfo = {
    label: string;
    x: number;
    y: number;
    z: number;
    theta: number;
    idx: number;
    opacity: number;
    scale: number;
  };

  const labelInfos: LabelInfo[] = labels.map((label, i) => {
    const theta = ((360 / count) * i + angle) % 360;
    const rad = (theta * Math.PI) / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    const z = centerZ * Math.sin(rad);
    const frontness = (Math.cos(rad) + 1) / 2;
    const opacity = 0.4 + 0.6 * frontness;
    const scale = 0.85 + 0.25 * frontness;
    return { label, x, y, z, theta, idx: i, opacity, scale };
  });

  const frontLabels = labelInfos.filter(l => l.z >= 0);
  const backLabels = labelInfos.filter(l => l.z < 0);

  backLabels.sort((a, b) => a.z - b.z);
  frontLabels.sort((a, b) => a.z - b.z);

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: radius * 2 + 80,
        height: radius * 2 + 80,
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }}
    >
      {/* 后半圈标签 */}
      {backLabels.map((info) => (
        <span
          key={info.label}
          style={{
            position: 'absolute',
            left: radius + info.x + 40,
            top: radius + info.y + 40,
            transform: `translate(-50%, -50%) scale(${info.scale})`,
            fontSize,
            color,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px #fff8',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: 1,
            opacity: info.opacity * 0.7,
            zIndex: 1,
            filter: 'blur(0.5px)',
          }}
        >
          {info.label}
        </span>
      ))}
      {/* 图片插槽 */}
      {children}
      {/* 前半圈标签 */}
      {frontLabels.map((info) => (
        <span
          key={info.label}
          style={{
            position: 'absolute',
            left: radius + info.x + 40,
            top: radius + info.y + 40,
            transform: `translate(-50%, -50%) scale(${info.scale})`,
            fontSize,
            color,
            fontWeight: 700,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 8px #fff8',
            pointerEvents: 'none',
            userSelect: 'none',
            letterSpacing: 1,
            opacity: info.opacity,
            zIndex: 3,
          }}
        >
          {info.label}
        </span>
      ))}
    </div>
  );
};

export default RotatingLabels3D;
