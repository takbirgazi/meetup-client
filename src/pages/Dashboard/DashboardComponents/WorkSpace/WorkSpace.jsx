import { useState } from "react";
import TaskCard from "./TaskCard/TaskCard";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
Modal.setAppElement("#root");

const WorkSpace = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const createSpaceHandler = (event) => {
        event.preventDefault();
        const uuid = uuidv4();
        const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
        const taskLink = `${window.location.origin}/room/${meetingId}`;
        const form = event.target;
        const taskTitle = form.title.value;
        const inviteEmail = form.inviteEmail.value;
        const taskDate = form.meeting.value
        const taskDescription = form.description.value
        const taskData = { taskTitle, inviteEmail, taskLink, taskDate, taskDescription }
        console.log(taskData)
    }

    const workSpaceList = [
        {
            _id: 1,
            taskTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam vitae iste quam, accusantium dolores nam quod facere quis explicabo!`,
            taskLink: "tasklink",
            taskDate: "04/02/2024",
            invited: 20,
            taskDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore consectetur aut earum, fuga laborum maxime dicta aspernatur, quo blanditiis aliquid, sed adipisci totam nihil alias porro vel soluta fugit.`
        },
        {
            _id: 2,
            taskTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam vitae iste quam, accusantium dolores nam quod facere quis explicabo!`,
            taskLink: "tasklink",
            taskDate: "04/02/2024",
            invited: 20,
            taskDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore consectetur aut earum, fuga laborum maxime dicta aspernatur, quo blanditiis aliquid, sed adipisci totam nihil alias porro vel soluta fugit.`
        },
        {
            _id: 3,
            taskTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam vitae iste quam, accusantium dolores nam quod facere quis explicabo!`,
            taskLink: "tasklink",
            taskDate: "04/02/2024",
            invited: 20,
            taskDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore consectetur aut earum, fuga laborum maxime dicta aspernatur, quo blanditiis aliquid, sed adipisci totam nihil alias porro vel soluta fugit.`
        },
        {
            _id: 4,
            taskTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam vitae iste quam, accusantium dolores nam quod facere quis explicabo!`,
            taskLink: "tasklink",
            taskDate: "04/02/2024",
            invited: 20,
            taskDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore consectetur aut earum, fuga laborum maxime dicta aspernatur, quo blanditiis aliquid, sed adipisci totam nihil alias porro vel soluta fugit.`
        },
        {
            _id: 5,
            taskTitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate aperiam vitae iste quam, accusantium dolores nam quod facere quis explicabo!`,
            taskLink: "tasklink",
            taskDate: "04/02/2024",
            invited: 20,
            taskDescription: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat dolore consectetur aut earum, fuga laborum maxime dicta aspernatur, quo blanditiis aliquid, sed adipisci totam nihil alias porro vel soluta fugit.`
        }
    ];
    return (
        <div className="text-white flex flex-col items-center relative min-h-screen w-full p-6">
            <div className="w-full flex gap-5 flex-col py-5">
                {/* Heading  */}
                <div className=" lg:w-[700px] mx-auto my-8 p-5 rounded-2xl flex items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h2 className="text-2xl font-semibold text-center w-full">Work Space</h2>
                </div>
                {/* Task List and Creation Button  */}
                <div className="w-11/12 my-8 p-5 rounded-2xl flex flex-col gap-5 items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h3 className="text-xl font-semibold text-center w-full">Tasks</h3>
                    {/* Task Card Start*/}
                    <div className="border rounded-2xl p-3 w-full overflow-auto">
                        <div className="grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-1">
                            <div onClick={openModal} className="flex items-center justify-center rounded-lg md:h-56 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 overflow-hidden">
                                <div className="w-full h-full transition duration-500 ease-in-out flex items-center justify-center p-3 hover:bg-black/75">
                                    <button className="text-xl md:text-2xl lg:text-3xl text-center font-bold">+ Create <br /> a space</button>
                                </div>
                            </div>

                            {
                                workSpaceList.map(tasks => <TaskCard key={tasks._id} tasksData={tasks} />)
                            }

                        </div>
                    </div>
                    {/* Task Card End*/}
                </div>
                {/* Task Progress Section  */}
                <div className="w-11/12 my-8 p-5 rounded-2xl flex flex-col gap-5 items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h3 className="text-xl font-semibold text-center w-full">Task Progress</h3>
                    {/* Task Card Start*/}
                    <div className="border rounded-2xl p-3 w-full min-h-56">
                        Card
                    </div>
                    {/* Task Card End*/}
                </div>

                {/* Modal  */}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Send Email Modal"
                    className="fixed inset-0 flex items-center justify-center"
                    overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
                >
                    <div className="relative glass-effect modal-content p-8 rounded-lg shadow-lg max-w-screen-xl w-full mx-4 sm:mx-auto">
                        <AiOutlineClose
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900"
                            size={24}
                        />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create a Space</h2>
                        <form onSubmit={createSpaceHandler} >
                            <div className="mb-4">
                                <label htmlFor="title" className="block font-medium text-gray-700"> Tittle </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    placeholder="Write Your Tittle"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="inviteEmail" className="block font-medium text-gray-700"> Invite Email </label>
                                <input
                                    type="email"
                                    multiple
                                    id="inviteEmail"
                                    name="inviteEmail"
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    placeholder="Write Invite Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-medium text-gray-700"> Description </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    rows="4"
                                    placeholder="Write Here..."
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="meeting" className="block font-medium text-gray-700"> Shedule a meeting </label>
                                <input
                                    id="meeting"
                                    type="datetime-local"
                                    name="meeting"
                                    required
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                />

                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 py-2 rounded font-medium text-white"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </Modal>
                {/* Modal  */}

            </div>
        </div>
    );
};

export default WorkSpace;