import { Helmet } from "react-helmet-async";
import image from "../../assets/logo.png";
import "./Room.css";
import UserCard from "./UserCard";

const Room = () => {
    const joinUser = [
        { name: "Item 1", imageUrl: image },
        { name: "Item 2", imageUrl: image },
        { name: "Item 3", imageUrl: image },
        { name: "Item 4", imageUrl: image },
        { name: "Item 5", imageUrl: image },
        { name: "Item 6", imageUrl: image },
        { name: "Item 7", imageUrl: image },
        { name: "Item 8", imageUrl: image },
        { name: "Item 9", imageUrl: image },
        { name: "Item 10", imageUrl: image },
        { name: "Item 11", imageUrl: image },
        { name: "Item 12", imageUrl: image },
        { name: "Item 13", imageUrl: image },
        { name: "Item 14", imageUrl: image },
        { name: "Item 15", imageUrl: image },
        { name: "Item 16", imageUrl: image },
        { name: "Item 17", imageUrl: image },
        { name: "Item 18", imageUrl: image },

    ]
    return (
        <div className="bg-[#202124]">
            <Helmet>
                <title>Meting - MeetUp</title>
            </Helmet>
            <div className="flex items-start justify-center min-h-screen w-full md:flex-1 mx-auto">
                <div className="autoFit w-full">
                    {
                        joinUser.map(user => <UserCard key={user.name} cardData={user} />)
                    }
                </div>
                <div className="hidden p-5 md:flex flex-col gap-5 text-gray-100 md:w-1/4">
                    <div className="bg-[#2c3a47] rounded-md p-3 min-h-36">
                        <p>Polling</p>
                    </div>
                    <div className="bg-[#2c3a47] rounded-md p-3 min-h-56">
                        <p>Chatting</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;