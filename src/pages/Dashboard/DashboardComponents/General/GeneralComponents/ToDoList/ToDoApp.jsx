import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../../../hooks/useAuth";
import useAxiosCommon from "../../../../../../hooks/useAxiosCommon";

const ToDoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
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

  // Handle adding a new task
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

  // Handle key press event
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTask();
    }
  };

  // Handle toggling task completion
  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = { ...task, completed: !task.completed };
    await axiosCommon.patch(`/tasks/${task._id}`, updatedTask);
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const deleteTask = async (index) => {
    const task = tasks[index];
    await axiosCommon.delete(`/tasks/${task._id}`);
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  //   const completedTasks = tasks.filter((task) => task.completed).length;
  const completedTasks = tasks.filter(
    (task) => task.completed && task.email === user.email
  ).length;
  const myTasks = tasks.filter((task) => task.email === user.email);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center  relative">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-700 transition"
        onClick={() => navigate("/dashboard")}
        title="Back"
      >
        <FaArrowLeft className="text-white text-2xl" />
      </button>

      {/* Task Summary */}
      <div className="w-72 mt-14 bg-gray-800 p-4 rounded-lg mb-8 flex flex-col items-center py-10">
        <h2 className="text-xl font-semibold mb-1">Task Done</h2>
        <p className="text-gray-400 mb-4">Keep it up</p>
        <div className="w-20 h-20 bg-gradient-to-r from-[#ffbfff] to-[#a2deff] text-black rounded-full flex items-center justify-center text-3xl">
          {completedTasks}/{myTasks.length}
        </div>
      </div>

      {/* Add Task Section */}
      <div className="w-full max-w-md mb-6 flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg bg-gray-800 text-gray-300 outline-none"
          placeholder="Write your next task"
          value={newTask}
          onKeyPress={handleKeyPress}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-[#ffbfff] to-[#a2deff] text-black p-2 rounded-r-lg flex items-center justify-center"
          onClick={handleAddTask}
        >
          <span className="text-xl font-semibold">+</span>
        </button>
      </div>

      {/* Task List */}
      <div className="w-full max-w-md">
        {tasks
          .filter((task) => task.email === user.email)
          .map((task, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-800 p-4 mb-2 rounded-lg"
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskCompletion(index)}
                  className={`mr-3 ${
                    task.completed ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {task.completed ? "✓" : "✗"}
                </button>
                <span
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDoApp;
