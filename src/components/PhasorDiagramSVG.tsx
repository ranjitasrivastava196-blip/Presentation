import React, { useState } from 'react';

interface PhasorProps {
  vrValue?: number; // e.g. 6V
  vlValue?: number; // e.g. 16V
  vcValue?: number; // e.g. 8V
  currentValue?: number; // e.g. 2A
  initialCase?: 'inductive' | 'capacitive' | 'resonance';
  showControls?: boolean;
}

export const PhasorDiagramSVG: React.FC<PhasorProps> = ({
  vrValue = 6,
  vlValue = 16,
  vcValue = 8,
  currentValue = 2,
  initialCase = 'inductive',
  showControls = true,
}) => {
  const [activeCase, setActiveCase] = useState<'inductive' | 'capacitive' | 'resonance'>(initialCase);

  // Dynamic values depending on activeCase tab
  let vr = vrValue;
  let vl = vlValue;
  let vc = vcValue;

  if (activeCase === 'inductive') {
    vr = 6;
    vl = 16;
    vc = 8;
  } else if (activeCase === 'capacitive') {
    vr = 6;
    vl = 6;
    vc = 14;
  } else if (activeCase === 'resonance') {
    vr = 8;
    vl = 12;
    vc = 12;
  }

  const netReactiveV = vl - vc;
  const totalSupplyV = Math.sqrt(vr * vr + netReactiveV * netReactiveV);
  const phaseAngleDeg = (Math.atan2(netReactiveV, vr) * (180 / Math.PI));

  // Graphical scaling factors
  const originX = 180;
  const originY = 200;
  const scale = 11; // pixels per volt

  const vrPx = vr * scale;
  const vlPx = vl * scale;
  const vcPx = vc * scale;
  const netReactivePx = Math.abs(netReactiveV) * scale;
  const isUpward = netReactiveV >= 0;

  // Supply voltage vector end point
  const vEndX = originX + vrPx;
  const vEndY = originY - (netReactiveV * scale);

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl flex flex-col items-center">
      {/* Header with Case Toggle */}
      <div className="w-full flex flex-wrap items-center justify-between pb-3 mb-2 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span className="font-bold text-slate-200 text-sm tracking-wide">
            Series R-L-C Phasor Diagram (Reference: Current I)
          </span>
        </div>

        {showControls && (
          <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveCase('inductive')}
              className={`px-3 py-1 rounded transition-colors font-semibold ${
                activeCase === 'inductive'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Inductive (V_L &gt; V_C)
            </button>
            <button
              onClick={() => setActiveCase('capacitive')}
              className={`px-3 py-1 rounded transition-colors font-semibold ${
                activeCase === 'capacitive'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Capacitive (V_C &gt; V_L)
            </button>
            <button
              onClick={() => setActiveCase('resonance')}
              className={`px-3 py-1 rounded transition-colors font-semibold ${
                activeCase === 'resonance'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Resonance (V_L = V_C)
            </button>
          </div>
        )}
      </div>

      {/* Phasor Vector SVG Canvas */}
      <div className="w-full flex justify-center py-2 overflow-x-auto">
        <svg viewBox="0 0 620 400" className="w-full max-w-xl h-auto" style={{ minWidth: '460px' }}>
          <defs>
            {/* Vector arrowheads */}
            <marker id="arrow-vr" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
            <marker id="arrow-vl" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
            </marker>
            <marker id="arrow-vc" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
            </marker>
            <marker id="arrow-v" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
            </marker>
            <marker id="arrow-i" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
            </marker>
            <marker id="arrow-net" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
            </marker>
          </defs>

          {/* Background Grid */}
          <line x1="30" y1={originY} x2="580" y2={originY} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={originX} y1="30" x2={originX} y2="370" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

          {/* Origin O marker */}
          <circle cx={originX} cy={originY} r="4" fill="#94a3b8" />
          <text x={originX - 18} y={originY + 18} fill="#94a3b8" fontSize="13" fontWeight="bold">
            O
          </text>

          {/* AXIS LABELS */}
          <text x="560" y={originY - 8} fill="#64748b" fontSize="11" fontFamily="monospace">
            +X (Reference)
          </text>
          <text x={originX + 8} y="45" fill="#64748b" fontSize="11" fontFamily="monospace">
            +Y (+90° Lead)
          </text>
          <text x={originX + 8} y="365" fill="#64748b" fontSize="11" fontFamily="monospace">
            -Y (-90° Lag)
          </text>

          {/* 1. CURRENT VECTOR I (Reference, cyan, along +X axis) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + 110}
            y2={originY}
            stroke="#38bdf8"
            strokeWidth="3.5"
            markerEnd="url(#arrow-i)"
          />
          <text x={originX + 115} y={originY + 20} fill="#38bdf8" fontSize="13" fontWeight="bold">
            I (Reference Phasor)
          </text>

          {/* 2. RESISTOR VOLTAGE V_R (Horizontal to the right, green) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + vrPx}
            y2={originY}
            stroke="#10b981"
            strokeWidth="4"
            markerEnd="url(#arrow-vr)"
          />
          <text x={originX + vrPx / 2} y={originY - 10} fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            V_R = I·R ({vr}V)
          </text>

          {/* 3. INDUCTOR VOLTAGE V_L (Vertically upwards, purple) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX}
            y2={originY - vlPx}
            stroke="#818cf8"
            strokeWidth="3.5"
            markerEnd="url(#arrow-vl)"
          />
          <text x={originX - 12} y={originY - vlPx + 15} fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="end">
            V_L = I·X_L ({vl}V)
          </text>

          {/* 4. CAPACITOR VOLTAGE V_C (Vertically downwards, amber) */}
          <line
            x1={originX}
            y1={originY}
            x2={originX}
            y2={originY + vcPx}
            stroke="#f59e0b"
            strokeWidth="3.5"
            markerEnd="url(#arrow-vc)"
          />
          <text x={originX - 12} y={originY + vcPx - 5} fill="#fcd34d" fontSize="13" fontWeight="bold" textAnchor="end">
            V_C = I·X_C ({vc}V)
          </text>

          {/* 5. NET REACTIVE VOLTAGE (V_L - V_C) */}
          {Math.abs(netReactiveV) > 0.1 && (
            <>
              {/* Thick net vector along vertical axis */}
              <line
                x1={originX + 4}
                y1={originY}
                x2={originX + 4}
                y2={originY - (netReactiveV * scale)}
                stroke="#c084fc"
                strokeWidth="4"
                markerEnd="url(#arrow-net)"
              />
              <text
                x={originX + 16}
                y={originY - (netReactiveV * scale) / 2 + 4}
                fill="#e9d5ff"
                fontSize="12"
                fontWeight="bold"
              >
                {netReactiveV > 0 ? `(V_L - V_C) = +${netReactiveV}V` : `(V_C - V_L) = ${Math.abs(netReactiveV)}V`}
              </text>

              {/* Dotted projection box for parallelogram / triangle */}
              <line
                x1={originX}
                y1={originY - (netReactiveV * scale)}
                x2={vEndX}
                y2={vEndY}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <line
                x1={originX + vrPx}
                y1={originY}
                x2={vEndX}
                y2={vEndY}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Shaded triangle area */}
              <polygon
                points={`${originX},${originY} ${originX + vrPx},${originY} ${vEndX},${vEndY}`}
                fill={netReactiveV > 0 ? 'rgba(244, 63, 94, 0.12)' : 'rgba(245, 158, 11, 0.12)'}
              />
            </>
          )}

          {/* 6. RESULTANT SUPPLY VOLTAGE V (Hypotenuse, bold crimson) */}
          <line
            x1={originX}
            y1={originY}
            x2={vEndX}
            y2={vEndY}
            stroke="#f43f5e"
            strokeWidth="5"
            markerEnd="url(#arrow-v)"
          />
          <text
            x={vEndX + 14}
            y={vEndY + (netReactiveV >= 0 ? -4 : 14)}
            fill="#fb7185"
            fontSize="14"
            fontWeight="bold"
          >
            V = {totalSupplyV.toFixed(1)}V
          </text>

          {/* 7. PHASE ANGLE φ ARC */}
          {Math.abs(phaseAngleDeg) > 1 && (
            <g>
              <path
                d={
                  isUpward
                    ? `M ${originX + 45} ${originY} A 45 45 0 0 0 ${
                        originX + 45 * Math.cos((phaseAngleDeg * Math.PI) / 180)
                      } ${originY - 45 * Math.sin((phaseAngleDeg * Math.PI) / 180)}`
                    : `M ${originX + 45} ${originY} A 45 45 0 0 1 ${
                        originX + 45 * Math.cos((Math.abs(phaseAngleDeg) * Math.PI) / 180)
                      } ${originY + 45 * Math.sin((Math.abs(phaseAngleDeg) * Math.PI) / 180)}`
                }
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
              />
              <text
                x={originX + 54}
                y={originY - (netReactiveV >= 0 ? 12 : -18)}
                fill="#fbbf24"
                fontSize="12"
                fontWeight="bold"
              >
                φ = {Math.abs(phaseAngleDeg).toFixed(1)}°
              </text>
            </g>
          )}

          {/* Resonance label if V_L = V_C */}
          {activeCase === 'resonance' && (
            <g>
              <rect x="250" y="70" width="220" height="42" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="360" y="96" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">
                RESONANCE: V_L = V_C (Net X = 0, φ = 0°)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Case analysis breakdown card */}
      <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
        <div className={`p-2.5 rounded-lg border ${activeCase === 'inductive' ? 'bg-indigo-950/60 border-indigo-500' : 'bg-slate-900 border-slate-800'}`}>
          <div className="font-bold text-indigo-300 flex items-center justify-between">
            <span>Case 1: Inductive (X_L &gt; X_C)</span>
            {activeCase === 'inductive' && <span className="text-[10px] bg-indigo-500 text-white px-1.5 rounded">Active</span>}
          </div>
          <p className="text-slate-300 mt-1">
            • V_L dominates V_C → Net reactive voltage points UPWARDS.
          </p>
          <p className="text-indigo-400 font-semibold mt-0.5">
            • Result: Supply Voltage leads Current (Current LAGS by φ).
          </p>
        </div>

        <div className={`p-2.5 rounded-lg border ${activeCase === 'capacitive' ? 'bg-amber-950/60 border-amber-500' : 'bg-slate-900 border-slate-800'}`}>
          <div className="font-bold text-amber-300 flex items-center justify-between">
            <span>Case 2: Capacitive (X_C &gt; X_L)</span>
            {activeCase === 'capacitive' && <span className="text-[10px] bg-amber-500 text-white px-1.5 rounded">Active</span>}
          </div>
          <p className="text-slate-300 mt-1">
            • V_C dominates V_L → Net reactive voltage points DOWNWARDS.
          </p>
          <p className="text-amber-400 font-semibold mt-0.5">
            • Result: Current leads Supply Voltage (Voltage LAGS by φ).
          </p>
        </div>

        <div className={`p-2.5 rounded-lg border ${activeCase === 'resonance' ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-900 border-slate-800'}`}>
          <div className="font-bold text-emerald-300 flex items-center justify-between">
            <span>Case 3: Resonance (X_L = X_C)</span>
            {activeCase === 'resonance' && <span className="text-[10px] bg-emerald-500 text-white px-1.5 rounded">Active</span>}
          </div>
          <p className="text-slate-300 mt-1">
            • V_L and V_C cancel completely (180° opposite).
          </p>
          <p className="text-emerald-400 font-semibold mt-0.5">
            • Result: V = V_R, φ = 0°, Power Factor = 1.0 (Unity).
          </p>
        </div>
      </div>
    </div>
  );
};
