import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineAudio } from "react-icons/ai";
import { HiOutlineHandRaised } from "react-icons/hi2";
import { IoVideocamOutline } from "react-icons/io5";
import {
  MdCallEnd,
  MdOutlineAddReaction,
  MdOutlineChat,
  MdOutlinePoll,
} from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { TbShareplay, TbUsers } from "react-icons/tb";
import { TfiLayoutColumn4, TfiLayoutGrid4Alt } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import image from "../../assets/logo.png";
import UserCard from "./UserCard";
import { axiosCommon } from "../../hooks/useAxiosCommon";

const Room = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState(""); // Polling or Chatting
  const [layout, setLayout] = useState("tiled"); // Layout type: "tiled" or "spotlight"
  const [chatMessage, setChatMessage] = useState(""); // State for chat input
  const [participants, setParticipants] = useState([]);

  const roomId = location.pathname.split("/").pop();

  useEffect(() => {
    axiosCommon.get(`meeting/${roomId}`)
      .then((res) => {
        setParticipants(res.data.participants)
      }
      )
      .catch((err) => {
        console.log(err)
      });
  }, [roomId]);

  const MAX_USERS_DISPLAYED = 15;
  const displayedUsers =
    participants?.length > MAX_USERS_DISPLAYED
      ? [
        ...participants.slice(0, MAX_USERS_DISPLAYED - 1),
        {
          name: `${participants.length - MAX_USERS_DISPLAYED + 1}+`,
          imageUrl: image,
        },
      ]
      : participants;

  // Function to toggle the drawer
  const toggleDrawer = (content) => {
    if (isDrawerOpen && drawerContent === content) {
      setIsDrawerOpen(false);
      setDrawerContent(""); // Reset the content
    } else {
      setDrawerContent(content);
      setIsDrawerOpen(true);
    }
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerContent(""); // Reset the content
  };

  // Function to handle layout change
  const handleLayoutChange = (layoutType) => {
    setLayout(layoutType);
  };

  // Function to handle chat send
  const handleChatSend = () => {
    if (chatMessage.trim()) {
      // Logic to send the chat message (e.g., add to chat history)
      console.log("Sending message:", chatMessage);
      setChatMessage(""); // Clear the input after sending
    }
  };

  // Function to get formatted time
  const getFormattedTime = () => {
    const now = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    return now.toLocaleTimeString("en-US", options).replace(":", ".");
  };

  // Dynamic button styles
  const buttonStyleMobile =
    "bg-gray-800 hover:bg-gray-600 px-4 py-3 rounded-full";

  // Function to close the meeting: minhaj
  const navigate = useNavigate();
  const exitMeeting = () => {
    Swal.fire({
      title: "Meeting Ended",
      text: "You have successfully left the meeting.",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="bg-[#202124] min-h-screen">
      <Helmet>
        <title>Meeting - MeetUp</title>
      </Helmet>

      <div className="flex flex-col">
        {/* Main Section */}
        <div className={`${isDrawerOpen && "lg:w-3/4"} w-full flex-grow flex justify-evenly pb-24`}>
          <div className="flex w-full max-w-screen-xl">
            <div
              className={`${layout === "tiled"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "flex justify-center"
                } w-full p-5`}
            >
              {displayedUsers?.map((user) => (
                <UserCard key={user?.name} cardData={user} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Part: Call Controls */}
        <div className="fixed bottom-0 h-20 w-full bg-transparent p-4 flex items-center justify-between text-gray-100">
          {/* Left Part: Current Date and Time */}
          <div className="hidden md:block text-md">{getFormattedTime()}</div>

          {/* Middle Part: Call Controls */}
          <div className="flex items-center space-x-2">
            {/* Visible on All Devices */}
            <button className={buttonStyleMobile}>
              <AiOutlineAudio />
            </button>
            <button className={buttonStyleMobile}>
              <IoVideocamOutline />
            </button>
            <button className={buttonStyleMobile}>
              <HiOutlineHandRaised />
            </button>
            <button
              onClick={exitMeeting}
              className={`btn w-20 text-lg rounded-full bg-red-500 hover:bg-gray-600 hover:text-red-500`}
            >
              <MdCallEnd />
            </button>

            {/* Hidden on Mobile, Visible on Large Screens */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className={buttonStyleMobile}>
                <TbShareplay />
              </button>
              <button className={buttonStyleMobile}>
                <MdOutlineAddReaction />
              </button>
            </div>

            {/* Options Button (Always Visible) */}
            <button
              className={buttonStyleMobile}
              onClick={() => toggleDrawer("options")}
            >
              <SlOptionsVertical />
            </button>
          </div>

          {/* Right Part: User Count and Buttons */}
          <div className="flex items-center space-x-2 text-2xl">
            <button
              className="md:hidden px-4 py-3 btn text-white bg-transparent hover:bg-gray-600"
              onClick={() => toggleDrawer("chatting")}
            >
              <MdOutlineChat />
            </button>

            {/* Hidden on Mobile, Visible on Large Screens */}
            <div className="hidden lg:flex space-x-2">
              <div className="relative px-4 py-3 btn text-white bg-transparent hover:bg-gray-700 rounded-full">
                <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1">
                  {participants.length}
                </span>
                <button>
                  <TbUsers />
                </button>
              </div>
              <button
                className="px-4 py-3 btn text-white bg-transparent hover:bg-gray-600"
                onClick={() => toggleDrawer("chatting")}
              >
                <MdOutlineChat />
              </button>
              <button
                className="px-4 py-3 btn text-white bg-transparent hover:bg-gray-600"
                onClick={() => toggleDrawer("polling")}
              >
                <MdOutlinePoll />
              </button>
            </div>
          </div>
        </div>

        {/* Drawer Section */}
        {isDrawerOpen && (
          <div className={`${isDrawerOpen && "lg:w-1/4"} mt-5 fixed bottom-26 rounded-2xl right-0 lg:w-1/4 h-[85%] lg:h-h-[85%]l bg-gray-400 p-5 text-black flex flex-col z-40`}>
            {/* Close Button */}
            <button
              className="bg-red-600 hover:bg-red-500 py-1 px-3 rounded-md text-white self-end"
              onClick={closeDrawer}
            >
              X
            </button>

            {/* Content for Polling or Chatting */}
            {drawerContent === "polling" ? (
              <div className="polling-content mt-5">
                <p>Polling</p>
              </div>
            ) : drawerContent === "chatting" ? (
              <div className="flex-grow flex flex-col bg-slate-300 rounded-xl p-3">
                {/* Chat Messages (Scrollable Area) */}
                <div className="flex-grow overflow-y-auto mb-4">
                  {/* Example Chat Messages */}
                  <p>User1: Hello!</p>
                  <p>User2: Hi there!</p>
                  {/* Dynamically generated chat messages */}
                </div>

                {/* Chat Input Field */}
                <div className="flex items-center mt-auto">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-grow p-2 rounded-md bg-white border border-gray-300 mr-2"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={handleChatSend}
                    className="bg-blue-600 hover:bg-blue-500 rounded-md px-4 py-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            ) : drawerContent === "options" ? (
              <div className="options-content mt-5">
                <p className="text-2xl">Layout</p>
                <div className="flex gap-2">
                  <button
                    className={`text-2xl ${layout === "tiled" ? "bg-blue-500" : ""
                      }`}
                    onClick={() => handleLayoutChange("tiled")}
                  >
                    <TfiLayoutGrid4Alt />
                  </button>
                  {/* <button
                    className={`text-2xl ${layout === "spotlight" ? "bg-blue-500" : ""
                      }`}
                    onClick={() => handleLayoutChange("spotlight")}
                  >
                    <TfiLayoutColumn4 />
                  </button> */}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
