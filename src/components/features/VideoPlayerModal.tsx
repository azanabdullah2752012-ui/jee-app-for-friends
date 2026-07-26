import React from 'react';
import { Modal } from '../ui/Modal';
import { useApp } from '../../app/AppContext';
import { Video, ExternalLink, Play, Sparkles, Clock, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

export const VideoPlayerModal: React.FC = () => {
  const { activeVideo, closeVideoPlayer } = useApp();

  if (!activeVideo) return null;

  // Build clean YouTube search & direct launch URL
  const searchQuery = encodeURIComponent(activeVideo.title);
  const directYouTubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;

  return (
    <Modal
      isOpen={!!activeVideo}
      onClose={closeVideoPlayer}
      maxWidth="2xl"
      title={`🎥 ${activeVideo.title}`}
      subtitle="Curated Masterclass Lecture"
    >
      <div className="space-y-6 select-none">
        
        {/* Visual Premium Video Poster Card */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#12192E] via-[#1A2542] to-[#0F1626] border border-slate-700/80 p-6 flex flex-col justify-between shadow-2xl group">
          
          {/* Subtle Background Glow Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Info Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[11px] uppercase font-extrabold text-violet-300 bg-violet-950/80 px-3 py-1 rounded-full border border-violet-700/50 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              Verified JEE Masterclass
            </span>
            <span className="text-xs text-slate-300 font-mono bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              HD Lecture
            </span>
          </div>

          {/* Center Play Button Graphic */}
          <div className="relative z-10 my-auto text-center space-y-3">
            <a
              href={directYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/40 hover:scale-105 transition-all cursor-pointer border border-violet-400/30"
            >
              <Play className="w-8 h-8 fill-white translate-x-0.5" />
            </a>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-100 max-w-md mx-auto leading-snug">
              {activeVideo.title}
            </h3>
          </div>

          {/* Bottom Channel Info */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Curated JEE Main & Advanced Lecture
            </span>
            <span className="text-violet-400 font-semibold">YouTube HD Quality</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-5 bg-[#0E1524] rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-violet-400 font-bold text-xs uppercase tracking-wider">
              <Video className="w-4 h-4" />
              <span>Ready to Stream</span>
            </div>
            <p className="text-xs text-slate-300">
              Click below to launch this lecture directly on YouTube in HD with full playback speed controls.
            </p>
          </div>

          <a href={directYouTubeUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto shrink-0">
            <Button variant="glow" size="lg" className="w-full justify-center text-sm font-bold gap-2">
              <Play className="w-4 h-4 fill-white" />
              Watch Video on YouTube
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>

      </div>
    </Modal>
  );
};
