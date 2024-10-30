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
import React, { useEffect, useState } from "react";
import {
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useAuth from "../../../../../../hooks/useAuth";
import useAxiosCommon from "../../../../../../hooks/useAxiosCommon";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [animate, setAnimate] = useState(false);
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
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

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axiosCommon.get("/tasks");
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      setAnimate(true);
      try {
        const response = await axiosCommon.post("/create-task", {
          text: newTask,
          completed: false,
          email: user.email,
          createdAt: new Date().toISOString(),
        });
        setTasks([...tasks, response.data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
      setTimeout(() => setAnimate(false), 500);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    try {
      await axiosCommon.patch(`/tasks/${task.id}`, {
        ...task,
        completed: !task.completed,
      });
      setTasks(
        tasks.map((t) =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axiosCommon.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (index, task) => {
    setEditIndex(index);
    setEditTaskText(task.text);
  };

  const saveEditTask = async (taskId) => {
    try {
      await axiosCommon.patch(`/tasks/${taskId}`, {
        text: editTaskText,
      });
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: editTaskText } : task
        )
      );
      setEditIndex(null);
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.completed;
    if (activeTab === "pending") return !task.completed;
    return true;
  });
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
            padding: "8px",
            color: "white", // Set text color to white
          }}
        >
          <p>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
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

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-4">
            <h3 className="text-lg font-semibold mb-4">Weekly Progress</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyProgress}>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0, 0, 0, 0.8)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-4">
            <h3 className="text-lg font-semibold mb-4">Task Distribution</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={pieData}
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />{" "}
                  {/* Use custom tooltip */}
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6">
          {/* Add Task Input */}
          <div className="mb-6">
            <div className="flex gap-3">
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
                className="bg-purple-600/80 hover:bg-purple-700/80 text-white px-6 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {["all", "pending", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-purple-600/80 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`group transform transition-all duration-300 hover:scale-102 ${
                  animate ? "animate-slide-in" : ""
                }`}
              >
                <div
                  className={`backdrop-blur-xl rounded-lg border-t-4 shadow-lg 
                  ${
                    task.completed
                      ? "bg-green-500/10 border-green-500/50"
                      : "bg-white/10 border-purple-500/50"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start gap-4 mb-3">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          task.completed
                            ? "bg-green-500/80 border-green-400"
                            : "border-white/30 hover:border-purple-400"
                        }`}
                      >
                        {task.completed && <Check size={12} />}
                      </button>

                      <div className="flex-1 min-w-0">
                        {editIndex === index ? (
                          <input
                            type="text"
                            className="w-full bg-black/20 text-white p-2 rounded-lg outline-none border border-white/20"
                            value={editTaskText}
                            onChange={(e) => setEditTaskText(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" && saveEditTask(task.id)
                            }
                          />
                        ) : (
                          <div>
                            <p
                              className={`text-sm ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : "text-white"
                              }`}
                            >
                              {task.text}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                              <Calendar size={12} />
                              <span>
                                {new Date(task.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      {editIndex === index ? (
                        <button
                          onClick={() => saveEditTask(task.id)}
                          className="p-2 text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
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
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
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
                Start by adding a new task above
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TodoApp;
