import React from 'react';
import CalendarScheduling from './GeneralComponents/CalendarScheduling/CalendarScheduling';
import Whiteboard from './GeneralComponents/Whiteboard/Whiteboard';
import Canvas from './GeneralComponents/Canvas/Canvas';
import FileSharing from './GeneralComponents/FileSharing/FileSharing';
import ToDoList from './GeneralComponents/ToDoList/ToDoList';

const General = () => {


    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            <CalendarScheduling />
            <Whiteboard />
            <Canvas />
            <FileSharing />
            <ToDoList />
        </div>
    );
};

export default General;
