
import { useNavigate } from 'react-router-dom';

const ToDoList = () => {
    const navigate = useNavigate(); 

    const handleCardClick = () => {
        navigate('/dashboard/ToDoApp'); 
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 text-white text-center bg-gray-900 shadow-lg rounded cursor-pointer" onClick={handleCardClick}>
            <h2 className="text-xl font-semibold mb-2">To-Do List</h2>

            <div className="h-40 bg-gray-800 shadow-lg flex items-center justify-center">

            <div className="h-40 flex items-center justify-center">

                <span>To-Do List Placeholder</span>
            </div>
        </div>
        </div>
    );
};

export default ToDoList;