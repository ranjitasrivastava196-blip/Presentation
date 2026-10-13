import React, { useState, useEffect } from 'react';
import { SlideData } from '../data/slidesData';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Globe, User, Clock, ArrowRight } from 'lucide-react';

interface PresenterNotesProps {
  slide: SlideData;
  nextSlide?: SlideData;
  groupMode: '4-students' | '3-students';
  studentName?: string;
  totalSlides: number;
}

export const PresenterNotesModal: React.FC<PresenterNotesProps> = ({
  slide,
  nextSlide,
  groupMode,
  studentName,
  totalSlides,
}) => {
  const [lang, setLang] = useState<'hinglish' | 'english'>('hinglish');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Group presentation timer
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Text to speech rehearsal
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = lang === 'hinglish' ? slide.speakerScriptHinglish : slide.speakerScriptEnglish;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Active presenter details based on groupMode
  const activePresenter = groupMode === '4-students' ? slide.presenter4 : slide.presenter3;

  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-slate-100">
      {/* Top Header with Timer and Language Switch */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        {/* Presenter identity */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400 font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>{studentName || activePresenter.student}</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/40">
                {activePresenter.roleTitle}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Target Duration: {activePresenter.duration}</span>
            </div>
          </div>
        </div>

        {/* Global Presentation Timer (8-10 min target) */}
        <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium">Group Timer:</span>
            <span
              className={`font-mono text-sm font-bold ${
                secondsElapsed > 600
                  ? 'text-rose-400 animate-pulse'
                  : secondsElapsed > 480
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {formatTime(secondsElapsed)}
            </span>
            <span className="text-[10px] text-slate-500">/ 09:00</span>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title={isTimerRunning ? 'Pause' : 'Start'}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setSecondsElapsed(0);
              }}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Script Language and Audio Rehearsal controls */}
        <div className="flex items-center gap-2">
          {/* Audio read-aloud */}
          <button
            onClick={handleToggleSpeech}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              isSpeaking
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Read aloud for rehearsal practice"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Listen Script'}</span>
          </button>

          {/* Hinglish vs English Toggle */}
          <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setLang('hinglish')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                lang === 'hinglish' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hinglish (Speaking)
            </button>
            <button
              onClick={() => setLang('english')}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
                lang === 'english' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>

      {/* Main Teleprompter Speaking Script Box */}
      <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 relative">
        <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-2">
          <span className="flex items-center gap-1.5 uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            {lang === 'hinglish' ? 'Presenter Speaking Script (Natural Hinglish)' : 'Presenter Speaking Script (Formal English)'}
          </span>
          <span className="text-[11px] text-slate-400 font-normal">
            Slide {slide.slideNumber} of {totalSlides}
          </span>
        </div>

        <p className="text-sm md:text-base text-slate-100 leading-relaxed font-sans font-medium whitespace-pre-line selection:bg-amber-500/30">
          “{lang === 'hinglish' ? slide.speakerScriptHinglish : slide.speakerScriptEnglish}”
        </p>

        {slide.memoryTrick && (
          <div className="mt-3 p-2.5 bg-amber-950/40 border border-amber-500/40 rounded-lg text-xs text-amber-200 flex items-center gap-2">
            <span className="font-bold text-amber-400 shrink-0">💡 Memory Trick:</span>
            <span>{slide.memoryTrick}</span>
          </div>
        )}
      </div>

      {/* Smooth Transition Cue to Next Speaker */}
      {slide.transitionNext && (
        <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-semibold">
            <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>Smooth Handover Cue:</span>
            <span className="text-slate-300 font-normal italic">
              "{slide.transitionNext}"
            </span>
          </div>
          {nextSlide && (
            <span className="text-[11px] text-slate-500 shrink-0">
              Next: Slide {nextSlide.slideNumber} ({nextSlide.title.slice(0, 24)}...)
            </span>
          )}
        </div>
      )}
    </div>
  );
};
