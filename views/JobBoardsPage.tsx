
import React, { useState, useMemo, useEffect } from 'react';
import { JobDescription, Candidate } from '../types';
import { MOCK_JOB_DESCRIPTIONS, MOCK_CANDIDATES } from '../constants';

interface JobBoardsPageProps {
  selectedJd: JobDescription | null;
  onPassToQueue: (candidateIds: number[]) => void;
}

const JobBoardsPage: React.FC<JobBoardsPageProps> = ({ selectedJd, onPassToQueue }) => {
    const [activeTab, setActiveTab] = useState('paste');
    const [jdText, setJdText] = useState(selectedJd?.summary || '');
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(new Set());
    
    // Filters
    const [skillsMatchFilter, setSkillsMatchFilter] = useState(70);
    const [recencyFilter, setRecencyFilter] = useState(30);
    const [locationFilter, setLocationFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState<string[]>([]);

    useEffect(() => {
        if(selectedJd) {
            setJdText(selectedJd.summary);
            handleSearch();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedJd]);

    const handleSearch = () => {
        setLoading(true);
        setSelectedCandidates(new Set());
        setTimeout(() => {
            setCandidates(MOCK_CANDIDATES.filter(c => c.jobId === (selectedJd?.id || 1)));
            setLoading(false);
        }, 1500);
    };
    
    const toggleSourceFilter = (source: string) => {
        setSourceFilter(prev => 
            prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
        );
    };
    
    const filteredCandidates = useMemo(() => {
        return candidates
            .filter(c => c.skillsMatch >= skillsMatchFilter)
            .filter(c => c.recency <= recencyFilter)
            .filter(c => locationFilter === '' || c.location.toLowerCase().includes(locationFilter.toLowerCase()))
            .filter(c => sourceFilter.length === 0 || sourceFilter.includes(c.source));
    }, [candidates, skillsMatchFilter, recencyFilter, locationFilter, sourceFilter]);

    const handleSelectCandidate = (id: number) => {
        const newSelection = new Set(selectedCandidates);
        if (newSelection.has(id)) {
            newSelection.delete(id);
        } else {
            newSelection.add(id);
        }
        setSelectedCandidates(newSelection);
    };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Filters Panel */}
      <aside className="w-1/4 bg-white p-6 border-r border-brand-gray-200 overflow-y-auto">
        <h2 className="text-xl font-bold text-brand-gray-800">Filters</h2>
        <div className="mt-6 space-y-6">
            <div>
                <label htmlFor="skills-match" className="block text-sm font-medium text-brand-gray-700">Skills Match (%)</label>
                <input type="range" id="skills-match" min="0" max="100" value={skillsMatchFilter} onChange={e => setSkillsMatchFilter(parseInt(e.target.value))} className="w-full h-2 bg-brand-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="text-right text-sm text-brand-gray-500">{skillsMatchFilter}%</div>
            </div>
            <div>
                <label htmlFor="recency" className="block text-sm font-medium text-brand-gray-700">Recency (days)</label>
                <input type="range" id="recency" min="1" max="90" value={recencyFilter} onChange={e => setRecencyFilter(parseInt(e.target.value))} className="w-full h-2 bg-brand-gray-200 rounded-lg appearance-none cursor-pointer" />
                <div className="text-right text-sm text-brand-gray-500">{recencyFilter} days</div>
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-brand-gray-700">Location</label>
                <input type="text" id="location" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-brand-gray-300 rounded-md shadow-sm placeholder-brand-gray-400 focus:outline-none focus:ring-brand-blue-500 focus:border-brand-blue-500 sm:text-sm" placeholder="e.g. Remote" />
            </div>
            <div>
                <h3 className="text-sm font-medium text-brand-gray-700">Source</h3>
                <div className="mt-2 space-y-2">
                    {['LinkedIn', 'Indeed', 'Naukri', 'ZipRecruiter'].map(source => (
                        <div key={source} className="flex items-center">
                            <input id={source} name="source" type="checkbox" checked={sourceFilter.includes(source)} onChange={() => toggleSourceFilter(source)} className="h-4 w-4 text-brand-blue-600 border-brand-gray-300 rounded focus:ring-brand-blue-500" />
                            <label htmlFor={source} className="ml-3 text-sm text-brand-gray-600">{source}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-6 flex flex-col">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-brand-gray-200">
          <h1 className="text-2xl font-bold text-brand-gray-800">Resume Matcher</h1>
          <div className="mt-4">
            <div className="border-b border-brand-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('paste')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'paste' ? 'border-brand-blue-500 text-brand-blue-600' : 'border-transparent text-brand-gray-500 hover:text-brand-gray-700 hover:border-brand-gray-300'}`}>Paste JD</button>
                    <button onClick={() => setActiveTab('upload')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'upload' ? 'border-brand-blue-500 text-brand-blue-600' : 'border-transparent text-brand-gray-500 hover:text-brand-gray-700 hover:border-brand-gray-300'}`}>Upload JD</button>
                </nav>
            </div>
            <div className="mt-4">
                {activeTab === 'paste' ? (
                    <textarea value={jdText} onChange={e => setJdText(e.target.value)} rows={4} className="w-full p-2 border rounded-md" placeholder="Paste job description here..."></textarea>
                ) : (
                    <input type="file" className="block w-full text-sm text-brand-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-blue-50 file:text-brand-blue-700 hover:file:bg-brand-blue-100"/>
                )}
            </div>
            <div className="mt-4 flex justify-end">
                <button onClick={handleSearch} disabled={loading} className="px-6 py-2 bg-brand-blue-600 text-white font-semibold rounded-md hover:bg-brand-blue-700 disabled:bg-brand-gray-400">
                    {loading ? 'Searching...' : 'Search Candidates'}
                </button>
            </div>
          </div>
        </div>

        {/* Candidates List */}
        <div className="flex-grow mt-6 overflow-y-auto">
            {loading ? (
                 <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-blue-500"></div>
                </div>
            ) : (
            <div className="space-y-4">
                {filteredCandidates.map(c => (
                    <div key={c.id} className="bg-white p-4 rounded-lg shadow-sm border border-brand-gray-200 flex items-center justify-between hover:border-brand-blue-500">
                        <div className="flex items-center">
                            <input type="checkbox" checked={selectedCandidates.has(c.id)} onChange={() => handleSelectCandidate(c.id)} className="h-5 w-5 text-brand-blue-600 border-brand-gray-300 rounded focus:ring-brand-blue-500" />
                            <img src={c.avatar} alt={c.name} className="h-12 w-12 rounded-full ml-4" />
                            <div className="ml-4">
                                <p className="font-bold text-brand-gray-800">{c.name}</p>
                                <p className="text-sm text-brand-gray-500">{c.jobTitle} - {c.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="text-center">
                                <p className="font-bold text-brand-blue-600">{c.skillsMatch}%</p>
                                <p className="text-xs text-brand-gray-500">Match</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-brand-gray-700">{c.recency}d</p>
                                <p className="text-xs text-brand-gray-500">Recency</p>
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-brand-gray-700">${(c.expectedCTC / 1000)}k</p>
                                <p className="text-xs text-brand-gray-500">CTC</p>
                            </div>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                c.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>{c.active ? 'Active' : 'Inactive'}</span>
                        </div>
                    </div>
                ))}
            </div>
            )}
            {!loading && filteredCandidates.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-brand-gray-500">No candidates found. Try adjusting your filters or searching a different JD.</p>
                </div>
            )}
        </div>
        
        {/* Action Bar */}
        <div className="mt-auto pt-4 bg-brand-gray-100">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-brand-gray-200 flex justify-between items-center">
                <p className="text-sm font-medium text-brand-gray-700">{selectedCandidates.size} candidate(s) selected</p>
                <button onClick={() => onPassToQueue(Array.from(selectedCandidates))} disabled={selectedCandidates.size === 0} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-brand-gray-400">
                    Pass to AI Queue
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};

export default JobBoardsPage;
