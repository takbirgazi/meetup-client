import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import cat from "../../../../assets/cat.png";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Meetings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [showAvatar, setShowAvatar] = useState(7)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const {
    data: meetingsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meetings"],
    queryFn: async () => {
      const response = await axiosSecure("/meetings");
      if (response.status === 200 && Array.isArray(response.data)) {
        // Filter meetings for the instant user as either host or participant
        const userMeetings = response.data
          .filter(
            (meeting) =>
              meeting.hostEmail === user.email ||
              meeting.participants.some(
                (participant) => participant.email === user.email
              )
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Extract participants from each meeting
        return userMeetings.map((meeting) => ({
          ...meeting,
          participants: [...meeting.participants],
        }));
      }
      return [];
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

  // console.log(meetingsData);

  const meetings = meetingsData || [];
  const instantMeetings = meetings.filter(
    (meeting) => meeting.status === "instant"
  );
  const scheduledMeetings = meetings.filter(
    (meeting) => meeting.status === "scheduled"
  );

  const getBadgeCount = () => {
    switch (activeTab) {
      case "all":
        return meetings.length;
      case "instant":
        return instantMeetings.length;
      case "scheduled":
        return scheduledMeetings.length;
      default:
        return 0;
    }
  };

  // Avatar Counting 
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setShowAvatar(1)
    } else if (window.innerWidth <= 800) {
      setShowAvatar(3)
    } else if (window.innerWidth <= 1050) {
      setShowAvatar(5)
    } else {
      setShowAvatar(7)
    }
  }, []);

  const renderTable = (meetings) => (
    <div className="w-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-xl rounded-xl overflow-y-scroll min-h-32 max-h-[calc(100vh-220px)]">
      <div className="min-w-full divide-y divide-white/10">
        <div className="bg-black/50 backdrop-blur-lg border-b border-white/10">
          <div className="grid grid-cols-4 gap-2 px-6 py-4">
            <div className="flex items-center gap-3 text-white/90">
              <Calendar className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Date
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Clock className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Time
              </span>
            </div>
            <div className="flex  items-center gap-3 text-white/90">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Host
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Participants
              </span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-white/10 bg-transparent">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={`loading-${index}`}
                className="grid grid-cols-4 gap-2 px-6 py-4 animate-pulse"
              >
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
              </div>
            ))
          ) : error ? (
            <div className="px-6 py-4 text-red-400">
              Error loading meetings. Please try again later.
            </div>
          ) : meetings.length === 0 ? (

            <div className="px-6 py-4 text-white/90">
              No meetings found.
            </div>
          ) : (
            meetings.map((meeting, index) => (
              <div
                key={meeting._id}
                className="table-row-hover grid grid-cols-4 gap-2 px-6 py-4 transition-colors hover:bg-white/5"
                style={{
                  animation: `rowEntrance 0.5s ease-out forwards`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-sm text-white/90 truncate">
                  {formatDate(meeting.date)}
                </div>
                <div className="text-sm text-white/90 truncate">
                  {meeting.date.split(", ")[1]}
                </div>
                <div className="flex ml-3 items-center">
                  <span
                    className="tooltip tooltip-top tooltip-primary"
                    data-tooltip={meeting.hostName}
                  >
                    <div className="avatar avatar-sm avatar-ring-warning">
                      <img
                        src={meeting.participants[0]?.photoURL} // Use host photoURL
                        alt={meeting.hostName}
                        className="rounded-full w-6 h-6 object-cover"
                      />
                    </div>
                  </span>
                </div>
                <div className="flex items-center avatar-group p-2">
                  {meeting.participants
                    .filter(
                      (participant) => participant.email !== meeting.hostEmail
                    ) // Exclude host
                    .slice(0, showAvatar)
                    .map((participant, index) => (
                      <span
                        key={participant.email || index}
                        className="tooltip tooltip-top tooltip-primary"
                        data-tooltip={participant.name}
                      >
                        <div className="avatar avatar-sm avatar-ring">
                          <img
                            src={
                              participant.photoURL ? participant.photoURL : cat
                            } // Use participant photoURL
                            alt={participant.name}
                            className="rounded-full w-6 h-6 object-cover " // Smaller, rounded avatar
                          />
                        </div>
                      </span>
                    ))}
                  {meeting.participants.filter(
                    (participant) => participant.email !== meeting.hostEmail
                  ).length > showAvatar && (
                      <div className="avatar flex items-center justify-center h-6 w-6 px-2">
                        <div className="bg-transparent rounded-full text-black w-full h-full text-center flex items-center justify-center ">
                          <h2 className="font-bold text-center">+
                            {meeting.participants.filter(
                              (participant) =>
                                participant.email !== meeting.hostEmail
                            ).length - showAvatar}
                          </h2>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:pl-8 lg:pr-16 min-h-screen ">
      <div className="w-full mb-8 backdrop-blur-md bg-black/40 border border-white/10 shadow-xl rounded-xl md:mt-0 mt-4">
        <div className="p-4 ">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2 ">
              {["all", "instant", "scheduled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg transition-all duration-300 backdrop-blur-md ${activeTab === tab
                    ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-black/40 text-white/90 hover:bg-white/10 border border-white/10"
                    }`}
                >
                  <span className="whitespace-nowrap text-sm font-medium">
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} Meetings
                  </span>
                </button>
              ))}
            </div>
            <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-blue-500/20 text-white/90 border border-white/10 backdrop-blur-md text-sm text-center font-medium">
              {getBadgeCount()} Meetings
            </span>
          </div>
        </div>
      </div>

      <p className="text-white/90 text-sm mb-2 ml-2 ">
        <span className="dot dot-warning mr-2 animate-pulse"></span>
        You can view all your meetings history here.{" "}
      </p>

      {activeTab === "all" && renderTable(meetings)}
      {activeTab === "instant" && renderTable(instantMeetings)}
      {activeTab === "scheduled" && renderTable(scheduledMeetings)}
    </div>
  );
};

export default Meetings;
