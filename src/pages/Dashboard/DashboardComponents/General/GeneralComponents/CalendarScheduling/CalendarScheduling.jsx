import React from 'react';
import ScheduleMeetingModal from '../ScheduleMeetingModal/ScheduleMeetingModal';

const CalendarScheduling = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gray-900 shadow-lg rounded z-[500]">
            <h2 className="text-xl font-semibold mb-2 text-white text-center">Calendar - Scheduling</h2>
            <div className="h-40 bg-gray-800 shadow-lg flex items-center justify-center">
                <label htmlFor="modal-2" className=" text-white ">Schedule a Meeting</label>
            </div>
            <ScheduleMeetingModal />
        </div>
    );
};

export default CalendarScheduling;