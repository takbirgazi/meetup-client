import React, { useLayoutEffect, useRef } from 'react';
import {  Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { FaExpand, FaTrashAlt } from 'react-icons/fa';

const Whiteboard = () => {

    // Function to toggle fullscreen
    const toggleFullscreen = () => {
        const whiteboardElement = document.getElementById('whiteboard-container');
        if (!document.fullscreenElement) {
            whiteboardElement.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="flex flex-col w-full p-8 shadow-xl rounded-lg bg-gradient-to-r from-gray-700 to-slate-700 text-white" id="whiteboard-container">
            <h2 className="text-2xl font-bold mb-4 text-center">Interactive Whiteboard</h2>

            <div className="flex-grow mb-6" style={{ minHeight: '600px' }}>
                <Tldraw
                    persistenceKey='example'
                    className='w-full h-full min-h-[600px]'
                    forceMobile
                />
            </div>

            {/* Toolbar with Reset and Fullscreen buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className="flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded shadow-md"
                    onClick={toggleFullscreen}
                >
                    <FaExpand className="mr-2" /> Fullscreen
                </button>
            </div>
        </div>
    );
};

export default Whiteboard;
