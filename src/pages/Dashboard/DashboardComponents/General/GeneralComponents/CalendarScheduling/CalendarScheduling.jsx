import React from 'react';
import ScheduleMeetingModal from '../ScheduleMeetingModal/ScheduleMeetingModal';

const CalendarScheduling = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gradient-to-r from-gray-500 to-gray-600 shadow rounded z-[500]">
            <h2 className="text-xl font-semibold mb-2 text-wrap">Calendar - Scheduling</h2>
            <div className={`h-40 flex items-center justify-center`}>
                <label htmlFor="modal-2" className="btn bg-slate-600 text-gray-200">Schedule a Meeting</label>
            </div>
            <ScheduleMeetingModal />
        </div>
    );
};

export default CalendarScheduling;