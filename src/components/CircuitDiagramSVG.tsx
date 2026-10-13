import React, { useState } from 'react';

interface CircuitProps {
  interactive?: boolean;
  highlightComponent?: 'R' | 'L' | 'C' | 'source' | 'all' | null;
  currentAmps?: number;
  resistance?: number;
  inductiveReactance?: number;
  capacitiveReactance?: number;
}

export const CircuitDiagramSVG: React.FC<CircuitProps> = ({
  interactive = true,
  highlightComponent = 'all',
  currentAmps = 2,
  resistance = 3,
  inductiveReactance = 8,
  capacitiveReactance = 4,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const vr = (currentAmps * resistance).toFixed(1);
  const vl = (currentAmps * inductiveReactance).toFixed(1);
  const vc = (currentAmps * capacitiveReactance).toFixed(1);

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-4 shadow-xl flex flex-col items-center select-none">
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
        <span className="font-semibold text-slate-300 tracking-wide uppercase flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
          Electrical Schematic: Series R-L-C Circuit
        </span>
        <span className="text-slate-400 font-mono">Single Current Loop: I is Common</span>
      </div>

      <div className="w-full flex justify-center overflow-x-auto py-2">
        <svg
          viewBox="0 0 740 320"
          className="w-full max-w-2xl h-auto transition-all duration-300"
          style={{ minWidth: '460px' }}
        >
          <defs>
            {/* Arrowhead marker */}
            <marker
              id="arrow-current"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker
              id="arrow-voltage"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#fb7185" />
            </marker>
          </defs>

          {/* Grid background subtle */}
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
          </pattern>
          <rect width="740" height="320" fill="url(#grid)" rx="8" />

          {/* MAIN CONDUCTOR WIRES (Single Series Loop) */}
          {/* Top wire from source to R */}
          <line x1="80" y1="160" x2="80" y2="70" stroke="#94a3b8" strokeWidth="3" />
          <line x1="80" y1="70" x2="190" y2="70" stroke="#94a3b8" strokeWidth="3" />

          {/* Wire between R and L */}
          <line x1="290" y1="70" x2="350" y2="70" stroke="#94a3b8" strokeWidth="3" />

          {/* Wire between L and C */}
          <line x1="470" y1="70" x2="530" y2="70" stroke="#94a3b8" strokeWidth="3" />

          {/* Wire from C to right vertical leg */}
          <line x1="610" y1="70" x2="660" y2="70" stroke="#94a3b8" strokeWidth="3" />
          <line x1="660" y1="70" x2="660" y2="250" stroke="#94a3b8" strokeWidth="3" />

          {/* Bottom wire returning to AC source */}
          <line x1="660" y1="250" x2="80" y2="250" stroke="#94a3b8" strokeWidth="3" />
          <line x1="80" y1="250" x2="80" y2="160" stroke="#94a3b8" strokeWidth="3" />

          {/* CURRENT INDICATOR ARROWS ALONG LOOP */}
          {/* Top flow arrow */}
          <line
            x1="110"
            y1="70"
            x2="155"
            y2="70"
            stroke="#38bdf8"
            strokeWidth="3.5"
            markerEnd="url(#arrow-current)"
          />
          <text x="132" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Current I →
          </text>

          {/* Return flow arrow */}
          <line
            x1="400"
            y1="250"
            x2="320"
            y2="250"
            stroke="#38bdf8"
            strokeWidth="3.5"
            markerEnd="url(#arrow-current)"
          />
          <text x="360" y="272" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
            Same Current I returns ←
          </text>

          {/* 1. AC VOLTAGE SOURCE (Left Vertical Branch) */}
          <g
            className="cursor-pointer transition-transform"
            onMouseEnter={() => setHovered('source')}
            onMouseLeave={() => setHovered(null)}
          >
            <circle
              cx="80"
              cy="160"
              r="28"
              fill={hovered === 'source' ? '#1e293b' : '#0f172a'}
              stroke="#fb7185"
              strokeWidth="3"
            />
            {/* Sine wave inside AC symbol */}
            <path
              d="M 64 160 Q 72 142 80 160 T 96 160"
              fill="none"
              stroke="#fb7185"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="80" y="208" fill="#fda4af" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              V ~
            </text>
            <text x="80" y="224" fill="#94a3b8" fontSize="10" textAnchor="middle">
              AC Supply
            </text>
          </g>

          {/* 2. RESISTOR R (Top Branch: 190 to 290) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHovered('R')}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Highlight box */}
            <rect
              x="180"
              y="38"
              width="120"
              height="64"
              rx="8"
              fill={hovered === 'R' ? 'rgba(52, 211, 153, 0.15)' : 'transparent'}
              stroke={hovered === 'R' ? '#34d399' : 'transparent'}
              strokeWidth="1.5"
            />
            {/* Resistor zigzag symbol */}
            <path
              d="M 190 70 L 200 70 L 207 55 L 221 85 L 235 55 L 249 85 L 263 55 L 277 85 L 284 70 L 290 70"
              fill="none"
              stroke="#34d399"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <text x="240" y="32" fill="#6ee7b7" fontSize="15" fontWeight="bold" textAnchor="middle">
              Resistor R
            </text>
            <text x="240" y="120" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">
              V_R = I × R ({vr} V)
            </text>
            <text x="240" y="136" fill="#6ee7b7" fontSize="10" textAnchor="middle">
              φ = 0° (In Phase)
            </text>
          </g>

          {/* 3. INDUCTOR L (Top Branch: 350 to 470) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHovered('L')}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x="340"
              y="38"
              width="140"
              height="64"
              rx="8"
              fill={hovered === 'L' ? 'rgba(167, 139, 250, 0.15)' : 'transparent'}
              stroke={hovered === 'L' ? '#a78bfa' : 'transparent'}
              strokeWidth="1.5"
            />
            {/* Realistic inductor coils */}
            <path
              d="M 350 70 
                 C 350 48, 380 48, 380 70 
                 C 380 48, 410 48, 410 70 
                 C 410 48, 440 48, 440 70 
                 C 440 48, 470 48, 470 70"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <text x="410" y="32" fill="#c4b5fd" fontSize="15" fontWeight="bold" textAnchor="middle">
              Inductor L
            </text>
            <text x="410" y="120" fill="#ddd6fe" fontSize="11" textAnchor="middle" fontFamily="monospace">
              V_L = I × X_L ({vl} V)
            </text>
            <text x="410" y="136" fill="#c4b5fd" fontSize="10" textAnchor="middle">
              V_L leads I by +90°
            </text>
          </g>

          {/* 4. CAPACITOR C (Top Branch: 530 to 610) */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHovered('C')}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x="520"
              y="38"
              width="100"
              height="64"
              rx="8"
              fill={hovered === 'C' ? 'rgba(251, 146, 60, 0.15)' : 'transparent'}
              stroke={hovered === 'C' ? '#fb923c' : 'transparent'}
              strokeWidth="1.5"
            />
            {/* Left wire to plate */}
            <line x1="530" y1="70" x2="562" y2="70" stroke="#94a3b8" strokeWidth="3" />
            {/* Parallel plates */}
            <line x1="562" y1="48" x2="562" y2="92" stroke="#fb923c" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="578" y1="48" x2="578" y2="92" stroke="#fb923c" strokeWidth="4.5" strokeLinecap="round" />
            {/* Right wire from plate */}
            <line x1="578" y1="70" x2="610" y2="70" stroke="#94a3b8" strokeWidth="3" />

            <text x="570" y="32" fill="#fdba74" fontSize="15" fontWeight="bold" textAnchor="middle">
              Capacitor C
            </text>
            <text x="570" y="120" fill="#fed7aa" fontSize="11" textAnchor="middle" fontFamily="monospace">
              V_C = I × X_C ({vc} V)
            </text>
            <text x="570" y="136" fill="#fdba74" fontSize="10" textAnchor="middle">
              I leads V_C by +90°
            </text>
          </g>

          {/* TOTAL VOLTAGE PHASOR SUM BANNER AT BOTTOM */}
          <g transform="translate(140, 160)">
            <rect x="0" y="0" width="460" height="42" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="230" y="26" fill="#f8fafc" fontSize="12" fontWeight="600" textAnchor="middle">
              Supply Voltage: <tspan fill="#fb7185">V = √(V_R² + (V_L - V_C)²)</tspan> ≠ V_R + V_L + V_C
            </text>
          </g>
        </svg>
      </div>

      {interactive && (
        <div className="w-full grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-800 text-center text-xs">
          <div className="bg-slate-800/80 p-2 rounded-lg border border-emerald-500/30">
            <span className="text-emerald-400 font-bold block">Resistor R: In Phase</span>
            <span className="text-slate-400">Current and voltage cross zero together (φ = 0°)</span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded-lg border border-indigo-500/30">
            <span className="text-indigo-400 font-bold block">Inductor L: Voltage Leads</span>
            <span className="text-slate-400">V_L peaks 90° before Current I (ELI)</span>
          </div>
          <div className="bg-slate-800/80 p-2 rounded-lg border border-amber-500/30">
            <span className="text-amber-400 font-bold block">Capacitor C: Current Leads</span>
            <span className="text-slate-400">Current I peaks 90° before V_C (ICE)</span>
          </div>
        </div>
      )}
    </div>
  );
};
