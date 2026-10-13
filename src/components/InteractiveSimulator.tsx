import React, { useState } from 'react';
import { CircuitDiagramSVG } from './CircuitDiagramSVG';
import { PhasorDiagramSVG } from './PhasorDiagramSVG';
import { WaveformPlotSVG } from './WaveformPlotSVG';
import { ImpedanceTriangleSVG } from './ImpedanceTriangleSVG';
import { RotateCcw, Zap, Sparkles } from 'lucide-react';

export const InteractiveSimulator: React.FC = () => {
  // Direct parameters matching typical textbook & lab values
  const [resistance, setResistance] = useState<number>(3); // Ohms
  const [inductiveReactance, setInductiveReactance] = useState<number>(8); // Ohms
  const [capacitiveReactance, setCapacitiveReactance] = useState<number>(4); // Ohms
  const [supplyVoltage, setSupplyVoltage] = useState<number>(10); // Volts

  // Derived calculations
  const netX = inductiveReactance - capacitiveReactance;
  const impedanceZ = Math.sqrt(resistance * resistance + netX * netX);
  const currentI = supplyVoltage / (impedanceZ || 0.001);

  const vr = currentI * resistance;
  const vl = currentI * inductiveReactance;
  const vc = currentI * capacitiveReactance;

  const phaseAngleRad = Math.atan2(netX, resistance);
  const phaseAngleDeg = phaseAngleRad * (180 / Math.PI);
  const powerFactor = resistance / impedanceZ;

  // Circuit nature
  const circuitNature =
    Math.abs(netX) < 0.01
      ? 'Resonance'
      : netX > 0
      ? 'Inductive'
      : 'Capacitive';

  // Quick preset loader
  const loadPreset = (preset: 'example' | 'resonance' | 'capacitive' | 'high_q') => {
    if (preset === 'example') {
      setResistance(3);
      setInductiveReactance(8);
      setCapacitiveReactance(4);
      setSupplyVoltage(10);
    } else if (preset === 'resonance') {
      setResistance(5);
      setInductiveReactance(10);
      setCapacitiveReactance(10);
      setSupplyVoltage(20);
    } else if (preset === 'capacitive') {
      setResistance(4);
      setInductiveReactance(3);
      setCapacitiveReactance(7);
      setSupplyVoltage(12);
    } else if (preset === 'high_q') {
      setResistance(1);
      setInductiveReactance(20);
      setCapacitiveReactance(20);
      setSupplyVoltage(10);
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-rose-500/10 text-rose-400 rounded-lg">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Interactive Series R-L-C Circuit Laboratory
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time vector solver: Adjust R, X_L, X_C, and V to see instantaneous changes in phasor diagrams, impedance triangles, and waveforms.
          </p>
        </div>

        {/* Preset buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Presets:</span>
          <button
            onClick={() => loadPreset('example')}
            className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition"
          >
            Slide 9 Example (3-8-4)
          </button>
          <button
            onClick={() => loadPreset('resonance')}
            className="px-2.5 py-1 text-xs bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-300 rounded-lg border border-emerald-700/60 transition flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Snap to Resonance (X_L=X_C)
          </button>
          <button
            onClick={() => loadPreset('capacitive')}
            className="px-2.5 py-1 text-xs bg-amber-900/60 hover:bg-amber-800/80 text-amber-300 rounded-lg border border-amber-700/60 transition"
          >
            Capacitive Leading
          </button>
          <button
            onClick={() => loadPreset('example')}
            title="Reset"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Control Sliders & Live Metrics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sliders (4 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 bg-slate-950/70 p-5 rounded-xl border border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>Adjust Circuit Parameters</span>
            <span className="text-rose-400 font-mono">Live Inputs</span>
          </h3>

          {/* Resistance R */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-emerald-400 font-semibold">Resistance (R):</span>
              <span className="font-mono text-emerald-300 font-bold">{resistance} Ω</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.5"
              value={resistance}
              onChange={(e) => setResistance(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <span className="text-[11px] text-slate-500">Pure opposition, produces heat</span>
          </div>

          {/* Inductive Reactance XL */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-indigo-400 font-semibold">Inductive Reactance (X_L = 2πfL):</span>
              <span className="font-mono text-indigo-300 font-bold">{inductiveReactance} Ω</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="0.5"
              value={inductiveReactance}
              onChange={(e) => setInductiveReactance(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="text-[11px] text-slate-500">Causes voltage to lead current (+90°)</span>
          </div>

          {/* Capacitive Reactance XC */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-amber-400 font-semibold">Capacitive Reactance (X_C = 1/2πfC):</span>
              <span className="font-mono text-amber-300 font-bold">{capacitiveReactance} Ω</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="0.5"
              value={capacitiveReactance}
              onChange={(e) => setCapacitiveReactance(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <span className="text-[11px] text-slate-500">Causes current to lead voltage (+90°)</span>
          </div>

          {/* Supply Voltage V */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-rose-400 font-semibold">Supply Voltage (V RMS):</span>
              <span className="font-mono text-rose-300 font-bold">{supplyVoltage} V</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="1"
              value={supplyVoltage}
              onChange={(e) => setSupplyVoltage(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <span className="text-[11px] text-slate-500">AC mains / lab signal source</span>
          </div>

          {/* Quick Resonance trigger */}
          <div className="pt-2">
            <button
              onClick={() => {
                setCapacitiveReactance(inductiveReactance);
              }}
              className="w-full py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Set X_C = X_L (Simulate Resonance Now)
            </button>
          </div>
        </div>

        {/* Live Metrics Grid (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Status banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between ${
              circuitNature === 'Resonance'
                ? 'bg-emerald-950/80 border-emerald-500/70 text-emerald-200'
                : circuitNature === 'Inductive'
                ? 'bg-indigo-950/80 border-indigo-500/70 text-indigo-200'
                : 'bg-amber-950/80 border-amber-500/70 text-amber-200'
            }`}
          >
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold opacity-75">
                Current Operating State
              </div>
              <div className="text-base font-bold flex items-center gap-2">
                <span>
                  {circuitNature === 'Resonance' && '🎯 SERIES RESONANCE (X_L = X_C)'}
                  {circuitNature === 'Inductive' && '⚡ INDUCTIVE CIRCUIT (X_L > X_C)'}
                  {circuitNature === 'Capacitive' && '🔋 CAPACITIVE CIRCUIT (X_C > X_L)'}
                </span>
              </div>
            </div>
            <div className="text-right text-xs font-mono">
              <span className="block font-bold">
                {circuitNature === 'Resonance' && 'V & I in Phase (φ = 0°)'}
                {circuitNature === 'Inductive' && 'Current LAGS Voltage'}
                {circuitNature === 'Capacitive' && 'Current LEADS Voltage'}
              </span>
              <span className="text-[11px] opacity-80">
                cosφ = {powerFactor.toFixed(3)}
              </span>
            </div>
          </div>

          {/* 6 Essential Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Net Reactance X</span>
              <div className="text-lg font-bold font-mono text-purple-400 mt-1">
                {netX >= 0 ? `+${netX.toFixed(2)}` : netX.toFixed(2)} Ω
              </div>
              <span className="text-[10px] text-slate-500">X_L - X_C</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Total Impedance Z</span>
              <div className="text-lg font-bold font-mono text-rose-400 mt-1">
                {impedanceZ.toFixed(2)} Ω
              </div>
              <span className="text-[10px] text-slate-500">√(R² + X²)</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Circuit Current I</span>
              <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                {currentI.toFixed(2)} A
              </div>
              <span className="text-[10px] text-slate-500">V / Z</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Phase Angle φ</span>
              <div className="text-lg font-bold font-mono text-amber-400 mt-1">
                {Math.abs(phaseAngleDeg).toFixed(1)}°
              </div>
              <span className="text-[10px] text-slate-500">
                {netX > 0 ? 'Lagging' : netX < 0 ? 'Leading' : 'In Phase'}
              </span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Power Factor</span>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                {powerFactor.toFixed(3)}
              </div>
              <span className="text-[10px] text-slate-500">cosφ = R / Z</span>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">Voltage Drops</span>
              <div className="text-xs font-mono text-slate-300 mt-1">
                V_R = <span className="text-emerald-400">{vr.toFixed(1)}V</span>
              </div>
              <div className="text-xs font-mono text-slate-300">
                V_L = <span className="text-indigo-400">{vl.toFixed(1)}V</span>, V_C = <span className="text-amber-400">{vc.toFixed(1)}V</span>
              </div>
            </div>
          </div>

          {/* Real-time Impedance Triangle rendering */}
          <ImpedanceTriangleSVG r={resistance} xl={inductiveReactance} xc={capacitiveReactance} />
        </div>
      </div>

      {/* Live Waveform and Phasor side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            1. Vector Phasor Diagram for Current Settings
          </h4>
          <PhasorDiagramSVG
            vrValue={vr}
            vlValue={vl}
            vcValue={vc}
            currentValue={currentI}
            showControls={false}
          />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            2. Sinusoidal Waveforms v(t) & i(t)
          </h4>
          <WaveformPlotSVG
            mode="general"
            phaseAngleDeg={phaseAngleDeg}
          />
        </div>
      </div>
    </div>
  );
};
