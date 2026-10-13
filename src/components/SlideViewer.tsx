import React, { useState, useEffect, useRef } from 'react';
import { SLIDES_DATA, SlideData } from '../data/slidesData';
import { SlideContent } from './SlideContent';
import { PresenterNotesModal } from './PresenterNotesModal';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Tv,
  Users,
  Cpu,
  HelpCircle,
  FileText,
  Volume2,
  VolumeX,
  Radio,
  Flame,
  LayoutGrid
} from 'lucide-react';

interface SlideViewerProps {
  groupMode: '4-students' | '3-students';
  customNames: Record<number, string>;
  activeTab: 'slides' | 'presenter' | 'simulator' | 'numerical' | 'roles' | 'viva' | 'quiz' | 'handout';
  onTabChange: (tab: 'slides' | 'presenter' | 'simulator' | 'numerical' | 'roles' | 'viva' | 'quiz' | 'handout') => void;
  currentSlideIndex: number;
  onSlideChange: (index: number) => void;
}

export const SlideViewer: React.FC<SlideViewerProps> = ({
  groupMode,
  customNames,
  activeTab,
  onTabChange,
  currentSlideIndex,
  onSlideChange,
}) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [laserPointer, setLaserPointer] = useState<boolean>(false);
  const [laserPos, setLaserPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = SLIDES_DATA[currentSlideIndex];
  const nextSlide = currentSlideIndex < SLIDES_DATA.length - 1 ? SLIDES_DATA[currentSlideIndex + 1] : undefined;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'slides' && activeTab !== 'presenter') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        if (currentSlideIndex < SLIDES_DATA.length - 1) {
          onSlideChange(currentSlideIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentSlideIndex > 0) {
          onSlideChange(currentSlideIndex - 1);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'l' || e.key === 'L') {
        setLaserPointer((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, activeTab]);

  // Laser pointer mouse tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!laserPointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setLaserPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(err);
      });
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Presentation Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 px-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        {/* Navigation Arrows & Current Indicator */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSlideChange(Math.max(0, currentSlideIndex - 1))}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-xs font-semibold"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-white font-mono">
              Slide {currentSlide.slideNumber}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 10</span>
          </div>

          <button
            onClick={() => onSlideChange(Math.min(SLIDES_DATA.length - 1, currentSlideIndex + 1))}
            disabled={currentSlideIndex === SLIDES_DATA.length - 1}
            className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed text-white transition flex items-center gap-1 text-xs font-semibold shadow-md"
            title="Next Slide (Right Arrow / Space)"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 10 Slide Quick Jump Pills */}
        <div className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {SLIDES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSlideChange(idx)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition ${
                currentSlideIndex === idx
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
              title={`Slide ${s.slideNumber}: ${s.title}`}
            >
              {s.slideNumber}
            </button>
          ))}
        </div>

        {/* Presentation Utilities: Presenter View, Laser, Notes, Fullscreen */}
        <div className="flex items-center gap-2">
          {/* Laser pointer button */}
          <button
            onClick={() => setLaserPointer(!laserPointer)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              laserPointer
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Toggle Laser Pointer for Classroom Display (Key: L)"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{laserPointer ? 'Laser On' : 'Laser'}</span>
          </button>

          {/* Toggle notes drawer on slide view */}
          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              showNotesDrawer
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
            title="Toggle Presenter Speaker Notes"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Script</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Toggle Fullscreen (Key: F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Canvas Area */}
      {activeTab === 'slides' && (
        <div className="flex flex-col gap-4">
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="w-full min-h-[580px] lg:min-h-[640px] relative rounded-2xl overflow-hidden shadow-2xl transition-all"
          >
            <SlideContent
              slide={currentSlide}
              groupMode={groupMode}
              studentName={customNames[groupMode === '4-students' ? currentSlide.presenter4.student.includes('1') ? 1 : currentSlide.presenter4.student.includes('2') ? 2 : currentSlide.presenter4.student.includes('3') ? 3 : 4 : currentSlide.presenter3.student.includes('1') ? 1 : currentSlide.presenter3.student.includes('2') ? 2 : 3]}
            />

            {/* Laser pointer dot */}
            {laserPointer && (
              <div
                className="absolute w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50 transition-transform duration-75"
                style={{
                  left: `${laserPos.x}px`,
                  top: `${laserPos.y}px`,
                }}
              ></div>
            )}
          </div>

          {/* Bottom Presenter Script Drawer if opened */}
          {showNotesDrawer && (
            <PresenterNotesModal
              slide={currentSlide}
              nextSlide={nextSlide}
              groupMode={groupMode}
              studentName={customNames[groupMode === '4-students' ? currentSlide.presenter4.student.includes('1') ? 1 : currentSlide.presenter4.student.includes('2') ? 2 : currentSlide.presenter4.student.includes('3') ? 3 : 4 : currentSlide.presenter3.student.includes('1') ? 1 : currentSlide.presenter3.student.includes('2') ? 2 : 3]}
              totalSlides={SLIDES_DATA.length}
            />
          )}
        </div>
      )}

      {/* DUAL PRESENTER MODE VIEW */}
      {activeTab === 'presenter' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Main Current Slide (7 cols) */}
          <div className="xl:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold uppercase tracking-wider text-emerald-400">
                ● Live Classroom Display (Current Slide)
              </span>
              <span className="font-mono">Slide {currentSlide.slideNumber} / 10</span>
            </div>
            <div className="w-full min-h-[500px]">
              <SlideContent
                slide={currentSlide}
                groupMode={groupMode}
                studentName={customNames[groupMode === '4-students' ? currentSlide.presenter4.student.includes('1') ? 1 : currentSlide.presenter4.student.includes('2') ? 2 : currentSlide.presenter4.student.includes('3') ? 3 : 4 : currentSlide.presenter3.student.includes('1') ? 1 : currentSlide.presenter3.student.includes('2') ? 2 : 3]}
              />
            </div>
          </div>

          {/* Right Column: Next Slide Preview + Teleprompter Script (5 cols) */}
          <div className="xl:col-span-5 flex flex-col gap-4">
            {/* Next Slide Preview */}
            {nextSlide ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Next Slide Preview: Slide {nextSlide.slideNumber}
                </span>
                <div className="text-xs font-bold text-white truncate">
                  {nextSlide.title}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {nextSlide.subtitle}
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-500 text-center">
                Last Slide (Conclusion)
              </div>
            )}

            {/* Full Teleprompter Notes and Timer */}
            <PresenterNotesModal
              slide={currentSlide}
              nextSlide={nextSlide}
              groupMode={groupMode}
              studentName={customNames[groupMode === '4-students' ? currentSlide.presenter4.student.includes('1') ? 1 : currentSlide.presenter4.student.includes('2') ? 2 : currentSlide.presenter4.student.includes('3') ? 3 : 4 : currentSlide.presenter3.student.includes('1') ? 1 : currentSlide.presenter3.student.includes('2') ? 2 : 3]}
              totalSlides={SLIDES_DATA.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};
