
import React, { useState } from 'react';

const CalendarIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12h22.5" />
    </svg>
);

const UserGroupIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962A3.375 3.375 0 019 12.75l-1.536 1.536a3.375 3.375 0 01-4.771 0l-1.536-1.536A3.375 3.375 0 011.5 9.75l1.536-1.536a3.375 3.375 0 014.771 0l1.536 1.536m0 0a3.375 3.375 0 010 4.771l-1.536 1.536m-4.771-4.771l1.536-1.536m0 0a3.375 3.375 0 014.771 0l1.536 1.536M15 9.75l-4.5 4.5m0-4.5l4.5 4.5" />
    </svg>
);


interface ProposedSlot {
    id: number;
    candidate: string;
    job: string;
    date: string;
    time: string;
}

const MOCK_PROPOSED: ProposedSlot[] = [
    { id: 1, candidate: 'Alex Johnson', job: 'Senior Frontend Engineer', date: 'Tomorrow', time: '10:00 AM' },
    { id: 2, candidate: 'Brenda Smith', job: 'Senior Frontend Engineer', date: 'Tomorrow', time: '2:30 PM' },
    { id: 3, candidate: 'Fiona Miller', job: 'Product Manager', date: 'Next Tuesday', time: '11:00 AM' },
];

const MOCK_CONFIRMED = [
    { id: 4, candidate: 'Diana Garcia', job: 'Senior Frontend Engineer', date: 'Today', time: '4:00 PM', recruiter: 'Jane Doe' },
    { id: 5, candidate: 'Hannah Rodriguez', job: 'Product Manager', date: 'Next Monday', time: '9:30 AM', recruiter: 'John Smith' },
];


const SchedulesPage: React.FC = () => {
    const [proposed, setProposed] = useState(MOCK_PROPOSED);
    const [confirmed, setConfirmed] = useState(MOCK_CONFIRMED);

    const handleAccept = (slot: ProposedSlot) => {
        setProposed(proposed.filter(p => p.id !== slot.id));
        setConfirmed([...confirmed, { ...slot, recruiter: 'Recruiter Name' }]);
    };

    const handleDecline = (slot: ProposedSlot) => {
        setProposed(proposed.filter(p => p.id !== slot.id));
    };

    return (
        <div className="p-8 bg-brand-gray-50 min-h-[calc(100vh-4rem)]">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-gray-800">Schedules</h1>
                    <p className="mt-2 text-brand-gray-600">Manage proposed and confirmed interviews.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-brand-gray-500">Integrations:</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" alt="Google Calendar" className="h-6 w-6"/>
                    <img src="https://i.ibb.co/DgbgVf4r/111.webp" alt="Outlook Calendar" className="h-6 w-6"/>
                    <img src="https://i.ibb.co/ZRvMLkRf/1213.png" alt="Zoho Calendar" className="h-6 w-6"/>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Proposed Interviews */}
                <div>
                    <h2 className="text-xl font-bold text-brand-gray-800">Proposed Interview Slots</h2>
                    <div className="mt-4 space-y-4">
                        {proposed.map(slot => (
                            <div key={slot.id} className="bg-white p-4 rounded-lg shadow-sm border border-brand-gray-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-brand-blue-700">{slot.candidate}</p>
                                        <p className="text-sm text-brand-gray-600">{slot.job}</p>
                                        <div className="mt-2 flex items-center text-sm text-brand-gray-500">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            <span>{slot.date} at {slot.time}</span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleAccept(slot)} className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200">Accept</button>
                                        <button onClick={() => handleDecline(slot)} className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200">Decline</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                         {proposed.length === 0 && <p className="text-brand-gray-500 text-center py-4">No new proposed slots.</p>}
                    </div>
                </div>

                {/* Confirmed Interviews */}
                <div>
                    <h2 className="text-xl font-bold text-brand-gray-800">Confirmed Interviews</h2>
                    <div className="mt-4 space-y-4">
                        {confirmed.map(interview => (
                            <div key={interview.id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                                 <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-brand-gray-800">{interview.candidate}</p>
                                        <p className="text-sm text-brand-gray-600">{interview.job}</p>
                                        <div className="mt-2 flex items-center text-sm text-brand-gray-500">
                                            <CalendarIcon className="h-4 w-4 mr-2" />
                                            <span>{interview.date} at {interview.time}</span>
                                        </div>
                                        <div className="mt-1 flex items-center text-sm text-brand-gray-500">
                                            <UserGroupIcon className="h-4 w-4 mr-2" />
                                            <span>With: {interview.recruiter}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-semibold text-green-700">CONFIRMED</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulesPage;
