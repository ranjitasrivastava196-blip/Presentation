import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  Flame,
  ArrowRight,
  BookOpen,
  Filter,
  Check,
  ChevronRight,
  Zap,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

export const QuizModeView: React.FC = () => {
  // Category selection
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filtered questions
  const filteredQuestions =
    selectedCategory === 'All'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.category === selectedCategory);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [explanationLang, setExplanationLang] = useState<'english' | 'hinglish'>('english');
  const [filterWrongOnly, setFilterWrongOnly] = useState<boolean>(false);

  const currentQ = filteredQuestions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return; // Prevent changing after answered

    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctIndex;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: index }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handleRestart = (category: string = selectedCategory) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers({});
    setScore(0);
    setStreak(0);
    setIsQuizCompleted(false);
    setFilterWrongOnly(false);
  };

  const handlePracticeWrongOnly = () => {
    // Collect question IDs that were answered incorrectly
    const wrongQuestions = filteredQuestions.filter(
      (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctIndex
    );
    if (wrongQuestions.length > 0) {
      setFilterWrongOnly(true);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setUserAnswers({});
      setScore(0);
      setStreak(0);
      setIsQuizCompleted(false);
    }
  };

  const activeQuestionsList = filterWrongOnly
    ? filteredQuestions.filter(
        (q) => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctIndex
      )
    : filteredQuestions;

  const currentActiveQ = activeQuestionsList[currentIndex] || filteredQuestions[0];

  // Percentage & performance rating
  const totalQuestions = filteredQuestions.length;
  const percentage = Math.round((score / (totalQuestions || 1)) * 100);

  const getPerformanceBadge = (pct: number) => {
    if (pct === 100) return { title: '🏆 Perfect Score: 100% Viva Ready!', color: 'text-emerald-400', desc: 'Flawless conceptual mastery of Series R-L-C circuits! You are ready to ace both the theory paper and the oral defense.' };
    if (pct >= 80) return { title: '⚡ First Class with Distinction!', color: 'text-indigo-400', desc: 'Outstanding understanding of phasor diagrams, impedance, and resonance conditions.' };
    if (pct >= 60) return { title: '👍 Good Pass (First Class)', color: 'text-amber-400', desc: 'Solid foundation! Review the 180° cancellation and power factor formulas to secure top marks.' };
    return { title: '📚 Needs Quick Revision', color: 'text-rose-400', desc: 'Use the "Slides Deck" and "Lab Simulator" tabs to visualize component phase shifts before retrying.' };
  };

  const badge = getPerformanceBadge(percentage);

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 text-slate-100">
      {/* Top Header with Categories & Live Counters */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Series R-L-C Conceptual Quiz & Self-Assessment
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Test your understanding of Impedance Z, Phase Angle φ, Vector Phasors, and Electrical Resonance with instant feedback.
          </p>
        </div>

        {/* Categories selector */}
        {!isQuizCompleted && (
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['All', 'Impedance', 'Phase Angle', 'Resonance', 'Components & Reactance'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleRestart(cat)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  selectedCategory === cat && !filterWrongOnly
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isQuizCompleted ? (
        /* ACTIVE QUESTION SCREEN */
        <div className="flex flex-col gap-5">
          {/* Progress & Counters Bar */}
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Question count */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Question:</span>
              <span className="font-mono font-bold text-white text-sm">
                {currentIndex + 1}
              </span>
              <span className="text-slate-500 font-mono">/ {activeQuestionsList.length}</span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded font-semibold ml-1">
                {currentActiveQ.category}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {currentActiveQ.difficulty}
              </span>
            </div>

            {/* Score & Streak */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 font-mono">
                <span className="text-slate-400">Score:</span>
                <span className="font-bold text-emerald-400 text-sm">{score}</span>
                <span className="text-slate-500 text-xs">pts</span>
              </div>

              {streak > 1 && (
                <div className="flex items-center gap-1 text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800 text-xs font-bold animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{streak} Streak!</span>
                </div>
              )}
            </div>
          </div>

          {/* Progress bar line */}
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestionsList.length) * 100}%` }}
            ></div>
          </div>

          {/* Question Prompt */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-lg">
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
              {currentActiveQ.question}
            </h3>
          </div>

          {/* 4 Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentActiveQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentActiveQ.correctIndex;

              let btnStyle = 'bg-slate-950/80 hover:bg-slate-900 border-slate-800 text-slate-200';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left font-medium text-xs md:text-sm flex items-start justify-between gap-3 transition-all duration-200 ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback & Explanation Section */}
          {isAnswered && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-3 shadow-xl animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  {selectedOption === currentActiveQ.correctIndex ? (
                    <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Correct Answer! (+1 Point)
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-sm flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Incorrect. Correct Option is {String.fromCharCode(65 + currentActiveQ.correctIndex)}
                    </span>
                  )}
                </div>

                {/* Explanation Language Toggle */}
                <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
                  <button
                    onClick={() => setExplanationLang('english')}
                    className={`px-2.5 py-1 rounded font-semibold transition ${
                      explanationLang === 'english' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English Explanation
                  </button>
                  <button
                    onClick={() => setExplanationLang('hinglish')}
                    className={`px-2.5 py-1 rounded font-semibold transition ${
                      explanationLang === 'hinglish' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hinglish Clarity
                  </button>
                </div>
              </div>

              {/* Explanation text */}
              <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans">
                {explanationLang === 'english'
                  ? currentActiveQ.explanationEnglish
                  : currentActiveQ.explanationHinglish}
              </p>

              {/* Formula and Viva badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800/60 text-xs">
                {currentActiveQ.formula && (
                  <div className="font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800/60">
                    <strong>Formula:</strong> {currentActiveQ.formula}
                  </div>
                )}
                <div className="text-slate-400 flex items-center gap-1 text-[11px] italic">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{currentActiveQ.vivaRelevance}</span>
                </div>
              </div>

              {/* Next Question Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold text-xs md:text-sm flex items-center gap-2 shadow-lg transition"
                >
                  <span>{currentIndex < activeQuestionsList.length - 1 ? 'Next Question' : 'View Final Score'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* QUIZ COMPLETED SUMMARY SCREEN */
        <div className="flex flex-col gap-6">
          <div className="bg-slate-950 p-6 md:p-8 rounded-2xl border border-slate-800 flex flex-col items-center text-center shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-4">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Award className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <h3 className={`text-xl md:text-2xl font-black ${badge.color}`}>
              {badge.title}
            </h3>
            <p className="text-xs md:text-sm text-slate-300 max-w-lg mt-1 leading-relaxed">
              {badge.desc}
            </p>

            {/* Score cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full max-w-xl">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Score</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {score} / {totalQuestions}
                </span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Accuracy</span>
                <span className="text-2xl font-bold font-mono text-indigo-400">
                  {percentage}%
                </span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Best Streak</span>
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {bestStreak} 🔥
                </span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Category</span>
                <span className="text-xs font-bold text-purple-300 mt-1 block truncate">
                  {selectedCategory}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <button
                onClick={() => handleRestart('All')}
                className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg transition"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Full Quiz
              </button>

              {score < totalQuestions && (
                <button
                  onClick={handlePracticeWrongOnly}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 shadow-lg transition"
                >
                  <Sparkles className="w-4 h-4" />
                  Practice Missed Questions ({totalQuestions - score})
                </button>
              )}
            </div>
          </div>

          {/* Question by question review breakdown */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Detailed Question-by-Question Review
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {score} Correct • {totalQuestions - score} Incorrect
              </span>
            </div>

            <div className="space-y-3">
              {filteredQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const wasCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs ${
                      wasCorrect
                        ? 'bg-emerald-950/20 border-emerald-800/40'
                        : 'bg-rose-950/20 border-rose-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-bold text-slate-400 mr-1.5 font-mono">Q{idx + 1}.</span>
                        <span className="font-semibold text-slate-100">{q.question}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          wasCorrect
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {wasCorrect ? 'CORRECT' : 'MISSED'}
                      </span>
                    </div>

                    <div className="mt-2 text-slate-300 space-y-1">
                      <div className="text-emerald-400 font-medium">
                        ✓ Correct Option: {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                      </div>
                      {!wasCorrect && userChoice !== undefined && (
                        <div className="text-rose-400">
                          ✗ Your Option: {String.fromCharCode(65 + userChoice)}. {q.options[userChoice]}
                        </div>
                      )}
                      <div className="text-slate-400 pt-1 text-[11px] leading-relaxed">
                        <strong>Reason:</strong> {q.explanationEnglish}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
