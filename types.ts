
export enum Page {
  Home = 'Home',
  JobBoards = 'Job Boards',
  RecruitmentQueue = 'Recruitment Queue',
  Schedules = 'Schedules',
  Reports = 'Reports',
  Settings = 'Settings',
}

export enum CandidateStatus {
  Sourced = 'Sourced',
  Screened = 'Screened',
  AICallQualified = 'AI Call Qualified',
  RecruiterInterview = 'Recruiter Interview',
  ManagerEvaluation = 'Manager Evaluation',
  Offer = 'Offer',
  Hired = 'Hired',
}

export enum AgentStatus {
    Pending = 'Pending',
    JDAnalysis = 'JD Analyzer Agent',
    ResumeEvaluation = 'Resume Evaluator Agent',
    AIInterview = 'AI Interview Agent',
    Scheduling = 'Scheduling Agent',
    FollowUp = 'Follow-up Agent',
    Handoff = 'Assignment & Handoff Agent',
    Complete = 'Complete',
}

export interface Candidate {
  id: number;
  name: string;
  avatar: string;
  jobTitle: string;
  location: string;
  recency: number; // days ago
  expectedCTC: number;
  source: 'LinkedIn' | 'Indeed' | 'Naukri' | 'ZipRecruiter';
  skillsMatch: number;
  voiceScore: number;
  aiRank: number;
  status: CandidateStatus;
  agentStatus: AgentStatus;
  jobId: number;
  active: boolean;
}

export interface JobDescription {
  id: number;
  title: string;
  department: string;
  location: string;
  summary: string;
}

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
}
