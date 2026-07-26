import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useApp } from '../../app/AppContext';
import { SignInWithChatGPT } from '@openai-oauth/react';
import {
  Sparkles,
  Send,
  Brain,
  Lightbulb,
  AlertTriangle,
  Bot,
  Edit3,
  Save,
  Copy,
  Check,
  MessageSquare,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import type { AiDoubtResponse } from '../../types';
import { getRichAiResponse } from '../../services/aiKnowledgeEngine';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  breakdown?: AiDoubtResponse;
}

export const AiDoubtSolverModal: React.FC = () => {
  const { isAiDoubtSolverOpen, closeAiDoubtSolver, initialAiDoubtPrompt, addMistake, profile } = useApp();

  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'editor'>('chat');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedBreakdownId, setExpandedBreakdownId] = useState<string | null>(null);

  // Live Answer Note Editor State
  const [editableNote, setEditableNote] = useState<string>('');
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);

  // Sync initial prompt if passed
  useEffect(() => {
    if (initialAiDoubtPrompt && isAiDoubtSolverOpen) {
      setPrompt(initialAiDoubtPrompt);
      generateAiResponse(initialAiDoubtPrompt);
    }
  }, [initialAiDoubtPrompt, isAiDoubtSolverOpen]);

  if (!isAiDoubtSolverOpen) return null;

  const generateAiResponse = (userQuery: string) => {
    setIsLoading(true);
    const userMsgId = `user-${Date.now()}`;
    const aiMsgId = `ai-${Date.now()}`;

    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatHistory((prev) => [...prev, newUserMsg]);

    setTimeout(() => {
      const richRes = getRichAiResponse(userQuery, profile.name ? profile.name.split(' ')[0] : 'Aspirant', profile.targetRank);

      const breakdown: AiDoubtResponse = {
        firstPrinciplesExplanation: richRes.firstPrinciplesExplanation,
        socraticHint: richRes.socraticHint,
        stepByStepSolution: richRes.stepByStepSolution,
        keyFormula: richRes.keyFormula,
        commonTrapWarning: richRes.commonTrapWarning,
      };

      const newAiMsg: ChatMessage = {
        id: aiMsgId,
        sender: 'ai',
        text: richRes.markdownText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        breakdown,
      };

      setChatHistory((prev) => [...prev, newAiMsg]);
      setIsLoading(false);

      setEditableNote(
        `# AI Master Notes: ${userQuery}\n\n` +
          `${richRes.markdownText}\n\n` +
          `## Socratic Derivation & Steps\n` +
          breakdown.stepByStepSolution.join('\n') +
          `\n\n## Exam Trap Warning\n⚠️ ${breakdown.commonTrapWarning}`
      );
    }, 600);
  };

  const handleSendMessage = () => {
    if (!prompt.trim() || isLoading) return;
    const currentQuery = prompt.trim();
    setPrompt('');
    generateAiResponse(currentQuery);
  };

  const handleCopyNote = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToMistakes = () => {
    if (!editableNote) return;
    addMistake({
      title: 'AI Tutor Note Summary',
      subject: 'Physics',
      chapter: 'General Concepts',
      topic: 'AI Clarification',
      errorType: 'Conceptual',
      whyWrong: 'Difficulty understanding concept before AI tutoring.',
      correctApproach: editableNote.slice(0, 200) + '...',
      keyTakeaway: 'Always apply first-principles analysis before jumping to formulas.',
    });
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 3000);
  };

  return (
    <Modal
      isOpen={isAiDoubtSolverOpen}
      onClose={closeAiDoubtSolver}
      maxWidth="4xl"
      title="🤖 AI Socratic Tutor & Live Answer Editor"
      subtitle="Powered by OpenAI OAuth — Interactive Chatbot & Real-Time Note Editor"
    >
      <div className="space-y-5 select-none">
        
        {/* Header Controls */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-[#101726] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Interactive Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-[#101726] text-slate-400 border border-slate-800 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Live Answer & Notes Editor</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <SignInWithChatGPT hideAttribution />
          </div>
        </div>

        {/* TAB 1: INTERACTIVE CHATBOT HUB */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-bold text-slate-400">Quick Prompts:</span>
              {[
                'Thermodynamics First & Second Law',
                'Explain Rotation of Rigid Bodies',
                'How to solve Integration by Parts?',
                'Organic Reaction Mechanisms (SN1 vs SN2)',
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrompt(chip);
                    generateAiResponse(chip);
                  }}
                  className="px-2.5 py-1 bg-[#101019] hover:bg-violet-950/60 border border-slate-800 hover:border-violet-700/50 rounded-lg text-[11px] text-slate-300 transition-colors cursor-pointer"
                >
                  ⚡ {chip}
                </button>
              ))}
            </div>

            <div className="max-h-[420px] overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {chatHistory.length === 0 ? (
                <div className="p-10 text-center space-y-3 bg-[#0B0F19] rounded-2xl border border-slate-800/80">
                  <Bot className="w-10 h-10 text-violet-400 mx-auto animate-bounce" />
                  <h3 className="text-sm font-bold text-slate-200">Ask your AI Tutor anything!</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Type any physics, chemistry, or math doubt below to get a clear, authentic explanation.
                  </p>
                </div>
              ) : (
                chatHistory.map((msg) => (
                  <div key={msg.id} className="space-y-3">
                    {msg.sender === 'user' ? (
                      <div className="flex justify-end">
                        <div className="max-w-xl p-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl rounded-tr-none text-xs leading-relaxed shadow-lg">
                          <p className="font-medium whitespace-pre-wrap">{msg.text}</p>
                          <span className="text-[9px] text-violet-200 block text-right mt-1 font-mono">{msg.timestamp}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 space-y-3 shadow-xl max-w-3xl">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                          <div className="flex items-center gap-2 text-violet-400 font-bold text-xs">
                            <Bot className="w-4 h-4 text-violet-400" />
                            <span>AI Tutor Explanation</span>
                          </div>
                          <button
                            onClick={() => handleCopyNote(msg.text, msg.id)}
                            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer font-mono"
                          >
                            {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Normal Text Response Display */}
                        <div className="text-xs text-slate-200 leading-relaxed space-y-2 whitespace-pre-wrap font-sans">
                          {msg.text}
                        </div>

                        {/* Optional Socratic Breakdown Toggle */}
                        {msg.breakdown && (
                          <div className="pt-2 border-t border-slate-800/80">
                            <button
                              onClick={() =>
                                setExpandedBreakdownId(expandedBreakdownId === msg.id ? null : msg.id)
                              }
                              className="text-[11px] font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer"
                            >
                              {expandedBreakdownId === msg.id ? (
                                <>
                                  <ChevronUp className="w-3.5 h-3.5" /> Hide Structural Socratic Cards
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3.5 h-3.5" /> View Structural Socratic Cards
                                </>
                              )}
                            </button>

                            {expandedBreakdownId === msg.id && (
                              <div className="space-y-3 text-xs pt-3 animate-fade-in">
                                <div className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-800/40 space-y-1">
                                  <span className="font-bold text-indigo-400 uppercase tracking-wider block flex items-center gap-1 text-[11px]">
                                    <Brain className="w-3.5 h-3.5" /> 1. First-Principles Mental Model
                                  </span>
                                  <p className="text-slate-200 leading-relaxed">{msg.breakdown.firstPrinciplesExplanation}</p>
                                </div>

                                <div className="p-3 bg-amber-950/20 rounded-xl border border-amber-800/40 space-y-1">
                                  <span className="font-bold text-amber-400 uppercase tracking-wider block flex items-center gap-1 text-[11px]">
                                    <Lightbulb className="w-3.5 h-3.5" /> 2. Socratic Hint
                                  </span>
                                  <p className="text-amber-100 font-medium">{msg.breakdown.socraticHint}</p>
                                </div>

                                <div className="p-3 bg-[#070A12] rounded-xl border border-slate-800 font-mono text-[11px]">
                                  <span className="font-bold text-emerald-400 uppercase tracking-wider block mb-1">⚡ Key Governing Formula:</span>
                                  <code className="text-emerald-300 font-bold block">{msg.breakdown.keyFormula}</code>
                                </div>

                                <div className="space-y-1 font-mono text-[11px]">
                                  <span className="font-bold text-slate-300 uppercase tracking-wider block">Step-by-Step Proof:</span>
                                  {msg.breakdown.stepByStepSolution.map((s, i) => (
                                    <div key={i} className="p-2 bg-[#0B0F19] rounded-lg border border-slate-800/80 text-slate-300">
                                      {s}
                                    </div>
                                  ))}
                                </div>

                                <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-800/40 text-[11px] space-y-1">
                                  <span className="font-bold text-rose-400 flex items-center gap-1">
                                    <AlertTriangle className="w-3.5 h-3.5" /> Common Exam Trap:
                                  </span>
                                  <p className="text-rose-200">{msg.breakdown.commonTrapWarning}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}

              {isLoading && (
                <div className="p-4 bg-[#0E1524] rounded-2xl border border-slate-800 flex items-center gap-3 text-xs text-violet-300">
                  <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
                  <span>AI Tutor is thinking...</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask follow-up question or paste another doubt..."
                className="flex-1 p-3 bg-[#0B0F19] rounded-xl border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500 font-sans"
              />
              <Button variant="glow" size="sm" onClick={handleSendMessage} disabled={isLoading || !prompt.trim()}>
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </Button>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ANSWER NOTE EDITOR */}
        {activeTab === 'editor' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-violet-400" />
                Live Answer Note Editor (Modify & Customize Generated Notes)
              </label>

              <Button variant="outline" size="sm" onClick={handleSaveToMistakes}>
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isNoteSaved ? 'Saved to Mistake Notebook! ✓' : 'Save to Mistake Notebook'}</span>
              </Button>
            </div>

            <textarea
              value={editableNote}
              onChange={(e) => setEditableNote(e.target.value)}
              rows={14}
              placeholder="Your generated notes will appear here. You can edit, add custom derivations, or format them..."
              className="w-full p-4 bg-[#070A12] rounded-xl border border-slate-800 text-xs text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-violet-500"
            />
          </div>
        )}

      </div>
    </Modal>
  );
};
