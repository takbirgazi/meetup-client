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

Modal.setAppElement("#root");

const WorkSpace = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [meetingLinkOption, setMeetingLinkOption] = useState("addMeetingLinkLater");
    const [generatedLink, setGeneratedLink] = useState("");
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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
        };

        try {
            const response = await axiosSecure.post('/workspaces', taskData);
            if (response.status !== 201) {
                console.error("Failed to create workspace:", response.data);
                // Handle error (e.g., show an error message)
                return;
            }
            closeModal();
            toast.success("Workspace created successfully");
            refetch();
        } catch (error) {
            console.error("Error creating workspace:", error);
            // Handle error (e.g., show an error message)
        }
    };

    const { data: workSpaceList = [], refetch, isLoading } = useQuery({
        queryKey: ['workspaces', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/workspaces/${user?.email}`);
            return res.data;
        }
    });


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
                                <TaskCard tasksData={task} />
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
                                        className={`flex-grow md:w-[25%] w-full flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-6 transition-all duration-300`}
                                    >
                                        <button className="text-xl md:text-2xl lg:text-3xl text-center font-bold">
                                            + Create <br /> a space
                                        </button>
                                    </div>
                                )
                        }
                    </div>
                </div>
                <div className="w-11/12 my-8 p-5 rounded-2xl flex flex-col gap-5 items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h3 className="text-xl font-semibold text-center w-full">Task Progress</h3>
                    <div className="border rounded-2xl p-3 w-full min-h-56">
                        Card
                    </div>
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
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create a Space</h2>
                        <form onSubmit={createSpaceHandler}>
                            <div className="mb-4">
                                <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    placeholder="Write Your Title"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="inviteEmail" className="block font-medium text-gray-700">Invite Email</label>
                                <input
                                    type="text"
                                    id="inviteEmail"
                                    name="inviteEmail"
                                    className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                    placeholder="Write Invite Email... (Separate with comma)"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
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
                                <label className="block font-medium text-gray-700">Choose Meeting Option:</label>
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
                                    <label htmlFor="createWithLink" className="mr-4">Create space with meeting link</label>

                                    <input
                                        type="radio"
                                        id="addMeetingLinkLater"
                                        name="meetingOption"
                                        value="addMeetingLinkLater"
                                        checked={meetingLinkOption === "addMeetingLinkLater"}
                                        onChange={handleMeetingLinkOptionChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor="addMeetingLinkLater">Add meeting link later</label>
                                </div>
                            </div>

                            {/* Display the generated link if the user chooses to create with a link */}
                            {meetingLinkOption === "createWithLink" && (
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
                                                navigator.clipboard.writeText(generatedLink)
                                                toast.success("Link copied to clipboard");
                                            }}
                                            className=" absolute right-2 ml-2 py-2 px-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                                        >
                                            <IoCopy></IoCopy>
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="meeting" className="block font-medium text-gray-700">Schedule a meeting</label>
                                        <input
                                            id="meeting"
                                            type="datetime-local"
                                            name="meeting"
                                            className="input-field mt-1 block w-full border outline-none border-gray-700 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            >
                                Create Space
                            </button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div >
    );
};

export default WorkSpace;
