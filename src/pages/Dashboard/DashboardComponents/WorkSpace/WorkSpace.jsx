import TaskCard from "./TaskCard/TaskCard";

const WorkSpace = () => {
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
                            <div className="flex items-center justify-center rounded-lg md:h-56 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 overflow-hidden">
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
            </div>
        </div>
    );
};

export default WorkSpace;