import React from 'react';

const ToDoList = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-gradient-to-r from-gray-500 to-gray-600 shadow rounded">
            <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
            <div className="h-40 flex items-center justify-center">
                <span>To-Do List Placeholder</span>
            </div>
        </div>
    );
};

export default ToDoList;