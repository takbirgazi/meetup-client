import { RiVideoAddLine } from "react-icons/ri";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div className="relative h-full w-full">
            <Helmet>
                <title>Home - Tech Thunders</title>
            </Helmet>
            {/* Radial Gradient Background */}
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className="flex gap-10 py-2 mx-6 text-white">
                <div className="w-[50%] mx-6">
                    <div className="h-[180px] w-full bg-[#000435] border mb-6 rounded-lg relative flex flex-col items-center justify-center">
                        <RiVideoAddLine className="text-4xl" />
                        <h1 className="text-2xl font-bold">New Meeting</h1>
                        <p>Create a New Meeting</p>
                    </div>
                    <div className="h-[180px] w-full bg-[#000435] border mb-6 rounded-lg relative flex flex-col items-center justify-center">
                        <FaRegPlusSquare className="text-4xl" />
                        <h1 className="text-2xl font-bold">Join Meeting</h1>
                        <p>Via Invitation Link</p>
                    </div>
                    <div className="h-[180px] w-full bg-[#000435] border mb-2 rounded-lg relative flex flex-col items-center justify-center">
                        <FaRegCalendarAlt className="text-4xl" />
                        <h1 className="text-2xl font-bold">Schedule</h1>
                        <p>Schedule your meeting</p>
                    </div>
                </div>

                <div className="h-[588px] w-[1px] bg-[#586C6F]"></div>

                <div className="bg-[#000435] border w-full h-[588px] mx-2 rounded-lg">
                    <p className="text-center">Time</p>
                </div>
            </div>
        </div>
    );
};

export default Home;