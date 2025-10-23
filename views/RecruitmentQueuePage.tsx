
import React, { useState, useEffect } from 'react';
import { Candidate, AgentStatus } from '../types';
import { MOCK_CANDIDATES } from '../constants';

interface RecruitmentQueuePageProps {
  candidateIds: number[];
}

const AGENT_STAGES = [
    AgentStatus.Pending,
    AgentStatus.JDAnalysis,
    AgentStatus.ResumeEvaluation,
    AgentStatus.AIInterview,
    AgentStatus.Scheduling,
    AgentStatus.FollowUp,
    AgentStatus.Handoff,
    AgentStatus.Complete
];

const AGENT_DESCRIPTIONS: { [key in AgentStatus]: string } = {
    [AgentStatus.Pending]: 'Waiting to be processed by AI agents.',
    [AgentStatus.JDAnalysis]: 'Understands job description and generates key skills.',
    [AgentStatus.ResumeEvaluation]: 'Matches profiles, ranks them, and comments reasoning.',
    [AgentStatus.AIInterview]: 'Auto-calls candidate, performs voice Q&A.',
    [AgentStatus.Scheduling]: 'Checks calendars and proposes interview times.',
    [AgentStatus.FollowUp]: 'Performs automated reachouts if needed.',
    [AgentStatus.Handoff]: 'Routes candidates to recruiter or hiring manager.',
    [AgentStatus.Complete]: 'AI workflow finished for this candidate.'
};

const CandidateCard: React.FC<{ candidate: Candidate }> = ({ candidate }) => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-brand-gray-200 mb-3">
        <div className="flex items-center">
            <img src={candidate.avatar} alt={candidate.name} className="h-10 w-10 rounded-full" />
            <div className="ml-3">
                <p className="font-bold text-sm text-brand-gray-800">{candidate.name}</p>
                <p className="text-xs text-brand-gray-500">{candidate.jobTitle}</p>
            </div>
        </div>
        <div className="mt-2 text-xs text-brand-gray-600">
            <span className="font-semibold">{candidate.agentStatus}...</span>
        </div>
    </div>
);

const RecruitmentQueuePage: React.FC<RecruitmentQueuePageProps> = ({ candidateIds }) => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);

    useEffect(() => {
        const initialCandidates = MOCK_CANDIDATES.filter(c => candidateIds.includes(c.id))
            .map(c => ({ ...c, agentStatus: AgentStatus.Pending }));
        setCandidates(initialCandidates);
    }, [candidateIds]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCandidates(prevCandidates => 
                prevCandidates.map(c => {
                    const currentStageIndex = AGENT_STAGES.indexOf(c.agentStatus);
                    if (currentStageIndex < AGENT_STAGES.length - 1) {
                        // Randomly decide whether to advance this candidate
                        if (Math.random() > 0.6) { 
                            return { ...c, agentStatus: AGENT_STAGES[currentStageIndex + 1] };
                        }
                    }
                    return c;
                })
            );
        }, 2000); // Process candidates every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8 bg-brand-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-brand-gray-800">AI Recruitment Queue</h1>
            <p className="mt-2 text-brand-gray-600">Live view of the AgenticAI automating the recruitment process.</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {AGENT_STAGES.map(stage => {
                    // Filter candidates for the current stage
                    const stageCandidates = candidates.filter(c => c.agentStatus === stage);
                    return (
                        <div key={stage} className="bg-brand-gray-100 rounded-lg p-4">
                            <h2 className="font-bold text-brand-gray-700 flex items-center">
                                {stage}
                                <span className="ml-2 bg-brand-gray-300 text-brand-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                                    {stageCandidates.length}
                                </span>
                            </h2>
                            <p className="text-xs text-brand-gray-500 mt-1 h-10">{AGENT_DESCRIPTIONS[stage]}</p>
                            <div className="mt-4 space-y-3 h-96 overflow-y-auto">
                                {stageCandidates.map(candidate => (
                                    <CandidateCard key={candidate.id} candidate={candidate} />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecruitmentQueuePage;
