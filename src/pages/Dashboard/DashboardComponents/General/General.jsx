import React, { useState } from 'react';
import ScheduleMeetingModal from './GeneralComponents/ScheduleMeetingModal/ScheduleMeetingModal';
import ChatBot from './GeneralComponents/ChatBot/ChatBot';

const General = () => {

    
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {/* Calendar - Scheduling */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">Calendar - Scheduling</h2>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <label htmlFor="modal-2" className="btn">Schedule a Meeting</label>
                </div>
                <ScheduleMeetingModal />
            </div>

            {/* Whiteboard */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">Whiteboard</h2>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span>Whiteboard Placeholder</span>
                </div>
            </div>

            {/* Canvas */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">Canvas</h2>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span>Canvas Placeholder</span>
                </div>
            </div>

            {/* File Sharing */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">File Sharing</h2>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span>File Sharing Placeholder</span>
                </div>
            </div>

            {/* To-Do List */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span>To-Do List Placeholder</span>
                </div>
            </div>

            {/* AI Chat Integration Button */}


        </div>
    );
};

export default General;
