import React from 'react';

const ToDoList = () => {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
            <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span>To-Do List Placeholder</span>
            </div>
        </div>
    );
};

export default ToDoList;