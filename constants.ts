
import { Page, Candidate, JobDescription, CandidateStatus, AgentStatus, Notification } from './types';

export const NAV_ITEMS: Page[] = [
  Page.Home,
  Page.JobBoards,
  Page.RecruitmentQueue,
  Page.Schedules,
  Page.Reports,
  Page.Settings,
];

export const MOCK_JOB_DESCRIPTIONS: JobDescription[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    department: 'Technology',
    location: 'Remote',
    summary: 'Seeking a skilled Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and modern web technologies. The ideal candidate will be a key contributor to our user-facing products, focusing on performance, scalability, and creating a seamless user experience. Experience with Tailwind CSS and state management libraries is a plus.'
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    summary: 'We are looking for an experienced Product Manager to guide the development of our core platform. You will work with cross-functional teams to design, build, and roll-out products that deliver the company’s vision and strategy. Strong analytical skills and a data-driven mindset are essential.'
  },
];

export const MOCK_CANDIDATES: Candidate[] = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://picsum.photos/id/1005/100/100', jobTitle: 'Frontend Developer', location: 'San Francisco, CA', recency: 2, expectedCTC: 120000, source: 'LinkedIn', skillsMatch: 92, voiceScore: 8, aiRank: 1, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 1, active: true },
  { id: 2, name: 'Brenda Smith', avatar: 'https://picsum.photos/id/1011/100/100', jobTitle: 'React Engineer', location: 'Austin, TX', recency: 5, expectedCTC: 115000, source: 'Indeed', skillsMatch: 88, voiceScore: 9, aiRank: 2, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 1, active: true },
  { id: 3, name: 'Charles Brown', avatar: 'https://picsum.photos/id/1012/100/100', jobTitle: 'UI/UX Developer', location: 'Remote', recency: 1, expectedCTC: 130000, source: 'Naukri', skillsMatch: 78, voiceScore: 7, aiRank: 5, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 1, active: false },
  { id: 4, name: 'Diana Garcia', avatar: 'https://picsum.photos/id/1027/100/100', jobTitle: 'Full-Stack Developer', location: 'Chicago, IL', recency: 10, expectedCTC: 140000, source: 'ZipRecruiter', skillsMatch: 85, voiceScore: 8, aiRank: 3, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 1, active: true },
  { id: 5, name: 'Ethan Wilson', avatar: 'https://picsum.photos/id/103/100/100', jobTitle: 'Software Engineer', location: 'Remote', recency: 3, expectedCTC: 110000, source: 'LinkedIn', skillsMatch: 81, voiceScore: 6, aiRank: 4, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 1, active: true },
  { id: 6, name: 'Fiona Miller', avatar: 'https://picsum.photos/id/1040/100/100', jobTitle: 'Product Owner', location: 'New York, NY', recency: 4, expectedCTC: 150000, source: 'LinkedIn', skillsMatch: 95, voiceScore: 9, aiRank: 1, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 2, active: true },
  { id: 7, name: 'George Davis', avatar: 'https://picsum.photos/id/1041/100/100', jobTitle: 'Project Manager', location: 'Boston, MA', recency: 12, expectedCTC: 145000, source: 'Indeed', skillsMatch: 82, voiceScore: 7, aiRank: 3, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 2, active: false },
  { id: 8, name: 'Hannah Rodriguez', avatar: 'https://picsum.photos/id/106/100/100', jobTitle: 'Senior Product Manager', location: 'New York, NY', recency: 1, expectedCTC: 165000, source: 'ZipRecruiter', skillsMatch: 91, voiceScore: 8, aiRank: 2, status: CandidateStatus.Sourced, agentStatus: AgentStatus.Pending, jobId: 2, active: true },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, message: 'Alex Johnson accepted the interview slot for tomorrow.', timestamp: '2m ago', read: false },
    { id: 2, message: 'New candidate match: Brenda Smith for Senior Frontend Engineer.', timestamp: '15m ago', read: false },
    { id: 3, message: 'Scheduling agent failed to find a slot for Charles Brown.', timestamp: '1h ago', read: true },
    { id: 4, message: 'AI call completed for Diana Garcia with a score of 8/10.', timestamp: '3h ago', read: true },
];
