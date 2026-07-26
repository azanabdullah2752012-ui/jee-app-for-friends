import React from 'react';
import { X, HelpCircle, ArrowRight, BrainCircuit, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../../app/AppContext';
import { Button } from '../ui/Button';

export const ImStuckDrawer: React.FC = () => {
  const { isImStuckOpen, setIsImStuckOpen, setIsQuestionBreakdownOpen } = useApp();

  if (!isImStuckOpen) return null;

  const handleDeconstruct = () => {
    setIsImStuckOpen(false);
    setIsQuestionBreakdownOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsImStuckOpen(false)}
      />

      {/* Right Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101728] border-l border-slate-800 text-slate-100 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-slide-left">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">I'm Stuck</h3>
                  <p className="text-xs text-slate-400">Diagnostic Guidance & Roadblock Removal</p>
                </div>
              </div>
              <button
                onClick={() => setIsImStuckOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800/80"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subtitle Message */}
            <div className="my-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-medium text-slate-200">
                Bro, getting stuck is where real learning happens. Don't waste 2 hours staring at a wall.
              </p>
              <p className="text-slate-400">
                Select where you are blocked right now:
              </p>
            </div>

            {/* Diagnostic Pathways */}
            <div className="space-y-3">
              {/* Option 1: Deconstruct Problem */}
              <button
                onClick={handleDeconstruct}
                className="w-full text-left p-4 rounded-xl bg-[#131B2E] hover:bg-[#18243E] border border-slate-800 hover:border-violet-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-lg bg-violet-950 text-violet-400 border border-violet-800/50">
                      <BrainCircuit className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-violet-300">
                        Deconstruct a Problem
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Break down Given Data, Target, and Progressive Hints.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              {/* Option 2: Concept Gap Finder */}
              <button
                onClick={() => alert("Concept Gap Diagnostic: Physics - Laws of Motion requires revisitation of Kinematics Vector Resolution.")}
                className="w-full text-left p-4 rounded-xl bg-[#131B2E] hover:bg-[#18243E] border border-slate-800 hover:border-amber-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800/50">
                      <HelpCircle className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300">
                        Prerequisite Concept Gap
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Check if missing a fundamental formula or theorem.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              {/* Option 3: 15-Min Study Reset */}
              <button
                onClick={() => alert("Study Reset Activated: Take 3 deep breaths, drink water, and switch to solving 3 easy PYQs.")}
                className="w-full text-left p-4 rounded-xl bg-[#131B2E] hover:bg-[#18243E] border border-slate-800 hover:border-emerald-500/40 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                      <RefreshCw className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100 group-hover:text-emerald-300">
                        15-Minute Micro Reset
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Overwhelmed? Pivot to high-success micro tasks.
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-slate-800">
            <Button
              variant="glow"
              className="w-full justify-center"
              onClick={handleDeconstruct}
            >
              <Sparkles className="w-4 h-4" />
              Open Question Breakdown Engine
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
