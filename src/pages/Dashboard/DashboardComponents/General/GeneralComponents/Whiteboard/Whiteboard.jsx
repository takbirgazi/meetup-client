import React, { useState, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { FaUndoAlt, FaRedoAlt, FaEraser, FaTrashAlt } from 'react-icons/fa'; // Importing relevant icons

const Whiteboard = () => {
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const canvasRef = useRef(null);

    const handleUndo = () => {
        canvasRef.current.undo();
    };

    const handleRedo = () => {
        canvasRef.current.redo();
    };

    const handleClear = () => {
        canvasRef.current.clearCanvas();
    };

    const handleReset = () => {
        canvasRef.current.resetCanvas();
    };

    const handleBackgroundChange = (e) => {
        setBackgroundColor(e.target.value);
    };

    return (
        <div className="w-full p-8 bg-white shadow-xl rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Whiteboard</h2>

            <div className="w-full flex items-center justify-center mb-6">
                <div className="w-full h-[70vh] sm:w-4/5 md:w-3/4 lg:w-3/4 xl:w-2/3">
                    <ReactSketchCanvas
                        ref={canvasRef}
                        strokeWidth={4}
                        strokeColor="black"
                        width="100%"
                        height="100%"
                        canvasColor={backgroundColor}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {/* Control buttons with icons */}
                <button className="btn btn-outline-primary flex items-center gap-2" onClick={handleUndo}>
                    <FaUndoAlt /> Undo
                </button>
                <button className="btn btn-outline-secondary flex items-center gap-2" onClick={handleRedo}>
                    <FaRedoAlt /> Redo
                </button>
                <button className="btn btn-outline flex items-center gap-2" onClick={handleClear}>
                    <FaEraser /> Clear
                </button>
                <button className="btn btn-outline-error flex items-center gap-2" onClick={handleReset}>
                    <FaTrashAlt /> Reset
                </button>
            </div>

            <div className="flex justify-center">
                <label htmlFor="bgColorPicker" className="mr-4">Background Color:</label>
                <input
                    type="color"
                    id="bgColorPicker"
                    value={backgroundColor}
                    onChange={handleBackgroundChange}
                    className="w-12 h-12 border-0 p-0"
                />
            </div>
        </div>
    );
};

export default Whiteboard;