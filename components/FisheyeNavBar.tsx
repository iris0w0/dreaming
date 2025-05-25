import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export type NavItem = {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  id?: string;
  link?: string;
  actionType?: string;
};

const colors = {
  primary: '#F38181',
  accent1: '#EAFFD0',
  accent2: '#95E1D3',
};

function FisheyeNavBar({
  items,
  isMusicPlaying,
  onNavClick,
}: {
  items: NavItem[];
  isMusicPlaying: boolean;
  onNavClick: (item: NavItem) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={`fixed left-0 right-0 bottom-4 z-50 flex justify-center items-center w-full`}
      style={{
        maxWidth: '100vw',
        pointerEvents: 'auto',
      }}
    >
      <div
        className={`
          flex ${isMobile ? 'gap-1 px-2 py-2 overflow-x-auto flex-nowrap' : 'gap-2 md:gap-4 px-4 py-3'}
          rounded-full shadow-2xl bg-white/90 border border-pink-200 backdrop-blur-md
          ${isMobile ? '' : 'overflow-x-visible flex-wrap'}
        `}
        style={{
          background: colors.accent2,
          WebkitOverflowScrolling: 'touch',
          maxWidth: '100vw',
        }}
      >
        {items.map((item, idx) => (
          <div key={item.name} className="relative flex flex-col items-center">
            <button
              onClick={() => onNavClick(item)}
              style={{
                backgroundColor: colors.accent1,
                transform: 'scale(1)',
                zIndex: 0,
                transition: 'transform 0.2s, z-index 0.2s',
              }}
              className={`
                relative ${isMobile ? 'p-2' : 'p-3 md:p-4'} rounded-full flex items-center justify-center
                overflow-hidden font-k2d-regular
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400
                transition-shadow duration-300
              `}
              tabIndex={0}
            >
              {item.actionType === 'toggle-music'
                ? (isMusicPlaying
                  ? <Volume2 className={isMobile ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7"} style={{ color: colors.primary }} />
                  : <VolumeX className={isMobile ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7"} style={{ color: colors.primary }} />)
                : <item.icon className={isMobile ? "w-5 h-5" : "w-6 h-6 md:w-7 md:h-7"} style={{ color: colors.primary }} />}
            </button>
            {/* tips 只桌面端显示 */}
            {!isMobile && (
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded text-xs font-k2d-bold whitespace-nowrap pointer-events-none"
                style={{
                  background: colors.primary,
                  color: '#fff',
                  opacity: 1,
                  transition: 'opacity 0.25s cubic-bezier(.4,2,.3,1)',
                  zIndex: 100,
                  boxShadow: '0 2px 8px 0 #0002',
                }}
              >
                {item.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FisheyeNavBar;