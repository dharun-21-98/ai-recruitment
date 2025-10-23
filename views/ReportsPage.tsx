
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_CANDIDATES } from '../constants';

const chartData = [
  { name: 'Sourced', value: 45 },
  { name: 'Screened', value: 32 },
  { name: 'AI Qualified', value: 25 },
  { name: 'Recruiter IV', value: 15 },
  { name: 'Manager IV', value: 8 },
  { name: 'Offer', value: 3 },
];

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, change, changeType }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-brand-gray-200">
        <h3 className="text-sm font-medium text-brand-gray-500">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-brand-gray-900">{value}</p>
        {change && (
            <p className={`mt-1 text-sm ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {change} from last week
            </p>
        )}
    </div>
);

const ReportsPage: React.FC = () => {
    const [candidates, setCandidates] = useState(MOCK_CANDIDATES.slice(0, 5));

    const handleScoreChange = (id: number, field: 'skillsMatch' | 'voiceScore', value: number) => {
        setCandidates(prev => 
            prev.map(c => 
                c.id === id ? { ...c, [field]: value } : c
            )
        );
    };

    return (
        <div className="p-8 bg-brand-gray-50">
            <h1 className="text-3xl font-bold text-brand-gray-800">Analytics & Reports</h1>
            <p className="mt-2 text-brand-gray-600">Insights into your recruitment pipeline and manual override controls.</p>

            {/* Stat Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Avg. Response Rate" value="68%" change="+5%" changeType="increase" />
                <StatCard title="Avg. Time to Schedule" value="2.1 Days" change="-0.3 Days" changeType="decrease" />
                <StatCard title="Avg. AI Screening Score" value="8.2 / 10" change="+0.4" changeType="increase" />
                <StatCard title="Candidates in Pipeline" value="45" />
            </div>

            {/* Chart */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-brand-gray-200">
                <h2 className="text-xl font-bold text-brand-gray-800">Candidate Funnel</h2>
                <div className="mt-4" style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Human-in-the-Loop Panel */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-brand-gray-200">
                <h2 className="text-xl font-bold text-brand-gray-800">Human-in-the-Loop Verification</h2>
                <p className="mt-1 text-sm text-brand-gray-600">Manually verify candidates, adjust scoring weights, or override AI recommendations.</p>
                <div className="mt-4 overflow-x-auto">
                    <table className="min-w-full divide-y divide-brand-gray-200">
                        <thead className="bg-brand-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Candidate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">AI Skills Match</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">AI Voice Score</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">AI Rank</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-brand-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-brand-gray-200">
                            {candidates.map(c => (
                                <tr key={c.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img className="h-10 w-10 rounded-full" src={c.avatar} alt="" />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-brand-gray-900">{c.name}</div>
                                                <div className="text-sm text-brand-gray-500">{c.jobTitle}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input 
                                            type="number" 
                                            value={c.skillsMatch}
                                            onChange={(e) => handleScoreChange(c.id, 'skillsMatch', parseInt(e.target.value))}
                                            className="w-20 p-1 border rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <input 
                                            type="number" 
                                            value={c.voiceScore}
                                            onChange={(e) => handleScoreChange(c.id, 'voiceScore', parseInt(e.target.value))}
                                            className="w-20 p-1 border rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-gray-500">{c.aiRank}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-brand-blue-600 hover:text-brand-blue-900">Approve</button>
                                        <button className="ml-4 text-red-600 hover:text-red-900">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
