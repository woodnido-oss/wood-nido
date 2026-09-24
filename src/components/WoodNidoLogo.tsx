import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark'; // light: for white/light bg, dark: for dark header/footer
  showText?: boolean;
  showSubtitle?: boolean;
}

/**
 * WoodNidoLogo - Vector component precisely matching the official Wood Nido branding:
 * - Rich walnut timber wood textured stylized house silhouette
 * - Warm interior golden window and timber door slats
 * - Fine architectural construction blueprint lines behind the roof
 * - Graceful curved golden swoosh arch
 * - Distinctive "WOOD NIDO" typography in walnut brown & polished bronze gold
 * - "www.woodnido.com" subtitle
 */
export const WoodNidoLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'light',
  showText = true,
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[8px]', gap: 'gap-2' },
    md: { icon: 'w-11 h-11', text: 'text-2xl', sub: 'text-[9.5px]', gap: 'gap-3' },
    lg: { icon: 'w-14 h-14', text: 'text-3xl', sub: 'text-xs', gap: 'gap-3.5' },
    xl: { icon: 'w-20 h-20', text: 'text-4xl', sub: 'text-sm', gap: 'gap-4' },
  };

  const currentSize = sizeMap[size];
  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center ${currentSize.gap} select-none ${className}`}>
      {/* Precision Vector Emblem matching user's uploaded logo */}
      <div className={`relative ${currentSize.icon} shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Wood Grain Gradient */}
            <linearGradient id="woodTexture" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#633919" />
              <stop offset="40%" stopColor="#43220c" />
              <stop offset="70%" stopColor="#6c3d1b" />
              <stop offset="100%" stopColor="#3d1e0a" />
            </linearGradient>

            {/* Bronze Gold Accent Gradient */}
            <linearGradient id="bronzeGold" x1="0" y1="0" x2="1" y2="0.8">
              <stop offset="0%" stopColor="#f5c26b" />
              <stop offset="45%" stopColor="#cf9137" />
              <stop offset="85%" stopColor="#9a651c" />
              <stop offset="100%" stopColor="#e5aa49" />
            </linearGradient>

            {/* Lighter Wood highlight */}
            <linearGradient id="woodBevel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#935728" />
              <stop offset="100%" stopColor="#43220c" />
            </linearGradient>
          </defs>

          {/* 1. Fine Architectural Construction Blueprint / Grid Lines (Golden Ochre / Bronze) */}
          <g stroke="#b88339" strokeWidth="1.2" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round">
            {/* Extended ridge line */}
            <line x1="82" y1="20" x2="82" y2="35" />
            {/* Vertical grid lines right side */}
            <line x1="97" y1="26" x2="97" y2="85" />
            <line x1="120" y1="36" x2="120" y2="92" />
            <line x1="125" y1="78" x2="125" y2="95" />
            {/* Horizontal construction guide lines */}
            <line x1="80" y1="38" x2="128" y2="38" />
            <line x1="97" y1="52" x2="132" y2="52" />
            <line x1="97" y1="72" x2="122" y2="72" />
            {/* Structural corner lines */}
            <path d="M103 44H116V62" fill="none" />
            <path d="M91 66H105V88H120" fill="none" />
          </g>

          {/* 2. Main Wooden House Silhouette with Rich Timber Fill */}
          {/* Main Gabled Roof Outline & Siding */}
          <path
            d="M80 32L124 64V102H36V64L80 32Z"
            fill="url(#woodTexture)"
          />

          {/* House Left Overhanging Eaves (Thick solid timber) */}
          <path
            d="M80 27L28 66L34 74L80 39L126 74L132 66L80 27Z"
            fill="url(#woodBevel)"
            stroke="#2b1407"
            strokeWidth="0.8"
          />

          {/* Roof Chimney / Vertical Element */}
          <path
            d="M82 22H91V40L82 33V22Z"
            fill="url(#woodTexture)"
            stroke="#b88339"
            strokeWidth="0.8"
          />

          {/* 3. Vertical Warm Wood Slats (Left facade) */}
          <g stroke="url(#bronzeGold)" strokeWidth="1.6" strokeLinecap="round">
            <line x1="43" y1="72" x2="43" y2="101" />
            <line x1="49" y1="67" x2="49" y2="101" />
            <line x1="55" y1="62" x2="55" y2="101" />
            <line x1="61" y1="57" x2="61" y2="101" />
          </g>

          {/* 4. Golden Quadrant Window (4-Pane Warm Interior Light) */}
          <g fill="url(#bronzeGold)">
            <rect x="69" y="55" width="9" height="9" rx="0.5" />
            <rect x="81" y="55" width="9" height="9" rx="0.5" />
            <rect x="69" y="67" width="9" height="9" rx="0.5" />
            <rect x="81" y="67" width="9" height="9" rx="0.5" />
          </g>

          {/* 5. Center Doorway Frame (Warm wood tone) */}
          <path
            d="M90 64H104V102H90V64Z"
            fill="none"
            stroke="url(#bronzeGold)"
            strokeWidth="2"
          />

          {/* 6. Elegant Golden Curved Arch Foundation (The iconic swoosh) */}
          <path
            d="M20 108C56 97 104 97 140 108C104 100 56 100 20 108Z"
            fill="url(#bronzeGold)"
          />
          <path
            d="M26 107.5C58 98.5 102 98.5 134 107.5"
            stroke="#f5c26b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography: WOOD NIDO + www.woodnido.com */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${currentSize.text} ${
                isDark ? 'text-stone-100' : 'text-[#43220c]'
              }`}
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
            >
              WOOD
            </span>
            <span
              className={`font-black tracking-tight ${currentSize.text} bg-gradient-to-r from-[#d49942] via-[#b87c28] to-[#e6b158] bg-clip-text text-transparent`}
              style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
            >
              NIDO
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-[0.5px] w-2.5 bg-gradient-to-r from-transparent to-[#b87c28]" />
              <span
                className={`text-[9px] tracking-widest font-bold uppercase ${
                  isDark ? 'text-[#d49942]' : 'text-[#8b5a2b]'
                }`}
              >
                www.woodnido.com
              </span>
              <span className="h-[0.5px] w-2.5 bg-gradient-to-l from-transparent to-[#b87c28]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
