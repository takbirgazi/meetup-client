import { useState } from 'react';

const Meetings = () => {
    const [activeTab, setActiveTab] = useState('all');

    // Sample data for each table (you can fetch this from your backend)
    const allMeetings = [
        { id: 1, name: 'Team Sync', host: 'Alice', date: '2024-10-12', time: '10:00 AM', duration: '30 mins', participants: 5 },
        { id: 2, name: 'Project Review', host: 'Bob', date: '2024-10-13', time: '2:00 PM', duration: '1 hour', participants: 3 },
        { id: 3, name: 'Strategy Meeting', host: 'Chris', date: '2024-10-14', time: '11:00 AM', duration: '45 mins', participants: 8 },
        { id: 4, name: 'Client Call', host: 'Debbie', date: '2024-10-15', time: '9:00 AM', duration: '1 hour', participants: 2 },
        { id: 5, name: 'Monthly All Hands', host: 'Eve', date: '2024-10-16', time: '12:00 PM', duration: '2 hours', participants: 25 },
    ];

    const instantMeetings = [
        { id: 6, name: 'Quick Huddle', host: 'Charlie', date: '2024-10-14', time: '9:00 AM', duration: '15 mins', participants: 2 },
        { id: 7, name: 'Design Discussion', host: 'Frank', date: '2024-10-14', time: '3:00 PM', duration: '20 mins', participants: 4 },
        { id: 8, name: 'Technical Sync', host: 'Grace', date: '2024-10-14', time: '4:00 PM', duration: '25 mins', participants: 3 },
    ];

    const scheduledMeetings = [
        { id: 9, name: 'Budget Planning', host: 'Hannah', date: '2024-10-20', time: '11:00 AM', duration: '1 hour', participants: 5 },
        { id: 10, name: 'Marketing Kickoff', host: 'Ivy', date: '2024-10-22', time: '1:00 PM', duration: '1.5 hours', participants: 6 },
        { id: 11, name: 'Quarterly Review', host: 'Jack', date: '2024-10-25', time: '10:00 AM', duration: '2 hours', participants: 12 },
        { id: 12, name: 'Leadership Forum', host: 'Kate', date: '2024-10-27', time: '9:30 AM', duration: '3 hours', participants: 20 },
        { id: 13, name: 'Sales Forecasting', host: 'Leo', date: '2024-10-29', time: '2:00 PM', duration: '1 hour', participants: 7 },
    ];

    const renderTable = (data) => {
        return (
            <table className="w-full border-collapse border border-gray-100 mt-4 text-gray-200">
                <thead>
                    <tr className="bg-[#101827] text-white">
                        <th className="border border-gray-300 p-2 text-gray-200">Name</th>
                        <th className="border border-gray-300 p-2 text-gray-200">Host</th>
                        <th className="border border-gray-300 p-2 text-gray-200">Date</th>
                        <th className="border border-gray-300 p-2 text-gray-200">Time</th>
                        <th className="border border-gray-300 p-2 text-gray-200">Duration</th>
                        <th className="border border-gray-300 p-2 text-gray-200">Participants</th>
                        <th className="border border-gray-300 p-2 text-gray-200">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((meeting) => (
                        <tr key={meeting.id}>
                            <td className="border border-gray-300 p-2 text-gray-200">{meeting.name}</td>
                            <td className="border border-gray-300 p-2 text-gray-200">{meeting.host}</td>
                            <td className="border border-gray-300 p-2 text-gray-200">{meeting.date}</td>
                            <td className="border border-gray-300 p-2 text-gray-200">{meeting.time}</td>
                            <td className="border border-gray-300 p-2 text-gray-200">{meeting.duration}</td>
                            <td className="border border-gray-300 p-2 text-gray-200">{meeting.participants}</td>
                            <td className="border border-gray-300 p-2 text-gray-200">
                                <button className="text-blue-500 hover:underline">Join</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <div className="tabs">
                <input
                    type="radio"
                    id="tab-4"
                    name="tab-2"
                    className="tab-toggle"
                    onClick={() => setActiveTab('all')}
                    defaultChecked
                />
                <label htmlFor="tab-4" className="tab tab-bordered px-6 text-gray-200">All Meetings</label>

                <input
                    type="radio"
                    id="tab-5"
                    name="tab-2"
                    className="tab-toggle"
                    onClick={() => setActiveTab('instant')}
                />
                <label htmlFor="tab-5" className="tab tab-bordered px-6 text-gray-200">Instant Meetings</label>

                <input
                    type="radio"
                    id="tab-6"
                    name="tab-2"
                    className="tab-toggle"
                    onClick={() => setActiveTab('scheduled')}
                />
                <label htmlFor="tab-6" className="tab tab-bordered px-6 text-gray-200 hover:text-gray-100">Scheduled Meetings</label>
            </div>

            <div className="tab-content mt-4">
                {activeTab === 'all' && renderTable(allMeetings)}
                {activeTab === 'instant' && renderTable(instantMeetings)}
                {activeTab === 'scheduled' && renderTable(scheduledMeetings)}
            </div>
        </div>
    );
};

export default Meetings;