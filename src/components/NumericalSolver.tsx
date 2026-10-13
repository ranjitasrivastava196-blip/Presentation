import React, { useState } from 'react';
import { CheckCircle2, ChevronRight, Calculator, Award } from 'lucide-react';

export const NumericalSolver: React.FC = () => {
  // Step reveal state for presentation
  const [activeStep, setActiveStep] = useState<number>(5); // default show all, or let student reveal step-by-step

  // Custom solver mode
  const [customMode, setCustomMode] = useState<boolean>(false);
  const [customR, setCustomR] = useState<number>(3);
  const [customXl, setCustomXl] = useState<number>(8);
  const [customXc, setCustomXc] = useState<number>(4);
  const [customV, setCustomV] = useState<number>(10);

  // Computed custom values
  const cNetX = customXl - customXc;
  const cZ = Math.sqrt(customR * customR + cNetX * cNetX);
  const cI = customV / (cZ || 0.0001);
  const cPhiDeg = Math.atan2(cNetX, customR) * (180 / Math.PI);
  const cCosPhi = customR / (cZ || 0.0001);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Calculator className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Solved Numerical Example (Slide 9 Breakdown)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standard first-year BEE Unit 2 examination problem with detailed step-by-step algebraic working.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setCustomMode(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              !customMode ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Slide 9 Standard Problem
          </button>
          <button
            onClick={() => setCustomMode(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              customMode ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Test Your Own Numbers
          </button>
        </div>
      </div>

      {!customMode ? (
        /* SLIDE 9 STANDARD PROBLEM BREAKDOWN */
        <div className="flex flex-col gap-5">
          {/* Problem Statement Box */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
              Problem Statement:
            </span>
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              A single-phase AC series R-L-C circuit has Resistance <strong className="text-emerald-400">R = 3 Ω</strong>,
              Inductive Reactance <strong className="text-indigo-400">X_L = 8 Ω</strong>, and Capacitive Reactance{' '}
              <strong className="text-amber-400">X_C = 4 Ω</strong> connected across an alternating voltage supply of{' '}
              <strong className="text-rose-400">V = 10 V</strong> (RMS).
            </p>
            <div className="mt-2 text-xs text-slate-400 font-mono">
              Determine: (1) Net Reactance X, (2) Total Impedance Z, (3) Current I, (4) Phase Angle φ, and (5) Circuit Nature.
            </div>
          </div>

          {/* Step reveal controls for presentation rehearsal */}
          <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 text-xs">
            <span className="text-slate-400">Presentation Step Reveal:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((step) => (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  className={`px-2.5 py-1 rounded font-semibold text-xs transition ${
                    activeStep >= step
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Step {step}
                </button>
              ))}
              <button
                onClick={() => setActiveStep(5)}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs ml-1"
              >
                Reveal All
              </button>
            </div>
          </div>

          {/* The Steps Grid */}
          <div className="space-y-3">
            {/* Step 1 */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeStep >= 1
                  ? 'bg-slate-950/90 border-purple-500/50 shadow-lg'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[11px]">1</span>
                    Step 1: Calculate Net Reactance (X)
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Subtract capacitive reactance from inductive reactance because their voltages are 180° opposite:
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-purple-950/70 text-purple-300 px-2 py-0.5 rounded border border-purple-800">
                  X = 4 Ω
                </span>
              </div>
              <div className="mt-2.5 p-3 bg-slate-900 rounded-lg font-mono text-sm text-purple-200 border border-slate-800">
                X = X_L - X_C = 8 Ω - 4 Ω = <strong className="text-purple-400">4 Ω (Inductive)</strong>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeStep >= 2
                  ? 'bg-slate-950/90 border-rose-500/50 shadow-lg'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-[11px]">2</span>
                    Step 2: Calculate Total Circuit Impedance (Z)
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Apply Pythagoras theorem to the Impedance Triangle (Base = R = 3 Ω, Perpendicular = X = 4 Ω):
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-rose-950/70 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                  Z = 5 Ω
                </span>
              </div>
              <div className="mt-2.5 p-3 bg-slate-900 rounded-lg font-mono text-sm text-rose-200 border border-slate-800">
                Z = √(R² + X²) = √(3² + 4²) = √(9 + 16) = √25 = <strong className="text-rose-400">5 Ω</strong>
                <span className="text-xs text-slate-400 block mt-1 font-sans">
                  💡 Note: This is the famous 3-4-5 right triangle often used by university examiners for clean integer answers!
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeStep >= 3
                  ? 'bg-slate-950/90 border-cyan-500/50 shadow-lg'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-[11px]">3</span>
                    Step 3: Calculate Circuit Current (I)
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Use Ohm's Law for AC circuits (Current = Voltage / Impedance):
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-cyan-950/70 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800">
                  I = 2.0 A
                </span>
              </div>
              <div className="mt-2.5 p-3 bg-slate-900 rounded-lg font-mono text-sm text-cyan-200 border border-slate-800">
                I = V / Z = 10 V / 5 Ω = <strong className="text-cyan-400">2.0 Amperes</strong>
              </div>
            </div>

            {/* Step 4 */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeStep >= 4
                  ? 'bg-slate-950/90 border-amber-500/50 shadow-lg'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-[11px]">4</span>
                    Step 4: Calculate Phase Angle (φ) and Power Factor (cos φ)
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Calculate tangent of angle between supply voltage and current:
                  </p>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-950/70 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                  φ ≈ 53.13°
                </span>
              </div>
              <div className="mt-2.5 p-3 bg-slate-900 rounded-lg font-mono text-sm text-amber-200 border border-slate-800 space-y-1">
                <div>tan φ = (X_L - X_C) / R = 4 / 3 ≈ 1.3333</div>
                <div>φ = tan⁻¹(4/3) ≈ <strong className="text-amber-400">53.13° (0.927 rad)</strong></div>
                <div className="text-xs text-slate-300 pt-1">
                  Power Factor: cos φ = R / Z = 3 / 5 = <strong className="text-emerald-400">0.60 (Lagging)</strong>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 ${
                activeStep >= 5
                  ? 'bg-slate-950/90 border-emerald-500/50 shadow-lg'
                  : 'bg-slate-950/30 border-slate-800/40 opacity-40'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Step 5: Final Engineering Conclusion & Physical Meaning
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400">INDUCTIVE</span>
              </div>
              <div className="mt-2 text-xs text-slate-200 leading-relaxed bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/60">
                Because inductive reactance (<strong>X_L = 8 Ω</strong>) is strictly greater than capacitive reactance (<strong>X_C = 4 Ω</strong>),
                the inductive effect dominates. Therefore, the <strong>circuit is INDUCTIVE</strong> in nature, and the{' '}
                <strong>Current I LAGS the supply voltage V by 53.13°</strong>.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* CUSTOM EXAM CALCULATOR MODE */
        <div className="flex flex-col gap-5">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-2">
              Input Custom Circuit Parameters for Any Assignment / Exam Question
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Resistance R (Ω)</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={customR}
                  onChange={(e) => setCustomR(parseFloat(e.target.value) || 1)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Inductive Reactance X_L (Ω)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={customXl}
                  onChange={(e) => setCustomXl(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Capacitive Reactance X_C (Ω)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={customXc}
                  onChange={(e) => setCustomXc(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Supply Voltage V (V)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={customV}
                  onChange={(e) => setCustomV(parseFloat(e.target.value) || 1)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono text-sm focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Computed Custom Results */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
            <div className="text-slate-300 flex justify-between border-b border-slate-800 pb-2">
              <span>1. Net Reactance:</span>
              <span className="text-purple-400 font-bold">X = {customXl} - {customXc} = {cNetX.toFixed(2)} Ω</span>
            </div>
            <div className="text-slate-300 flex justify-between border-b border-slate-800 pb-2">
              <span>2. Total Impedance Z:</span>
              <span className="text-rose-400 font-bold">Z = √({customR}² + ({cNetX.toFixed(2)})²) = {cZ.toFixed(3)} Ω</span>
            </div>
            <div className="text-slate-300 flex justify-between border-b border-slate-800 pb-2">
              <span>3. Current I:</span>
              <span className="text-cyan-400 font-bold">I = {customV} / {cZ.toFixed(3)} = {cI.toFixed(3)} A</span>
            </div>
            <div className="text-slate-300 flex justify-between border-b border-slate-800 pb-2">
              <span>4. Phase Angle φ:</span>
              <span className="text-amber-400 font-bold">φ = {Math.abs(cPhiDeg).toFixed(2)}° ({cNetX > 0 ? 'Lagging' : cNetX < 0 ? 'Leading' : 'In Phase'})</span>
            </div>
            <div className="text-slate-300 flex justify-between">
              <span>5. Power Factor cos φ:</span>
              <span className="text-emerald-400 font-bold">{cCosPhi.toFixed(4)} ({cNetX > 0 ? 'Lagging' : cNetX < 0 ? 'Leading' : 'Unity'})</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
