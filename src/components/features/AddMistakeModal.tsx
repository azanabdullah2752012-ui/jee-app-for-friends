import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useApp } from '../../app/AppContext';
import type { SubjectType, ErrorType } from '../../types';

export const AddMistakeModal: React.FC = () => {
  const { isAddMistakeOpen, setIsAddMistakeOpen, addMistake } = useApp();

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState<SubjectType>('Physics');
  const [chapter, setChapter] = useState('');
  const [topic, setTopic] = useState('');
  const [errorType, setErrorType] = useState<ErrorType>('Conceptual');
  const [whyWrong, setWhyWrong] = useState('');
  const [correctApproach, setCorrectApproach] = useState('');
  const [keyTakeaway, setKeyTakeaway] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !whyWrong) return;

    addMistake({
      title,
      subject,
      chapter: chapter || 'General Core Topic',
      topic: topic || 'Key Concept',
      errorType,
      whyWrong,
      correctApproach: correctApproach || 'Review fundamental theory and retry PYQ problem sets.',
      keyTakeaway: keyTakeaway || 'Verify vector directions and mathematical constraints before concluding.',
    });

    // Reset & close
    setTitle('');
    setChapter('');
    setTopic('');
    setWhyWrong('');
    setCorrectApproach('');
    setKeyTakeaway('');
    setIsAddMistakeOpen(false);
  };

  return (
    <Modal
      isOpen={isAddMistakeOpen}
      onClose={() => setIsAddMistakeOpen(false)}
      title="Add New Mistake"
      subtitle="Log wrong attempts to turn weaknesses into mastered concepts"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-200">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Mistake Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Pseudo force direction in accelerated elevator frame"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectType)}
              className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
            >
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Error Category</label>
            <select
              value={errorType}
              onChange={(e) => setErrorType(e.target.value as ErrorType)}
              className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
            >
              <option value="Conceptual">Conceptual</option>
              <option value="Calculation">Calculation Error</option>
              <option value="Time Management">Time Pressure</option>
              <option value="Overconfidence">Overconfidence</option>
              <option value="Question Misread">Question Misread</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Chapter</label>
            <input
              type="text"
              placeholder="e.g. Laws of Motion & Friction"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Topic</label>
            <input
              type="text"
              placeholder="e.g. Non-Inertial Frames"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Why was it wrong? *</label>
          <textarea
            required
            rows={2}
            placeholder="Explain your initial incorrect reasoning or vector resolution error..."
            value={whyWrong}
            onChange={(e) => setWhyWrong(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-violet-500 text-xs resize-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Correct Approach</label>
          <input
            type="text"
            placeholder="Step-by-step procedure (e.g. resolve components perpendicular to incline first)"
            value={correctApproach}
            onChange={(e) => setCorrectApproach(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Key Takeaway rule</label>
          <input
            type="text"
            placeholder="1-line rule to remember for future attempts..."
            value={keyTakeaway}
            onChange={(e) => setKeyTakeaway(e.target.value)}
            className="w-full bg-[#0B0F19] border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-violet-500 text-xs"
          />
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
          <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddMistakeOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Mistake to Notebook
          </Button>
        </div>
      </form>
    </Modal>
  );
};
