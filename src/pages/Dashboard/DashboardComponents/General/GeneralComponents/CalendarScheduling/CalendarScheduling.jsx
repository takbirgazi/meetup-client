import React from 'react';
import ScheduleMeetingModal from '../ScheduleMeetingModal/ScheduleMeetingModal';

const CalendarScheduling = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 text-white text-center bg-gray-900 shadow-lg rounded">
            <h2 className="text-xl font-semibold mb-2 text-wrap">Calendar - Scheduling</h2>
            <div className="h-40 bg-gray-800 flex items-center justify-center">
                <label htmlFor="modal-2" className=" text-white text-lg">Schedule a Meeting</label>
            </div>
            <ScheduleMeetingModal />
        </div>
    );
};

export default CalendarScheduling;