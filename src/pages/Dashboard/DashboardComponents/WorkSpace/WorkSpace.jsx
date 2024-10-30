import { useEffect, useState } from "react";
import TaskCard from "./TaskCard/TaskCard";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid";
import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import TaskProgress from "./TaskProgress/TaskProgress";

Modal.setAppElement("#root");

const WorkSpace = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // State for tracking edit mode
    const [editingTask, setEditingTask] = useState(null); // State for holding the task being edited
    const [meetingLinkOption, setMeetingLinkOption] = useState("addMeetingLinkLater");
    const [generatedLink, setGeneratedLink] = useState("");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingTask(null);
    };

    const createSpaceHandler = async (event) => {
        event.preventDefault();
        const uuid = uuidv4();
        const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
        const taskLink = `${window.location.origin}/room/${meetingId}`;
        const form = event.target;
        const taskTitle = form.title.value;
        const inviteEmail = form.inviteEmail.value.split(/[\s,]+/).map(email => email.trim()).filter(email => email);
        const taskDate = form.meeting?.value || "";
        const taskDescription = form.description.value;


        const taskData = {
            taskTitle,
            inviteEmail,
            taskLink: meetingLinkOption === "createWithLink" ? taskLink : "",
            taskDate,
            taskDescription,
            taskHost: user?.email,
            status: "ongoing"
        };

        try {
            if (isEditMode && editingTask) {
                // Updating an existing task
                await axiosSecure.put(`/workspaces/${editingTask._id}`, taskData);
                toast.success("Workspace updated successfully");
            } else {
                // Creating a new task
                await axiosSecure.post('/workspaces', taskData);
                toast.success("Workspace created successfully");
            }
            closeModal();
            refetch();
            setGeneratedLink(""); // Clear the generated link
        } catch (error) {
            console.error("Error creating or updating workspace:", error);
        }
    };

    const { data: workSpaceList = [], refetch, isLoading } = useQuery({
        queryKey: ['workspaces', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/workspaces/${user?.email}`);
            return res.data;
        }
    });


    // Delete a workspace
    const deleteTask = async (taskId) => {
        try {
            await axiosSecure.delete(`/workspaces/${taskId}`);
            toast.success("Task deleted successfully");
            refetch(); // Refresh the workspace list
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Function to enter edit mode
    const editTask = (task) => {
        setIsEditMode(true);
        setEditingTask(task);
        setIsModalOpen(true);
    };

    // Mark task as complete (add additional logic if needed)
    const completeTask = async (taskId) => {
        try {
            await axiosSecure.put(`/workspaces/${taskId}`, { status: "done" });
            toast.success("Task marked as completed");
            refetch();
        } catch (error) {
            console.error("Error completing task:", error);
        }
    };


    const handleMeetingLinkOptionChange = (e) => {
        setMeetingLinkOption(e.target.value);
        if (e.target.value === "createWithLink") {
            const uuid = uuidv4();
            const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
            setGeneratedLink(`${window.location.origin}/room/${meetingId}`);
        } else {
            setGeneratedLink(""); // Clear the link if "Add meeting link later" is selected
        }
    };

    // Hiding the button during loading
    useEffect(() => {
        const chatButton = document.getElementById("tidio-chat");
        if (chatButton) {
            chatButton.style.display = "none";
        }
    }, [isLoading]);

    return (
        <div className="text-white flex flex-col items-center relative min-h-screen w-full p-6">
            <div className="w-full flex gap-5 flex-col py-5">
                <div className="lg:w-[700px] mx-auto my-8 p-5 rounded-2xl flex items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h2 className="text-2xl font-semibold text-center w-full">Work Space</h2>
                </div>
                <div className="w-11/12 sm:w-full my-8 p-4 rounded-2xl flex flex-col gap-5 items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h3 className="text-xl font-semibold text-center w-full">Tasks</h3>
                    <div className="flex flex-wrap gap-4 w-full">
                        {workSpaceList.map((task) => (
                            <div className="flex-grow md:w-[23%] w-full" key={task._id}>
                                <TaskCard
                                    tasksData={task}
                                    onDelete={() => deleteTask(task._id)}
                                    onEdit={() => editTask(task)}
                                    onComplete={() => completeTask(task._id)}
                                />
                            </div>
                        ))}
                        {
                            isLoading ?
                                (
                                    <div className="flex-grow md:w-[23%] w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 transition-all duration-300">
                                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                                    </div>
                                )
                                :
                                (
                                    <div
                                        onClick={openModal}
                                        className={`flex-grow md:w-[25%] min-h-64 w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 transition-all duration-300`}
                                    >
                                        <button className="text-xl md:text-2xl lg:text-3xl text-center font-bold">
                                            + Create <br /> a space
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="w-full my-8 p-5 rounded-2xl flex flex-col gap-5 items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <TaskProgress tasks={workSpaceList} />
                </div>

                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Create Space Modal"
                    className="fixed inset-0 flex items-center justify-center min-h-fit"
                    overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
                >
                    <div className="relative glass-effect modal-content p-8 rounded-lg shadow-lg max-w-screen-md w-full mx-4 sm:mx-auto">
                        <AiOutlineClose
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900"
                            size={24}
                        />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{isEditMode ? "Edit" : "Create"} a Space</h2>
                        <form onSubmit={createSpaceHandler}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={editingTask?.taskTitle || ""}
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    placeholder="Write Your Title"
                                    required
                                    readOnly={isEditMode && !editingTask?.joinLink} // Make input read-only if no join link
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="inviteEmail" className="block font-medium text-gray-700">Invite Email</label>
                                <input
                                    type="text"
                                    id="inviteEmail"
                                    name="inviteEmail"
                                    defaultValue={editingTask?.inviteEmail?.join(", ") || ""}
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    placeholder="Invite Email(s), comma-separated"
                                    required
                                    readOnly={isEditMode && !editingTask?.joinLink} // Make input read-only if no join link
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    defaultValue={editingTask?.taskDescription || ""}
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    rows="4"
                                    placeholder="Write Description..."
                                    required
                                    readOnly={isEditMode && !editingTask?.joinLink} // Make input read-only if no join link
                                />
                            </div>

                            {!isEditMode && ( // Show radio buttons only when not in edit mode
                                <div className="mb-4">
                                    <label className="block font-medium text-gray-700">Meeting Link Option:</label>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="createWithLink"
                                            name="meetingOption"
                                            value="createWithLink"
                                            checked={meetingLinkOption === "createWithLink"}
                                            onChange={handleMeetingLinkOptionChange}
                                            className="mr-2"
                                            required
                                        />
                                        <label htmlFor="createWithLink" className="mr-4">Create with Meeting Link</label>

                                        <input
                                            type="radio"
                                            id="addMeetingLinkLater"
                                            name="meetingOption"
                                            value="addMeetingLinkLater"
                                            checked={meetingLinkOption === "addMeetingLinkLater"}
                                            onChange={handleMeetingLinkOptionChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="addMeetingLinkLater">Add Link Later</label>
                                    </div>
                                </div>
                            )}

                            {isEditMode && !editingTask?.taskLink && ( // In edit mode, if there's no join link, show the same as create space
                                <div className="mb-4">
                                    <label className="block font-medium text-gray-700">Meeting Link Option:</label>
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            id="createWithLink"
                                            name="meetingOption"
                                            value="createWithLink"
                                            checked={meetingLinkOption === "createWithLink"}
                                            onChange={handleMeetingLinkOptionChange}
                                            className="mr-2"
                                            required
                                        />
                                        <label htmlFor="createWithLink" className="mr-4">Create with Meeting Link</label>

                                        <input
                                            type="radio"
                                            id="addMeetingLinkLater"
                                            name="meetingOption"
                                            value="addMeetingLinkLater"
                                            checked={meetingLinkOption === "addMeetingLinkLater"}
                                            onChange={handleMeetingLinkOptionChange}
                                            className="mr-2"
                                        />
                                        <label htmlFor="addMeetingLinkLater">Add Link Later</label>
                                    </div>
                                </div>
                            )}

                            {meetingLinkOption === "createWithLink" && ( // Show this section only in create mode
                                <div className="mb-4">
                                    <label htmlFor="generatedLink" className="block font-medium text-gray-700">Generated Meeting Link:</label>
                                    <div className="flex items-center relative">
                                        <input
                                            type="text"
                                            id="generatedLink"
                                            value={generatedLink}
                                            readOnly
                                            className="input-solid-primary mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                navigator.clipboard.writeText(generatedLink);
                                                toast.success("Link copied to clipboard");
                                            }}
                                            className="absolute right-2 ml-2 py-2 px-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                                        >
                                            <IoCopy />
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="meeting" className="block font-medium text-gray-700">Schedule Meeting</label>
                                        <input
                                            id="meeting"
                                            type="datetime-local"
                                            name="meeting"
                                            defaultValue={editingTask?.taskDate || ""}
                                            className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            )}


                            {isEditMode && editingTask?.taskLink && ( // Show join link field in edit mode
                                <div className="mb-4">
                                    <label htmlFor="joinLink" className="block font-medium text-gray-700">Join Link:</label>
                                    <input
                                        type="text"
                                        id="joinLink"
                                        value={editingTask.taskLink}
                                        onChange={(e) => setEditingTask({ ...editingTask, taskLink: e.target.value })}
                                        className="input-solid-primary mt-1 block w-full outline-none rounded-md p-2"
                                        readOnly
                                    />
                                </div>
                            )}

                            <button
                                type="submit"
                                className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                                {isEditMode ? "Save Changes" : "Create Space"}
                            </button>
                        </form>


                    </div>
                </Modal>
            </div>
        </div >
    );
};

export default WorkSpace;
