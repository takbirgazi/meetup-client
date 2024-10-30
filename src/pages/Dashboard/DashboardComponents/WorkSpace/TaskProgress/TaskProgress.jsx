import React, { useState } from "react";
import { Calendar, Users, ClipboardCheck } from "lucide-react";

const TaskProgress = ({ tasks }) => {
    const [activeTab, setActiveTab] = useState("ongoing");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const ongoingTasks = tasks.filter((task) => task.status === "ongoing");
    const doneTasks = tasks.filter((task) => task.status === "done");
    const archivedTasks = tasks.filter((task) => task.status === "archived");

    const renderTable = (taskList) => (
        <div className="w-full backdrop-blur-md bg-black/40 border border-white/10 shadow-xl rounded-xl overflow-hidden">
            <div className="min-w-full divide-y divide-white/10">
                <div className="bg-black/50 backdrop-blur-lg border-b border-white/10">
                    <div className="grid grid-cols-3 gap-2 px-6 py-4">
                        <div className="flex items-center gap-3 text-white/90">
                            <Calendar className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-medium uppercase tracking-wider">
                                Date
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <ClipboardCheck className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-medium uppercase tracking-wider">
                                Task
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <Users className="w-4 h-4 text-green-400" />
                            <span className="text-xs font-medium uppercase tracking-wider">
                                Link
                            </span>
                        </div>
                    </div>
                </div>
                <div className="divide-y divide-white/10 bg-transparent">
                    {taskList.length > 0 ? (
                        taskList.map((task, index) => (
                            <div
                                key={task._id}
                                className="table-row-hover grid grid-cols-3 gap-2 px-6 py-4 transition-colors hover:bg-white/5"
                                style={{
                                    animation: `rowEntrance 0.5s ease-out forwards`,
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <div className="text-sm text-white/90 truncate">
                                    {formatDate(task.createdAt)}
                                </div>
                                <div className="text-sm text-white/90 truncate">
                                    {task.taskTitle}
                                </div>
                                <div className="text-sm text-blue-400 underline truncate">
                                    <a href={task.taskLink} target="_blank" rel="noopener noreferrer">
                                        {task.taskLink ? "Join" : "No Link"}
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="px-6 py-4 text-white/60">No tasks available</div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6 lg:p-8 min-h-fit">
            <div className="w-full mb-8 backdrop-blur-md bg-black/40 border border-white/10 shadow-xl rounded-xl">
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex flex-wrap gap-2">
                            {["ongoing", "done", "archived"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2.5 rounded-lg transition-all duration-300 backdrop-blur-md ${activeTab === tab
                                            ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                                            : "bg-black/40 text-white/90 hover:bg-white/10 border border-white/10"
                                        }`}
                                >
                                    <span className="whitespace-nowrap text-sm font-medium">
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)} Tasks
                                    </span>
                                </button>
                            ))}
                        </div>
                        <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20 text-white/90 border border-white/10 backdrop-blur-md text-sm text-center font-medium">
                            {activeTab === "ongoing"
                                ? ongoingTasks.length
                                : activeTab === "done"
                                    ? doneTasks.length
                                    : archivedTasks.length}{" "}
                            Tasks
                        </span>
                    </div>
                </div>
            </div>

            <p className="text-white/90 text-sm mb-2 ml-2">
                <span className="dot dot-warning mr-2 animate-pulse"></span>
                Track the progress of your tasks.
            </p>

            {activeTab === "ongoing" && renderTable(ongoingTasks)}
            {activeTab === "done" && renderTable(doneTasks)}
            {activeTab === "archived" && renderTable(archivedTasks)}
        </div>
    );
};

export default TaskProgress;
