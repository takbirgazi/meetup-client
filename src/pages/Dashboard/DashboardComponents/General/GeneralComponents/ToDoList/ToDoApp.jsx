import { useEffect, useState } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../../hooks/useAuth";
import useAxiosCommon from "../../../../../../hooks/useAxiosCommon";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");
  const navigate = useNavigate();
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();

  const fetchTasks = async () => {
    const response = await axiosCommon.get("/tasks");
    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const response = await axiosCommon.post("/create-task", {
        text: newTask,
        completed: false,
        email: user.email,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };
    await axiosCommon.patch(`/tasks/${task._id}`, updatedTask);
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const deleteTask = async (index) => {
    const task = tasks[index];
    await axiosCommon.delete(`/tasks/${task._id}`);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTaskText(tasks[index].text);
  };

  const saveEditTask = async (index) => {
    const updatedTask = { ...tasks[index], text: editTaskText };
    await axiosCommon.patch(`/tasks/${tasks[index]._id}`, updatedTask);
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const completedTasks = tasks.filter(
    (task) => task.completed && task.email === user.email
  ).length;
  const myTasks = tasks.filter((task) => task.email === user.email);

  return (
    <div className="text-white flex flex-col items-center relative min-h-screen p-6">
      {/* Task Summary Card */}
      <div className="w-72 lg:w-[700px] mt-8 p-6 rounded-2xl mb-8 flex flex-col items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-semibold mb-1">Task Progress</h2>
        <p className="text-gray-300 mb-6">Keep it up!</p>
        <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full flex items-center justify-center text-3xl font-bold backdrop-blur-sm border border-white/30 shadow-lg">
          {completedTasks}/{myTasks.length}
        </div>
      </div>

      {/* Add Task Section */}
      <div className="w-[90%] lg:w-[60%] mb-8">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-2 border border-white/20 shadow-lg">
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-3 rounded-l-xl bg-black/20 text-white placeholder-gray-400 outline-none transition-all duration-300 focus:bg-black/30"
              placeholder="Write your next task"
              value={newTask}
              onKeyPress={handleKeyPress}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 rounded-r-xl flex items-center justify-center font-semibold text-xl hover:from-pink-500/80 hover:to-blue-500/80 transition-all duration-300"
              onClick={handleAddTask}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="w-[90%] lg:w-[60%] space-y-4">
        {myTasks.map((task, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg transition-all duration-300 hover:bg-white/15"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    task.completed
                      ? "bg-green-400/50 border-green-400"
                      : "border-gray-400 hover:border-white"
                  }`}
                >
                  {task.completed && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </button>

                {editIndex === index ? (
                  <input
                    type="text"
                    className="bg-black/20 text-white p-2 rounded-lg outline-none border border-white/20"
                    value={editTaskText}
                    onChange={(e) => setEditTaskText(e.target.value)}
                  />
                ) : (
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {editIndex === index ? (
                  <button
                    onClick={() => saveEditTask(index)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    <FaSave className="text-lg" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(index)}
                    className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300"
                  >
                    <FaEdit className="text-lg" />
                  </button>
                )}

                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDoApp;