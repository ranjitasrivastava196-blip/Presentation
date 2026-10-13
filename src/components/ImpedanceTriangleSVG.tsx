import React from 'react';

interface TriangleProps {
  r?: number;
  xl?: number;
  xc?: number;
}

export const ImpedanceTriangleSVG: React.FC<TriangleProps> = ({
  r = 3,
  xl = 8,
  xc = 4,
}) => {
  const netX = xl - xc;
  const z = Math.sqrt(r * r + netX * netX);
  const phiDeg = Math.atan2(netX, r) * (180 / Math.PI);
  const powerFactor = r / z;

  // Visual scaling
  const originX = 140;
  const originY = 170;
  const scale = 25; // px per ohm

  const rPx = r * scale;
  const xPx = Math.abs(netX) * scale;
  const isUp = netX >= 0;

  const topX = originX + rPx;
  const topY = isUp ? originY - xPx : originY + xPx;

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col items-center">
      <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
        <span className="font-bold text-slate-200">
          The Impedance Triangle (R - X - Z)
        </span>
        <span className="text-slate-400 font-mono">
          Z = √(R² + (X_L - X_C)²)
        </span>
      </div>

      <div className="w-full flex justify-center py-2 overflow-x-auto">
        <svg viewBox="0 0 500 240" className="w-full max-w-md h-auto">
          {/* Base line: Resistance R */}
          <line
            x1={originX}
            y1={originY}
            x2={originX + rPx}
            y2={originY}
            stroke="#10b981"
            strokeWidth="4"
          />
          <text
            x={originX + rPx / 2}
            y={originY + 22}
            fill="#34d399"
            fontSize="13"
            fontWeight="bold"
            textAnchor="middle"
          >
            Base: Resistance R = {r} Ω
          </text>

          {/* Perpendicular line: Net Reactance (X_L - X_C) */}
          <line
            x1={originX + rPx}
            y1={originY}
            x2={topX}
            y2={topY}
            stroke="#a855f7"
            strokeWidth="4"
          />
          <text
            x={topX + 12}
            y={(originY + topY) / 2}
            fill="#c084fc"
            fontSize="12"
            fontWeight="bold"
            dominantBaseline="middle"
          >
            Perpendicular: X = ({xl} - {xc}) = {netX} Ω
          </text>

          {/* Right angle symbol */}
          <path
            d={`M ${originX + rPx - 14} ${originY} L ${originX + rPx - 14} ${
              isUp ? originY - 14 : originY + 14
            } L ${originX + rPx} ${isUp ? originY - 14 : originY + 14}`}
            fill="none"
            stroke="#64748b"
            strokeWidth="1.5"
          />

          {/* Hypotenuse line: Impedance Z */}
          <line
            x1={originX}
            y1={originY}
            x2={topX}
            y2={topY}
            stroke="#f43f5e"
            strokeWidth="4.5"
          />
          <text
            x={(originX + topX) / 2 - 20}
            y={(originY + topY) / 2 - 12}
            fill="#fb7185"
            fontSize="14"
            fontWeight="bold"
          >
            Hypotenuse: Z = {z.toFixed(2)} Ω
          </text>

          {/* Shaded triangle */}
          <polygon
            points={`${originX},${originY} ${originX + rPx},${originY} ${topX},${topY}`}
            fill="rgba(244, 63, 94, 0.12)"
          />

          {/* Angle arc φ */}
          <path
            d={
              isUp
                ? `M ${originX + 35} ${originY} A 35 35 0 0 0 ${
                    originX + 35 * Math.cos((phiDeg * Math.PI) / 180)
                  } ${originY - 35 * Math.sin((phiDeg * Math.PI) / 180)}`
                : `M ${originX + 35} ${originY} A 35 35 0 0 1 ${
                    originX + 35 * Math.cos((Math.abs(phiDeg) * Math.PI) / 180)
                  } ${originY + 35 * Math.sin((Math.abs(phiDeg) * Math.PI) / 180)}`
            }
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2.5"
          />
          <text
            x={originX + 44}
            y={originY - (isUp ? 8 : -14)}
            fill="#fbbf24"
            fontSize="12"
            fontWeight="bold"
          >
            φ = {Math.abs(phiDeg).toFixed(1)}°
          </text>
        </svg>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 mt-1 text-xs text-center">
        <div className="bg-slate-950 p-2 rounded border border-slate-800">
          <span className="text-slate-400 block text-[10px]">TOTAL IMPEDANCE</span>
          <span className="font-bold text-rose-400 font-mono text-sm">Z = {z.toFixed(2)} Ω</span>
        </div>
        <div className="bg-slate-950 p-2 rounded border border-slate-800">
          <span className="text-slate-400 block text-[10px]">PHASE ANGLE</span>
          <span className="font-bold text-amber-400 font-mono text-sm">φ = {Math.abs(phiDeg).toFixed(1)}°</span>
        </div>
        <div className="bg-slate-950 p-2 rounded border border-slate-800">
          <span className="text-slate-400 block text-[10px]">POWER FACTOR</span>
          <span className="font-bold text-emerald-400 font-mono text-sm">cosφ = {powerFactor.toFixed(3)}</span>
        </div>
        <div className="bg-slate-950 p-2 rounded border border-slate-800">
          <span className="text-slate-400 block text-[10px]">CIRCUIT NATURE</span>
          <span className="font-bold text-indigo-400 font-mono text-xs">
            {netX > 0 ? 'Inductive (Lag)' : netX < 0 ? 'Capacitive (Lead)' : 'Resonant (Unity)'}
          </span>
        </div>
      </div>
    </div>
  );
};
