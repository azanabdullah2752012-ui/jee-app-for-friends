import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useApp } from '../../app/AppContext';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { Badge, getSubjectBadgeVariant } from '../ui/Badge';

export const TimerModal: React.FC = () => {
  const { activeTimerTask, setActiveTimerTask, toggleTask } = useApp();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    if (activeTimerTask) {
      setSecondsRemaining(activeTimerTask.durationMinutes * 60);
      setIsRunning(true);
    }
  }, [activeTimerTask]);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsRemaining]);

  if (!activeTimerTask) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleMarkComplete = () => {
    toggleTask(activeTimerTask.id);
    setActiveTimerTask(null);
  };

  return (
    <Modal
      isOpen={!!activeTimerTask}
      onClose={() => setActiveTimerTask(null)}
      title="Focus Session"
      subtitle="Deep work focus timer"
      maxWidth="md"
    >
      <div className="text-center space-y-6 py-2">
        <div className="flex justify-center">
          <Badge variant={getSubjectBadgeVariant(activeTimerTask.subject)} size="md">
            {activeTimerTask.subject} — {activeTimerTask.topic}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-slate-100">{activeTimerTask.title}</h3>

        {/* Digital Clock Display */}
        <div className="py-6 px-8 bg-[#0B0F19] rounded-2xl border border-slate-800/90 shadow-inner">
          <div className="font-mono text-5xl md:text-6xl font-extrabold text-violet-400 tracking-wider">
            {formattedTime}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Target Duration: {activeTimerTask.durationMinutes} mins
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSecondsRemaining(activeTimerTask.durationMinutes * 60);
              setIsRunning(false);
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>

          <Button
            variant={isRunning ? 'secondary' : 'glow'}
            size="md"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Timer
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Focus Session
              </>
            )}
          </Button>

          <Button variant="primary" size="sm" onClick={handleMarkComplete}>
            <CheckCircle className="w-4 h-4" />
            Done
          </Button>
        </div>
      </div>
    </Modal>
  );
};
