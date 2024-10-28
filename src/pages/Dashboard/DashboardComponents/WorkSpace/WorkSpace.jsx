

const WorkSpace = () => {
    return (
        <div className="text-white flex flex-col items-center relative min-h-screen w-full p-6">
            <div className="w-full flex gap-5 flex-col py-5">
                {/* Heading  */}
                <div className="w-72 lg:w-[700px] mx-auto my-8 p-5 rounded-2xl flex items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h2 className="text-2xl font-semibold text-center w-full">Work Space</h2>
                </div>
                {/* Task List and Creation Button  */}
                <div className="w-11/12 my-8 p-5 rounded-2xl flex flex-col gap-5 items-center backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
                    <h3 className="text-xl font-semibold text-center w-full">Tasks</h3>
                    {/* Task Card Start*/}
                    <div className="border rounded-2xl p-3 w-full min-h-56">
                        Card
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