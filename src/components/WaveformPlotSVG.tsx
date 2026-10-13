import React, { useState } from 'react';

interface WaveformProps {
  mode?: 'resistor' | 'inductor' | 'capacitor' | 'general';
  phaseAngleDeg?: number; // Phase angle of current relative to voltage
}

export const WaveformPlotSVG: React.FC<WaveformProps> = ({
  mode = 'general',
  phaseAngleDeg = 53.13,
}) => {
  const [selectedMode, setSelectedMode] = useState<'resistor' | 'inductor' | 'capacitor' | 'general'>(mode);

  let currentShiftDeg = 0;
  let explanation = '';

  if (selectedMode === 'resistor') {
    currentShiftDeg = 0;
    explanation = 'In Phase: Voltage and Current cross zero and reach peaks at the EXACT same time (φ = 0°).';
  } else if (selectedMode === 'inductor') {
    currentShiftDeg = -90; // Current lags voltage by 90°
    explanation = 'Inductor: Voltage leads Current by 90°. Current reaches peak 1/4 cycle (T/4) LATER.';
  } else if (selectedMode === 'capacitor') {
    currentShiftDeg = 90; // Current leads voltage by 90°
    explanation = 'Capacitor: Current leads Voltage by 90°. Current reaches peak 1/4 cycle (T/4) EARLIER.';
  } else {
    currentShiftDeg = -phaseAngleDeg; // Inductive case (lagging)
    explanation = `General Series R-L-C (${phaseAngleDeg.toFixed(1)}° Lag): Current waveform shifted right by φ.`;
  }

  // Generate SVG path points
  const width = 600;
  const height = 220;
  const centerY = height / 2;
  const amplitudeV = 70;
  const amplitudeI = 50;
  const cycles = 2;

  const pointsV: string[] = [];
  const pointsI: string[] = [];

  for (let x = 0; x <= width; x += 4) {
    const angleRad = (x / width) * (cycles * 2 * Math.PI);
    const yV = centerY - amplitudeV * Math.sin(angleRad);
    pointsV.push(`${x},${yV.toFixed(1)}`);

    const shiftRad = (currentShiftDeg * Math.PI) / 180;
    const yI = centerY - amplitudeI * Math.sin(angleRad + shiftRad);
    pointsI.push(`${x},${yI.toFixed(1)}`);
  }

  const pathV = `M ${pointsV.join(' L ')}`;
  const pathI = `M ${pointsI.join(' L ')}`;

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800 text-xs">
        <span className="font-bold text-slate-200">
          AC Sinusoidal Waveforms: Voltage v(t) vs Current i(t)
        </span>
        <div className="flex gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
          <button
            onClick={() => setSelectedMode('resistor')}
            className={`px-2 py-0.5 rounded font-medium text-[11px] ${
              selectedMode === 'resistor' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pure R (0°)
          </button>
          <button
            onClick={() => setSelectedMode('inductor')}
            className={`px-2 py-0.5 rounded font-medium text-[11px] ${
              selectedMode === 'inductor' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pure L (+90° V Lead)
          </button>
          <button
            onClick={() => setSelectedMode('capacitor')}
            className={`px-2 py-0.5 rounded font-medium text-[11px] ${
              selectedMode === 'capacitor' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pure C (+90° I Lead)
          </button>
          <button
            onClick={() => setSelectedMode('general')}
            className={`px-2 py-0.5 rounded font-medium text-[11px] ${
              selectedMode === 'general' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            R-L-C ({phaseAngleDeg.toFixed(0)}°)
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-lg h-auto" style={{ minWidth: '380px' }}>
          {/* Center time axis */}
          <line x1="0" y1={centerY} x2={width} y2={centerY} stroke="#475569" strokeWidth="1.5" />
          
          {/* Vertical grid lines representing phase angles (90, 180, 270, 360...) */}
          {[0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75].map((fraction, idx) => {
            const x = (fraction / cycles) * width;
            return (
              <line
                key={idx}
                x1={x}
                y1="10"
                x2={x}
                y2={height - 10}
                stroke="#1e293b"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Voltage waveform (Crimson/Rose) */}
          <path d={pathV} fill="none" stroke="#f43f5e" strokeWidth="2.8" strokeLinecap="round" />

          {/* Current waveform (Cyan/Sky) */}
          <path d={pathI} fill="none" stroke="#38bdf8" strokeWidth="2.8" strokeLinecap="round" />

          {/* Legend */}
          <g transform="translate(15, 20)">
            <line x1="0" y1="0" x2="24" y2="0" stroke="#f43f5e" strokeWidth="3" />
            <text x="30" y="4" fill="#f43f5e" fontSize="11" fontWeight="bold">
              Voltage v(t) = V_m sin(ωt)
            </text>

            <line x1="200" y1="0" x2="224" y2="0" stroke="#38bdf8" strokeWidth="3" />
            <text x="230" y="4" fill="#38bdf8" fontSize="11" fontWeight="bold">
              Current i(t) = I_m sin(ωt {currentShiftDeg >= 0 ? `+ ${currentShiftDeg}°` : `${currentShiftDeg}°`})
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-1 text-center text-xs text-slate-300 bg-slate-900/80 p-1.5 rounded border border-slate-800">
        💡 <span className="font-semibold text-emerald-400">{explanation}</span>
      </div>
    </div>
  );
};
