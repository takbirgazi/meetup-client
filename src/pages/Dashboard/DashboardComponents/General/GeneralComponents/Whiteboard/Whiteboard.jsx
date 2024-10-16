import React, { useRef } from 'react';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { FaExpand, FaTrashAlt } from 'react-icons/fa';

const Whiteboard = () => {
    const tldrawRef = useRef(null); // Ref for Tldraw instance

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
        <div className="flex flex-col w-full p-8 shadow-xl rounded-lg bg-gradient-to-r from-slate-200 to-slate-400" id="whiteboard-container">
            <h2 className="text-2xl font-bold mb-4 text-center">Interactive Whiteboard</h2>

            <div className="flex-grow mb-6 " style={{ minHeight: '600px' }}>
                <Tldraw
                    ref={tldrawRef}
                    style={{ width: '100%', height: '100%', minHeight: '600px' }}
                />
            </div>

            {/* Toolbar with Reset and Fullscreen buttons */}
            <div className="flex justify-center gap-4 mb-6">
                <button
                    className="flex items-center px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded shadow-md"
                    onClick={toggleFullscreen}
                >
                    <FaExpand className="mr-2" /> Fullscreen
                </button>
            </div>
        </div>
    );
};

export default Whiteboard;
