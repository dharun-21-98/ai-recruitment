
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import Header from './components/Header';
import HomePage from './views/HomePage';
import JobBoardsPage from './views/JobBoardsPage';
import RecruitmentQueuePage from './views/RecruitmentQueuePage';
import SchedulesPage from './views/SchedulesPage';
import ReportsPage from './views/ReportsPage';
import { JobDescription } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedJd, setSelectedJd] = useState<JobDescription | null>(null);
  const [candidatesForQueue, setCandidatesForQueue] = useState<number[]>([]);

  const navigateTo = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const handleSelectJd = (jd: JobDescription) => {
    setSelectedJd(jd);
    navigateTo(Page.JobBoards);
  };
  
  const handlePassToQueue = (candidateIds: number[]) => {
    setCandidatesForQueue(candidateIds);
    navigateTo(Page.RecruitmentQueue);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <HomePage navigateTo={navigateTo} onSelectJd={handleSelectJd} />;
      case Page.JobBoards:
        return <JobBoardsPage selectedJd={selectedJd} onPassToQueue={handlePassToQueue} />;
      case Page.RecruitmentQueue:
        return <RecruitmentQueuePage candidateIds={candidatesForQueue} />;
      case Page.Schedules:
        return <SchedulesPage />;
      case Page.Reports:
        return <ReportsPage />;
      case Page.Settings:
        return <div className="p-8"><h1 className="text-3xl font-bold text-brand-gray-800">Settings</h1><p className="mt-2 text-brand-gray-600">Manage your account and application settings here.</p></div>;
      default:
        return <HomePage navigateTo={navigateTo} onSelectJd={handleSelectJd} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-gray-100 text-brand-gray-800">
      <Header currentPage={currentPage} navigateTo={navigateTo} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
