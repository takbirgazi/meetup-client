import React from 'react';
import CalendarScheduling from './GeneralComponents/CalendarScheduling/CalendarScheduling';
import Whiteboard from './GeneralComponents/Whiteboard/Whiteboard';
import ToDoList from './GeneralComponents/ToDoList/ToDoList';

const General = () => {


    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            <div className='flex gap-4 w-full'>
                <CalendarScheduling />
                <ToDoList />
            </div>
            <Whiteboard />
        </div>
    );
};

export default General;
