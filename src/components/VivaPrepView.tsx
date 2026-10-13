import React, { useState } from 'react';
import { VIVA_QUESTIONS, VivaQuestion } from '../data/vivaQuestions';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, Award, Lightbulb } from 'lucide-react';

export const VivaPrepView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [activeLang, setActiveLang] = useState<'both' | 'english' | 'hinglish'>('both');

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              BEE Unit 2 Viva-Voce & Oral Exam Defense Prep
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Top questions asked by university professors right after the R-L-C presentation, with English & Hinglish model answers and scoring tips.
          </p>
        </div>

        {/* Language preference */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveLang('both')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              activeLang === 'both' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Both (English + Hinglish)
          </button>
          <button
            onClick={() => setActiveLang('english')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              activeLang === 'english' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            English Only
          </button>
          <button
            onClick={() => setActiveLang('hinglish')}
            className={`px-3 py-1 rounded-lg font-semibold transition ${
              activeLang === 'hinglish' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hinglish Only
          </button>
        </div>
      </div>

      {/* Viva list */}
      <div className="space-y-3">
        {VIVA_QUESTIONS.map((q) => {
          const isExpanded = expandedId === q.id;

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all ${
                isExpanded
                  ? 'bg-slate-950 border-purple-500/50 shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                onClick={() => toggleExpand(q.id)}
                className="w-full text-left p-4 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    Q{q.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {q.question}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-medium mt-0.5 italic">
                      "{q.hindiTranslation}"
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400 p-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 space-y-3">
                  {/* Keywords to highlight */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 mr-1">Must Mention Keywords:</span>
                    {q.keyKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-purple-950/80 text-purple-300 px-2 py-0.5 rounded border border-purple-800/50"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  {/* Answers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {(activeLang === 'both' || activeLang === 'english') && (
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                          Standard English Answer (For Viva Record)
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {q.answerEnglish}
                        </p>
                      </div>
                    )}

                    {(activeLang === 'both' || activeLang === 'hinglish') && (
                      <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                          Natural Hinglish Explanation (For Quick Conceptual Clarity)
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {q.answerHinglish}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Examiner Tip */}
                  <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-600/40 flex items-start gap-2 text-xs text-emerald-200">
                    <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-300">Professor's Evaluation Tip: </span>
                      {q.examinerTip}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
