import React from 'react';
import { SlideData } from '../data/slidesData';
import { CircuitDiagramSVG } from './CircuitDiagramSVG';
import { PhasorDiagramSVG } from './PhasorDiagramSVG';
import { WaveformPlotSVG } from './WaveformPlotSVG';
import { ImpedanceTriangleSVG } from './ImpedanceTriangleSVG';
import { NumericalSolver } from './NumericalSolver';
import { Zap, Award, Sparkles, BookOpen, Layers, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface SlideContentProps {
  slide: SlideData;
  groupMode: '4-students' | '3-students';
  studentName?: string;
}

export const SlideContent: React.FC<SlideContentProps> = ({
  slide,
  groupMode,
  studentName,
}) => {
  const activePresenter = groupMode === '4-students' ? slide.presenter4 : slide.presenter3;

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 md:p-8 bg-slate-950 text-white rounded-2xl select-none relative overflow-hidden border border-slate-800 shadow-2xl">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* TOP SLIDE HEADER */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-indigo-950 text-indigo-400 border border-indigo-800/60 px-2 py-0.5 rounded">
              BEE UNIT 2: AC CIRCUITS
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SLIDE {slide.slideNumber} OF 10
            </span>
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {slide.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-0.5">
            {slide.subtitle}
          </p>
        </div>

        {/* Presenter badge */}
        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Presenter</span>
          <span className="text-xs font-bold text-indigo-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg inline-block mt-0.5">
            {studentName || activePresenter.student}
          </span>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            {activePresenter.duration}
          </span>
        </div>
      </div>

      {/* MAIN SLIDE BODY */}
      <div className="flex-1 my-4 overflow-y-auto relative z-10 pr-1">
        {/* SLIDE 1: TITLE & INTRO */}
        {slide.diagramType === 'title_intro' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Presentation Objective
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  To provide a complete, clear, and mathematically accurate understanding of the{' '}
                  <strong className="text-white">Series R-L-C Circuit</strong>: from individual component physics and
                  vector phasor geometry to total impedance, phase angle, and electrical resonance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                  <span className="text-indigo-400 font-bold block mb-1">🎯 Topic Scope</span>
                  <span className="text-slate-300">Resistor R, Inductor L, Capacitor C in AC circuits</span>
                </div>
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                  <span className="text-amber-400 font-bold block mb-1">⏱️ Group Duration</span>
                  <span className="text-slate-300">8–10 Minutes Total (4 Balanced Speaking Roles)</span>
                </div>
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
                <strong>Teaching Methodology:</strong> Simple English + Hinglish clarity, intuitive physical analogies,
                electrically rigorous phasor diagrams, and minimal derivation clutter.
              </div>
            </div>

            <div className="lg:col-span-5">
              <CircuitDiagramSVG interactive={false} highlightComponent="all" />
            </div>
          </div>
        )}

        {/* SLIDE 2: AC VS DC */}
        {slide.diagramType === 'ac_dc_comparison' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-center">
            {/* Direct Current DC Card */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-sky-400">Direct Current (DC)</h3>
                  <span className="text-xs font-mono bg-sky-950 text-sky-300 px-2 py-0.5 rounded border border-sky-800">
                    f = 0 Hz
                  </span>
                </div>
                <ul className="mt-4 space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span><strong>Unidirectional Flow:</strong> Current flows strictly in ONE direction from positive to negative.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span><strong>Constant Magnitude:</strong> Voltage and current do not oscillate over time: <code className="text-sky-300">V(t) = V_DC</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span><strong>Typical Sources:</strong> Chemical batteries, DC power supplies, solar cells.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400 font-bold">•</span>
                    <span><strong>Component Behaviour:</strong> Inductor behaves as a pure short circuit; Capacitor behaves as an open circuit.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">DC Waveform: Constant Straight Line</span>
                <svg viewBox="0 0 240 50" className="w-full max-w-[200px] mx-auto h-10">
                  <line x1="10" y1="40" x2="230" y2="40" stroke="#475569" strokeWidth="1" />
                  <line x1="10" y1="18" x2="230" y2="18" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="120" y="14" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">I = Const</text>
                </svg>
              </div>
            </div>

            {/* Alternating Current AC Card */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-rose-400">Alternating Current (AC)</h3>
                  <span className="text-xs font-mono bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    f = 50 Hz (India)
                  </span>
                </div>
                <ul className="mt-4 space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Bidirectional Flow:</strong> Current and voltage periodically reverse direction back and forth.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Sinusoidal Waveform:</strong> Continuously varies as <code className="text-rose-300">v(t) = V_m sin(2πft)</code>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Typical Sources:</strong> AC alternators, household wall sockets (230 V RMS, 50 Hz).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">•</span>
                    <span><strong>Component Behaviour:</strong> Inductors and capacitors introduce frequency-dependent reactive opposition!</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <span className="text-[11px] text-slate-500 block mb-1">AC Waveform: Pure Sinusoid</span>
                <svg viewBox="0 0 240 50" className="w-full max-w-[200px] mx-auto h-10">
                  <line x1="10" y1="25" x2="230" y2="25" stroke="#475569" strokeWidth="1" />
                  <path d="M 10 25 Q 65 0 120 25 T 230 25" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="65" y="10" fill="#f43f5e" fontSize="9" textAnchor="middle">+Peak</text>
                  <text x="175" y="44" fill="#f43f5e" fontSize="9" textAnchor="middle">-Peak</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: R, L, C COMPONENTS */}
        {slide.diagramType === 'rlc_components' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
            {/* R - Resistor */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">RESISTOR (R)</span>
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">
                    Unit: Ohm (Ω)
                  </span>
                </div>
                <div className="my-3 text-center">
                  <svg viewBox="0 0 160 40" className="w-32 mx-auto">
                    <path d="M 10 20 L 30 20 L 40 8 L 60 32 L 80 8 L 100 32 L 120 8 L 130 20 L 150 20" fill="none" stroke="#34d399" strokeWidth="3" />
                  </svg>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Physical Action:</strong> Opposes current flow through atomic collisions.</p>
                  <p><strong>Energy Mechanism:</strong> Converts electrical energy irreversibly into <em>heat</em> (Real Power: P = I²R).</p>
                  <p><strong>Practical Use:</strong> Current limiting, heating coils, electronic load resistors.</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-emerald-950/40 rounded border border-emerald-800/40 text-[11px] text-emerald-300 text-center font-semibold">
                φ = 0° (Voltage & Current in Phase)
              </div>
            </div>

            {/* L - Inductor */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-indigo-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">INDUCTOR (L)</span>
                  <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded">
                    Unit: Henry (H)
                  </span>
                </div>
                <div className="my-3 text-center">
                  <svg viewBox="0 0 160 40" className="w-32 mx-auto">
                    <path d="M 10 25 C 10 10, 40 10, 40 25 C 40 10, 70 10, 70 25 C 70 10, 100 10, 100 25 C 100 10, 130 10, 130 25 L 150 25" fill="none" stroke="#a78bfa" strokeWidth="3" />
                  </svg>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Physical Action:</strong> A coil of insulated wire that opposes <em>changes</em> in current (Lenz's Law).</p>
                  <p><strong>Energy Mechanism:</strong> Stores reactive energy in a <em>magnetic field</em> (E = ½ L I²).</p>
                  <p><strong>Practical Use:</strong> Choke coils, motor windings, power transformers.</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-indigo-950/40 rounded border border-indigo-800/40 text-[11px] text-indigo-300 text-center font-semibold">
                X_L = 2πfL (Voltage leads Current by 90°)
              </div>
            </div>

            {/* C - Capacitor */}
            <div className="bg-slate-900/90 p-5 rounded-xl border border-amber-500/30 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">CAPACITOR (C)</span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded">
                    Unit: Farad (F)
                  </span>
                </div>
                <div className="my-3 text-center">
                  <svg viewBox="0 0 160 40" className="w-32 mx-auto">
                    <line x1="10" y1="20" x2="65" y2="20" stroke="#94a3b8" strokeWidth="2.5" />
                    <line x1="65" y1="8" x2="65" y2="32" stroke="#fb923c" strokeWidth="4" />
                    <line x1="80" y1="8" x2="80" y2="32" stroke="#fb923c" strokeWidth="4" />
                    <line x1="80" y1="20" x2="150" y2="20" stroke="#94a3b8" strokeWidth="2.5" />
                  </svg>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <p><strong>Physical Action:</strong> Conducting plates separated by insulator; opposes <em>changes</em> in voltage.</p>
                  <p><strong>Energy Mechanism:</strong> Stores reactive energy in an <em>electric field</em> (E = ½ C V²).</p>
                  <p><strong>Practical Use:</strong> Fan capacitor, power factor correction banks, filters.</p>
                </div>
              </div>
              <div className="mt-3 p-2 bg-amber-950/40 rounded border border-amber-800/40 text-[11px] text-amber-300 text-center font-semibold">
                X_C = 1/(2πfC) (Current leads Voltage by 90°)
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: V-I RELATIONSHIPS */}
        {slide.diagramType === 'vi_relationships' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-6 flex flex-col gap-3">
              {/* Memory Trick Banner */}
              <div className="p-3.5 bg-gradient-to-r from-indigo-950 to-purple-950 border border-indigo-500/50 rounded-xl shadow-lg">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  🌟 Universal Memory Mnemonic:
                </span>
                <div className="text-base font-extrabold text-white mt-0.5">
                  “ELI the ICE man”
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  • In an <strong className="text-indigo-300">Inductor (L)</strong>: <strong>E</strong> (Voltage) leads <strong>I</strong> (Current) → <strong>E - L - I</strong><br />
                  • In a <strong className="text-amber-300">Capacitor (C)</strong>: <strong>I</strong> (Current) leads <strong>E</strong> (Voltage) → <strong>I - C - E</strong>
                </p>
              </div>

              {/* Individual definitions */}
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400">Resistor:</strong> V_R and I are in phase (φ = 0°). Both reach zero and peak at the same time.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-indigo-400">Inductor:</strong> Voltage leads current by 90°. Current lags voltage by 90°. Reactance: <code className="text-indigo-300">X_L = 2πfL (Ω)</code>.
                </div>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                  <strong className="text-amber-400">Capacitor:</strong> Current leads voltage by 90°. Voltage lags current by 90°. Reactance: <code className="text-amber-300">X_C = 1/(2πfC) (Ω)</code>.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <WaveformPlotSVG mode="resistor" />
            </div>
          </div>
        )}

        {/* SLIDE 5: SERIES CIRCUIT */}
        {slide.diagramType === 'series_circuit' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-7">
              <CircuitDiagramSVG interactive={true} />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Fundamental Series Principles
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold">1.</span>
                    <span><strong>Common Current:</strong> The exact same current <code className="text-cyan-300">I</code> flows through R, L, and C. Hence, Current is taken as the reference vector (0°).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">2.</span>
                    <span><strong>Different Phase Voltages:</strong> V_R is at 0°, V_L is at +90°, and V_C is at -90°.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">3.</span>
                    <span><strong>Phasor Summation:</strong> Total voltage V is the vector sum: <code className="text-rose-300">V = √(V_R² + (V_L - V_C)²)</code>. Never add magnitudes algebraically!</span>
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-600/40 text-xs text-amber-200">
                ⚠️ <strong>Common Exam Mistake:</strong> Writing <code className="text-rose-300">V = V_R + V_L + V_C</code> will lose marks! In AC, voltages are phasors with phase angles.
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: PHASOR DIAGRAM */}
        {slide.diagramType === 'phasor_diagram' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-7">
              <PhasorDiagramSVG />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Step-by-Step Drawing Rules
                </h3>
                <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside">
                  <li>Draw <strong>Current I</strong> along horizontal positive X-axis (Reference).</li>
                  <li>Draw <strong>V_R = I·R</strong> in phase with I (along positive X-axis).</li>
                  <li>Draw <strong>V_L = I·X_L</strong> vertically upwards (+90° ahead).</li>
                  <li>Draw <strong>V_C = I·X_C</strong> vertically downwards (-90° behind).</li>
                  <li>Compute net vertical vector <strong>(V_L - V_C)</strong>.</li>
                  <li>Apply Pythagoras to obtain hypotenuse: <strong>Supply Voltage V</strong>.</li>
                </ol>
              </div>

              <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
                <strong>Resultant Voltage Formula:</strong><br />
                <code className="text-sm font-mono text-rose-400 block mt-1">
                  V = √[V_R² + (V_L - V_C)²]
                </code>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7: IMPEDANCE TRIANGLE */}
        {slide.diagramType === 'impedance_triangle' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-6">
              <ImpedanceTriangleSVG r={3} xl={8} xc={4} />
            </div>

            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  The Three AC Circuit Regimes
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-2 bg-indigo-950/60 rounded border border-indigo-800">
                    <strong className="text-indigo-400">1. Inductive (X_L &gt; X_C):</strong><br />
                    Net reactance is positive. Voltage leads current. <strong>Current LAGS</strong> by phase angle φ.
                  </div>
                  <div className="p-2 bg-amber-950/60 rounded border border-amber-800">
                    <strong className="text-amber-400">2. Capacitive (X_C &gt; X_L):</strong><br />
                    Net reactance is negative. Current leads voltage. <strong>Current LEADS</strong> by phase angle φ.
                  </div>
                  <div className="p-2 bg-emerald-950/60 rounded border border-emerald-800">
                    <strong className="text-emerald-400">3. Resonance (X_L = X_C):</strong><br />
                    Net reactance = 0. Purely resistive: <strong>Z = R, φ = 0°</strong>. In Phase.
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="text-slate-400 block text-[10px]">PHASE ANGLE FORMULA</span>
                  <code className="text-amber-400 font-mono font-bold">tan φ = (X_L - X_C) / R</code>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-center">
                  <span className="text-slate-400 block text-[10px]">POWER FACTOR</span>
                  <code className="text-emerald-400 font-mono font-bold">cos φ = R / Z</code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: RESONANCE */}
        {slide.diagramType === 'resonance' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center h-full">
            <div className="lg:col-span-6 flex flex-col gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Condition for Series Resonance
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Resonance occurs when inductive reactance exactly balances capacitive reactance:
                </p>
                <div className="p-3 my-2 bg-emerald-950/80 rounded-lg text-center font-mono text-sm text-emerald-300 font-bold border border-emerald-800">
                  X_L = X_C  ⟹  2π f_r L = 1 / (2π f_r C)
                </div>
                <div className="p-3 bg-slate-950 rounded-lg text-center font-mono text-base text-rose-400 font-bold border border-slate-800">
                  f_r = 1 / (2π √(LC))  Hz
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Key Resonance Features (Exam Checklist)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-emerald-400 font-bold">Z is Minimum:</span> Z = R
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-cyan-400 font-bold">Current is Maximum:</span> I = V / R
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold">Phase Angle φ:</span> φ = 0°
                  </div>
                  <div className="p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-indigo-400 font-bold">Power Factor:</span> cosφ = 1.0 (Unity)
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <PhasorDiagramSVG initialCase="resonance" />
            </div>
          </div>
        )}

        {/* SLIDE 9: SOLVED NUMERICAL EXAMPLE */}
        {slide.diagramType === 'numerical_example' && (
          <div className="h-full">
            <NumericalSolver />
          </div>
        )}

        {/* SLIDE 10: FORMULA CHEAT SHEET & CONCLUSION */}
        {slide.diagramType === 'formula_cheat_sheet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">
                  BEE Unit 2 Master Formula Matrix
                </h3>
                <div className="overflow-x-auto text-xs font-mono">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-1 px-2">Parameter</th>
                        <th className="py-1 px-2">Formula</th>
                        <th className="py-1 px-2">SI Unit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      <tr>
                        <td className="py-1.5 px-2 font-sans font-semibold text-emerald-400">Inductive Reactance</td>
                        <td className="py-1.5 px-2 text-indigo-300">X_L = 2πfL = ωL</td>
                        <td className="py-1.5 px-2">Ohm (Ω)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-sans font-semibold text-amber-400">Capacitive Reactance</td>
                        <td className="py-1.5 px-2 text-amber-300">X_C = 1 / (2πfC) = 1 / (ωC)</td>
                        <td className="py-1.5 px-2">Ohm (Ω)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-sans font-semibold text-rose-400">Total Impedance</td>
                        <td className="py-1.5 px-2 text-rose-300">Z = √(R² + (X_L - X_C)²)</td>
                        <td className="py-1.5 px-2">Ohm (Ω)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-sans font-semibold text-cyan-400">Phase Angle</td>
                        <td className="py-1.5 px-2 text-cyan-300">tan φ = (X_L - X_C) / R</td>
                        <td className="py-1.5 px-2">Degrees / Rad</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-sans font-semibold text-purple-400">Power Factor</td>
                        <td className="py-1.5 px-2 text-purple-300">cos φ = R / Z</td>
                        <td className="py-1.5 px-2">Dimensionless</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 px-2 font-sans font-semibold text-emerald-400">Resonant Frequency</td>
                        <td className="py-1.5 px-2 text-emerald-300">f_r = 1 / (2π√(LC))</td>
                        <td className="py-1.5 px-2">Hertz (Hz)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-600/40 text-xs text-emerald-200">
                <strong>Final Conclusion:</strong> In a Series R-L-C circuit, current is common, voltages sum phasorially,
                and resonance yields maximum current and unity power factor.
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-center">
                <span className="text-3xl block mb-2">🎓</span>
                <h3 className="text-lg font-bold text-white mb-1">
                  Thank You, Respected Sir & Dear Classmates!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">
                  Presented by our group for Basic Electrical Engineering (BEE Unit 2). We are now delighted to answer any viva or conceptual questions!
                </p>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-400 text-center">
                Use the <strong>"Viva Prep"</strong> tab in the navigation bar to review the top 8 teacher questions and model answers!
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SLIDE FOOTER */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="font-medium text-slate-300">Key Takeaway:</span>
          <span className="text-slate-400 italic truncate max-w-md lg:max-w-xl">
            {slide.keyTakeaway}
          </span>
        </div>
        <div className="font-mono text-slate-500">
          Slide {slide.slideNumber}/10
        </div>
      </div>
    </div>
  );
};
