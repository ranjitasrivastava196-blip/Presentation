import React, { useState } from 'react';
import { FOUR_STUDENT_TEAM, THREE_STUDENT_TEAM, GroupMember } from '../data/slidesData';
import { Users, Clock, BookOpen, UserCheck, Edit3, Check } from 'lucide-react';

interface GroupAllocationProps {
  currentGroupMode: '4-students' | '3-students';
  onGroupModeChange: (mode: '4-students' | '3-students') => void;
  customNames: Record<number, string>;
  onNameChange: (roleId: number, name: string) => void;
  onJumpToSlide: (slideNumber: number) => void;
}

export const GroupAllocationView: React.FC<GroupAllocationProps> = ({
  currentGroupMode,
  onGroupModeChange,
  customNames,
  onNameChange,
  onJumpToSlide,
}) => {
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [tempName, setTempName] = useState<string>('');

  const teamList = currentGroupMode === '4-students' ? FOUR_STUDENT_TEAM : THREE_STUDENT_TEAM;
  const totalAllocatedMinutes = teamList.reduce((acc, member) => acc + member.durationMinutes, 0);

  const startEditing = (member: GroupMember) => {
    setEditingRoleId(member.id);
    setTempName(customNames[member.id] || member.defaultName);
  };

  const saveName = (roleId: number) => {
    if (tempName.trim()) {
      onNameChange(roleId, tempName.trim());
    }
    setEditingRoleId(null);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg">
              <Users className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Group Roles & Presentation Time Allocation
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Carefully balanced 8–10 minute timeline ensuring every student gets equal speaking marks and clear topic boundaries.
          </p>
        </div>

        {/* Group Mode Switcher (4-Student Standard vs 3-Student Backup Plan) */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => onGroupModeChange('4-students')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              currentGroupMode === '4-students'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            4-Student Plan (Standard)
          </button>
          <button
            onClick={() => onGroupModeChange('3-students')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
              currentGroupMode === '3-students'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            3-Student Backup Plan
          </button>
        </div>
      </div>

      {/* Plan summary badge */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-emerald-400" />
          <div>
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Planned Speaking Time</span>
            <div className="text-lg font-bold text-emerald-400 font-mono">
              {totalAllocatedMinutes.toFixed(1)} Minutes
              <span className="text-xs font-normal text-slate-400 ml-2">
                (Target Window: 8–10 Minutes for First-Year BEE Viva)
              </span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Click any student card to edit student names or jump directly to their assigned slides.
        </div>
      </div>

      {/* Group Members Cards Grid */}
      <div className={`grid grid-cols-1 ${currentGroupMode === '4-students' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-4`}>
        {teamList.map((member) => {
          const currentName = customNames[member.id] || member.defaultName;
          const isEditing = editingRoleId === member.id;

          return (
            <div
              key={member.id}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between transition-all"
            >
              <div>
                {/* Role Header */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                      ROLE #{member.roleNumber}
                    </span>

                    {/* Editable Name */}
                    {isEditing ? (
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="bg-slate-900 border border-indigo-500 rounded px-2 py-1 text-sm text-white font-semibold outline-none w-full"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveName(member.id);
                          }}
                        />
                        <button
                          onClick={() => saveName(member.id)}
                          className="p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-1.5">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {currentName}
                        </h3>
                        <button
                          onClick={() => startEditing(member)}
                          className="text-slate-500 hover:text-slate-300 transition"
                          title="Rename student"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Duration badge */}
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 px-2 py-1 rounded border border-emerald-800/60 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      ~{member.durationMinutes} mins
                    </span>
                  </div>
                </div>

                {/* Topics Covered */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Assigned Topic</span>
                  <p className="text-sm font-semibold text-slate-200 mt-0.5">
                    {member.topic}
                  </p>
                </div>

                {/* Slides assigned */}
                <div className="mt-3">
                  <span className="text-[11px] text-slate-400 uppercase font-semibold">Slides Assigned</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {member.slides.map((sNum) => (
                      <button
                        key={sNum}
                        onClick={() => onJumpToSlide(sNum)}
                        className="px-2 py-0.5 text-xs font-mono font-semibold bg-slate-900 hover:bg-indigo-600 hover:text-white text-slate-300 rounded border border-slate-800 transition"
                      >
                        Slide {sNum}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speech Opening Cue */}
                <div className="mt-3 p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 text-xs">
                  <span className="text-indigo-400 font-bold block text-[11px]">Opening Speech Cue:</span>
                  <span className="text-slate-300 italic">“{member.cueIntro}”</span>
                </div>
              </div>

              {/* Handover Transition */}
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span className="font-semibold text-amber-400">Handover to next: </span>
                <span className="italic text-slate-300">“{member.cueOutro}”</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Backup plan advice card if 3 students mode */}
      {currentGroupMode === '3-students' && (
        <div className="bg-amber-950/40 border border-amber-600/40 rounded-xl p-4 text-xs text-amber-200 flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div>
            <strong className="text-amber-300 block mb-0.5">
              3-Student Contingency Guidance (BEE Evaluation Rule):
            </strong>
            If one team member is absent, the teacher will examine all 3 remaining students. Student 1 takes basic concepts (Slides 1–4, 2.5 min), Student 2 takes the circuit & phasor diagram (Slides 5–6, 3 min), and Student 3 takes formulas, resonance, and the numerical problem (Slides 7–10, 3.5 min). Keep this transition fluid!
          </div>
        </div>
      )}
    </div>
  );
};
