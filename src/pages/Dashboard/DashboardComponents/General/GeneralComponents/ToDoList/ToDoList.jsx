
import { useNavigate } from 'react-router-dom';

const ToDoList = () => {
    const navigate = useNavigate(); 

    const handleCardClick = () => {
        navigate('/dashboard/ToDoApp'); 
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 bg-white shadow rounded cursor-pointer" onClick={handleCardClick}>
            <h2 className="text-xl font-semibold mb-2">To-Do List</h2>
            <div className="h-40 flex items-center justify-center">
                <span>To-Do List Placeholder</span>
            </div>
        </div>
    );
};

export default ToDoList;
