import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  Check,
  Clock,
  Edit2,
  ListTodo,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import React, { useState } from "react";

import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const ToDoApp = () => {
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Query for fetching tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosSecure.get("/tasks");
      // filter tasks by user email if user is logged in. only the user who created the task can see it
      return user
        ? response.data.filter((task) => task.email === user.email)
        : response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  // Mutations
  const addTaskMutation = useMutation({
    mutationFn: async (newTaskText) => {
      const response = await axiosSecure.post("/create-task", {
        text: newTaskText,
        completed: false,
        email: user?.email,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setNewTask("");
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({ taskId, task }) => {
      const response = await axiosSecure.patch(`/tasks/${taskId}`, {
        text: task.text,
        completed: !task.completed,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      await axiosSecure.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: async ({ taskId, task, newText }) => {
      const response = await axiosSecure.patch(`/tasks/${taskId}`, {
        text: newText,
        completed: task.completed,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      setEditIndex(null);
    },
  });

  // Analytics calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const pieData = [
    { name: "Completed", value: completedTasks, color: "#8b5cf6" },
    { name: "Pending", value: pendingTasks, color: "#6366f1" },
  ];

  const dailyProgress = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayTasks = tasks.filter(
      (t) => new Date(t.createdAt).toDateString() === date.toDateString()
    );
    return {
      date: date.toLocaleDateString("en-US", { weekday: "short" }),
      total: dayTasks.length,
      completed: dayTasks.filter((t) => t.completed).length,
    };
  }).reverse();

  // Event Handlers
  const handleAddTask = () => {
    if (newTask.trim()) {
      addTaskMutation.mutate(newTask);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;
    toggleTaskMutation.mutate({ taskId, task });
  };

  const deleteTask = (taskId) => {
    deleteTaskMutation.mutate(taskId);
  };

  const handleEditTask = (index, task) => {
    setEditIndex(index);
    setEditTaskText(task.text);
  };

  const saveEditTask = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    editTaskMutation.mutate({ taskId, task, newText: editTaskText });
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.completed;
    if (activeTab === "pending") return !task.completed;
    return true;
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-white/20 rounded-lg p-2 text-white">
          <p>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white lg:-mt-6 mr-12">
      <div className="max-w-7xl mx-auto p-6 space-y-6 lg:pt-16">
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-4">
            {error.message}
          </div>
        )}

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="backdrop-blur-xl md:mt-0 mt-3 bg-white/10 rounded-xl border border-white/20 p-6 transform transition-all duration-300 hover:bg-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <ListTodo size={24} className="text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Tasks</p>
                <h3 className="text-2xl font-bold">{totalTasks}</h3>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 transform transition-all duration-300 hover:bg-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Check size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <h3 className="text-2xl font-bold">{completedTasks}</h3>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 transform transition-all duration-300 hover:bg-white/20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Clock size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <h3 className="text-2xl font-bold">{pendingTasks}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
          {/* Add Task Input */}
          <div className="mb-6">
            <div className="flex gap-3 flex-col md:flex-row ">
              <input
                type="text"
                className="flex-1 bg-black/20 text-white placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-white/10"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                onClick={handleAddTask}
                disabled={addTaskMutation.isPending}
                className="py-3 bg-gradient-to-r from-pink-500 to-blue-600 text-white px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={18} />{" "}
                {addTaskMutation.isPending ? "Adding..." : "Add"}
              </button>
            </div>
          </div>

          {/* Tasks Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-[calc(100vh-350px)]`}>
            {filteredTasks.map((task, index) => (
              <div
                key={task._id}
                className="group transform transition-all duration-300 "
              >
                <div
                  className={`backdrop-blur-xl rounded-lg border-t-4 shadow-lg 
                  ${task.completed
                      ? "bg-green-500/10 border-green-500/50"
                      : "bg-white/10 border-purple-500/50"
                    }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4 mb-3">
                      <button
                        onClick={() => toggleTaskCompletion(task._id)}
                        disabled={toggleTaskMutation.isPending}
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${task.completed
                          ? "bg-green-500/80 border-green-400"
                          : "border-white/30 hover:border-purple-400"
                          }`}
                      >
                        {task.completed && <Check size={12} />}
                      </button>

                      <div className="flex-1 min-w-0 overflow-hidden">
                        {editIndex === index ? (
                          <input
                            type="text"
                            className="w-full bg-black/20 text-white p-2 rounded-lg outline-none border border-white/20"
                            value={editTaskText}
                            onChange={(e) => setEditTaskText(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && saveEditTask(task._id)
                            }
                          />
                        ) : (
                          <div>
                            <p
                              className={`text-sm ${task.completed
                                ? "line-through text-gray-400"
                                : "text-white"
                                }`}
                            >
                              {task.text}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                              <Calendar size={12} />
                              <span>{task.createdAt}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      {editIndex === index ? (
                        <button
                          onClick={() => saveEditTask(task._id)}
                          disabled={editTaskMutation.isPending}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditTask(index, task)}
                          className="p-2 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteTask(task._id)}
                        disabled={deleteTaskMutation.isPending}
                        className="p-2 text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white">No tasks found</p>
              <p className="text-gray-400 text-sm mt-1">
                {activeTab === "all"
                  ? "Start by adding a new task above"
                  : `No ${activeTab} tasks found`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
