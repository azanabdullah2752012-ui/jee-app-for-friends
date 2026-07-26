import React, { useState } from 'react';
import { useApp } from '../app/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge, getSubjectBadgeVariant } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { FolderGit2, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResourcesPage: React.FC = () => {
  const { resources } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const filterTabs = [
    { id: 'All', label: 'All Resources' },
    { id: 'Physics', label: 'Physics' },
    { id: 'Chemistry', label: 'Chemistry' },
    { id: 'Mathematics', label: 'Maths' },
  ];

  const filteredResources = resources.filter(
    (r) => selectedSubject === 'All' || r.subject === selectedSubject
  );

  return (
    <div className="space-y-6 select-none">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-heading text-slate-100 flex items-center gap-2">
          <FolderGit2 className="w-6 h-6 text-emerald-400" />
          Curated Resources Hub
        </h1>
        <p className="text-xs text-slate-400">
          Handpicked theory summaries, NCERT highlighted pages, top video breakdowns, and PYQ problem sets.
        </p>
      </div>

      <Tabs tabs={filterTabs} activeTab={selectedSubject} onChange={setSelectedSubject} />

      {filteredResources.length === 0 ? (
        <Card padding="lg" className="text-center space-y-4 py-12">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-200">No Resources Added Yet</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Explore chapter workspaces in Subjects to access NCERT textbook notes, PYQ sets, and masterclass video guides.
            </p>
          </div>
          <Link to="/subjects">
            <Button variant="glow" size="md">
              Browse Subject Workspaces
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.map((res) => (
            <Card key={res.id} padding="lg" hoverEffect className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={getSubjectBadgeVariant(res.subject)} size="sm">
                    {res.subject}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{res.chapter}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {res.type}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-100">{res.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{res.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-500 font-mono">{res.durationOrPages}</span>
                <Button variant="outline" size="sm">
                  {res.linkText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
