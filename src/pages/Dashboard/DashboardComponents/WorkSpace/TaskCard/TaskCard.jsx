import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

const TaskCard = ({ tasksData }) => {
    const { taskTitle, taskDate, invited, taskDescription, taskLink } = tasksData;
    const [hoverEffect, setHoverEffect] = useState(false)
    return (
        <>
            <div onMouseEnter={() => setHoverEffect(true)} onMouseLeave={() => setHoverEffect(false)} className="md:h-56 w-full flex items-center justify-start flex-col rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 transition duration-500 ease-in-out overflow-hidden">
                <div className={`w-full h-full p-3 transition duration-500 ease-in-out hover:bg-black/75`}>
                    <div className={`${hoverEffect ? "hidden" : ""} flex flex-col justify-around gap-3 px-3  w-full h-full`}>
                        <div className="flex flex-col gap-5">
                            <h2 className="text-xl font-bold text-gray-100">{(taskTitle?.length > 50 ? taskTitle?.slice(0, 50) + "..." : taskTitle)} <br /><span className="text-sm">with : {invited} Person at {taskDate}</span></h2>
                            <p>{(taskDescription?.length > 100 ? taskDescription?.slice(0, 100) + "..." : taskDescription)}</p>
                        </div>
                    </div>
                    <div className={`${hoverEffect ? "" : "hidden"} flex flex-col items-center justify-center gap-5 w-full h-full`}>
                        <div className="flex items-center justify-center gap-3 ">
                            <NavLink title="View task" className="text-3xl text-green-500" > <FaEye /> </NavLink>
                            <NavLink title="Edit task" className="text-3xl text-blue-500" > <FaRegEdit /> </NavLink>
                            <NavLink title="Delete task" className="text-3xl text-red-500" > <MdDelete /> </NavLink>
                            <NavLink title="Complete task" className="text-3xl text-yellow-500" > <FaCircleCheck /> </NavLink>
                        </div>
                        <NavLink className="bg-green-500 text-white rounded-lg px-5 py-2">Join Meeting</NavLink>
                    </div>
                </div>

            </div>
        </>
    );
};

export default TaskCard;