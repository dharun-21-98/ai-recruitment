import React from 'react';
import { Page, JobDescription } from '../types';
import { MOCK_JOB_DESCRIPTIONS } from '../constants';

interface HomePageProps {
  navigateTo: (page: Page) => void;
  onSelectJd: (jd: JobDescription) => void;
}

// Fix: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const WorkflowStep: React.FC<{ icon: React.ReactElement; title: string; description: string; isLast?: boolean }> = ({ icon, title, description, isLast }) => (
    <div className="flex items-start">
        <div className="flex flex-col items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-brand-blue-500 text-white flex items-center justify-center">
                {icon}
            </div>
            {!isLast && <div className="mt-2 w-0.5 h-16 bg-brand-gray-300"></div>}
        </div>
        <div className="ml-4">
            <h3 className="text-lg font-semibold text-brand-gray-800">{title}</h3>
            <p className="mt-1 text-brand-gray-600">{description}</p>
        </div>
    </div>
);

const HomePage: React.FC<HomePageProps> = ({ navigateTo, onSelectJd }) => {
    const handleJdClick = (jd: JobDescription) => {
        onSelectJd(jd);
    }
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-brand-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Reimagining HR Automation</span>
                  <span className="block text-brand-blue-600">Smart, Swift & Scalable.</span>
                </h1>
                <p className="mt-3 text-base text-brand-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Timeless AI automates your recruitment pipeline, from sourcing and screening to scheduling, letting you focus on what matters: hiring the best talent.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button onClick={() => navigateTo(Page.JobBoards)} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-blue-600 hover:bg-brand-blue-700 md:py-4 md:text-lg md:px-10">
                      Get started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button onClick={() => navigateTo(Page.JobBoards)} className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-blue-700 bg-brand-blue-100 hover:bg-brand-blue-200 md:py-4 md:text-lg md:px-10">
                      Upload JD
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://i.ibb.co/p6jTHSvK/4332392-18940.jpg" alt="HR Collaboration" />
        </div>
      </div>

      {/* Workflow Section */}
      <div className="py-12 bg-brand-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                  <h2 className="text-base text-brand-blue-600 font-semibold tracking-wide uppercase">Our Process</h2>
                  <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-brand-gray-900 sm:text-4xl">
                      Automated Interview Orchestration
                  </p>
              </div>

              <div className="mt-10 flex justify-center">
                  <div className="space-y-4">
                      <WorkflowStep icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>} title="1. Upload Job Description" description="Start by providing the job details. Our AI analyzes the requirements." />
                      <WorkflowStep icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>} title="2. AI Candidate Sourcing" description="Resumes are matched from job boards with high-precision scoring." />
                      <WorkflowStep icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>} title="3. AI Screening & Qualification" description="Automated voice calls and evaluations qualify the best candidates." />
                      <WorkflowStep icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} title="4. Seamless Scheduling" description="Interviews are auto-scheduled based on calendar availability." isLast />
                  </div>
              </div>
          </div>
      </div>
      
       {/* Open Positions Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-brand-gray-900">Start with an Open Position</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {MOCK_JOB_DESCRIPTIONS.map(jd => (
              <div key={jd.id} className="p-6 border rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold text-brand-gray-800">{jd.title}</h3>
                <p className="text-sm text-brand-gray-500">{jd.department} - {jd.location}</p>
                <p className="mt-4 text-brand-gray-600">{jd.summary}</p>
                <button onClick={() => handleJdClick(jd)} className="mt-6 w-full bg-brand-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-brand-blue-700 transition-colors duration-300">
                  Find Candidates
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
