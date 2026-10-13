import React from 'react';
import { SLIDES_DATA } from '../data/slidesData';
import { Printer, Download, BookOpen, CheckCircle } from 'lucide-react';

interface HandoutProps {
  customNames: Record<number, string>;
  groupMode: '4-students' | '3-students';
}

export const HandoutPrintView: React.FC<HandoutProps> = ({ customNames, groupMode }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
      {/* Top Header with Print Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Printer className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Presentation Handout & Viva Study Sheet
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Formatted for printing or PDF export: includes all 10 slides, speaker scripts, formulas, and diagrams for teacher submission.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>

      {/* Presentation Metadata Summary */}
      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
        <h1 className="text-xl font-extrabold text-white">
          Series R-L-C Circuit: Phasor Diagram, Impedance & Resonance
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Basic Electrical Engineering (BEE Unit 2) • 8–10 Minute Presentation Deck
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px]">PRESENTER 1</span>
            <strong className="text-slate-200">{customNames[1] || 'Student 1'}</strong>
            <span className="text-[11px] text-slate-400 block">AC Basics & RLC (Slides 1–3)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">PRESENTER 2</span>
            <strong className="text-slate-200">{customNames[2] || 'Student 2'}</strong>
            <span className="text-[11px] text-slate-400 block">V-I Relations & Circuit (Slides 4–5)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">PRESENTER 3</span>
            <strong className="text-slate-200">{customNames[3] || 'Student 3'}</strong>
            <span className="text-[11px] text-slate-400 block">Phasor & Impedance (Slides 6–7)</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">PRESENTER 4</span>
            <strong className="text-slate-200">{customNames[4] || 'Student 4'}</strong>
            <span className="text-[11px] text-slate-400 block">Resonance & Numerical (Slides 8–10)</span>
          </div>
        </div>
      </div>

      {/* All 10 Slides in compact handout list */}
      <div className="space-y-6">
        {SLIDES_DATA.map((slide) => {
          const presenter = groupMode === '4-students' ? slide.presenter4 : slide.presenter3;

          return (
            <div
              key={slide.id}
              className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div>
                  <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold mr-2">
                    SLIDE {slide.slideNumber}
                  </span>
                  <span className="text-sm font-bold text-white">{slide.title}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {presenter.student} ({presenter.duration})
                </span>
              </div>

              {/* Slide content bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                    Key Concepts:
                  </span>
                  <ul className="space-y-1 list-disc list-inside">
                    {slide.bulletPoints.map((bp, i) => (
                      <li key={i}>
                        <strong className="text-slate-200">{bp.heading}:</strong> {bp.text}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  {/* Speaker script */}
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-[10px] font-bold text-amber-400 uppercase block mb-0.5">
                      Speaking Script (Hinglish):
                    </span>
                    <p className="text-[11px] text-slate-300 italic">
                      “{slide.speakerScriptHinglish}”
                    </p>
                  </div>

                  {slide.memoryTrick && (
                    <div className="p-2 bg-amber-950/40 rounded border border-amber-600/40 text-[11px] text-amber-200">
                      💡 <strong>Memory Tip:</strong> {slide.memoryTrick}
                    </div>
                  )}
                </div>
              </div>

              {/* Formulas if present */}
              {slide.formulas && slide.formulas.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
                  {slide.formulas.map((f, i) => (
                    <div
                      key={i}
                      className="px-2.5 py-1 bg-slate-900 rounded border border-slate-800 text-[11px] font-mono text-emerald-400"
                    >
                      <strong>{f.label}:</strong> {f.expression}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
