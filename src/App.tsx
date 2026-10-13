import React, { useState } from 'react';
import { SlideViewer } from './components/SlideViewer';
import { InteractiveSimulator } from './components/InteractiveSimulator';
import { NumericalSolver } from './components/NumericalSolver';
import { GroupAllocationView } from './components/GroupAllocationView';
import { VivaPrepView } from './components/VivaPrepView';
import { QuizModeView } from './components/QuizModeView';
import { HandoutPrintView } from './components/HandoutPrintView';
import {
  Tv,
  Presentation,
  Cpu,
  Calculator,
  Users,
  HelpCircle,
  Printer,
  Sparkles,
  Zap,
  BookOpen,
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'slides' | 'presenter' | 'simulator' | 'numerical' | 'roles' | 'viva' | 'quiz' | 'handout'
  >('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [groupMode, setGroupMode] = useState<'4-students' | '3-students'>('4-students');

  // Custom student names (editable by the group)
  const [customNames, setCustomNames] = useState<Record<number, string>>({
    1: 'Student 1 (AC Basics)',
    2: 'Student 2 (V-I Relations)',
    3: 'Student 3 (Phasor & Impedance)',
    4: 'Student 4 (Resonance & Numerical)',
  });

  const handleNameChange = (roleId: number, name: string) => {
    setCustomNames((prev) => ({
      ...prev,
      [roleId]: name,
    }));
  };

  const handleJumpToSlide = (slideNum: number) => {
    setCurrentSlideIndex(slideNum - 1);
    setActiveTab('slides');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Global Navigation Bar */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Subject Badge */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-rose-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white tracking-tight">
                  Series R-L-C Circuit
                </span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.2 rounded font-mono font-semibold">
                  BEE Unit 2
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                First-Year Engineering Group Presentation & Interactive Phasor Studio
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('slides')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'slides'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Slides Deck</span>
            </button>

            <button
              onClick={() => setActiveTab('presenter')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'presenter'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Presenter View</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Lab Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('numerical')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'numerical'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Solved Numerical</span>
            </button>

            <button
              onClick={() => setActiveTab('roles')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'roles'
                  ? 'bg-sky-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Group Roles</span>
            </button>

            <button
              onClick={() => setActiveTab('viva')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'viva'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Viva Prep</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Quiz Mode</span>
            </button>

            <button
              onClick={() => setActiveTab('handout')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'handout'
                  ? 'bg-slate-800 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Handouts</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Render Active View */}
        {(activeTab === 'slides' || activeTab === 'presenter') && (
          <SlideViewer
            groupMode={groupMode}
            customNames={customNames}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            currentSlideIndex={currentSlideIndex}
            onSlideChange={setCurrentSlideIndex}
          />
        )}

        {activeTab === 'simulator' && <InteractiveSimulator />}

        {activeTab === 'numerical' && <NumericalSolver />}

        {activeTab === 'roles' && (
          <GroupAllocationView
            currentGroupMode={groupMode}
            onGroupModeChange={setGroupMode}
            customNames={customNames}
            onNameChange={handleNameChange}
            onJumpToSlide={handleJumpToSlide}
          />
        )}

        {activeTab === 'viva' && <VivaPrepView />}

        {activeTab === 'quiz' && <QuizModeView />}

        {activeTab === 'handout' && (
          <HandoutPrintView
            customNames={customNames}
            groupMode={groupMode}
          />
        )}
      </main>

      {/* Footer Info */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>
            Basic Electrical Engineering (BEE Unit 2) • Series R-L-C Circuit Presentation Studio
          </span>
          <span className="font-mono text-slate-600">
            Target Duration: 8–10 Minutes • 4-Student Evaluation Standard
          </span>
        </div>
      </footer>
    </div>
  );
}
