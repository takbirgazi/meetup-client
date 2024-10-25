import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Users } from "lucide-react";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Meetings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const axiosSecure = useAxiosSecure();

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
        return response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      }
      return [];
    },
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

  const meetings = meetingsData || [];
  const currentMeetings = meetings.filter(
    (meeting) => meeting.status === "current"
  );
  const scheduledMeetings = meetings.filter(
    (meeting) => meeting.status === "scheduled"
  );

  const getBadgeCount = () => {
    switch (activeTab) {
      case "all":
        return meetings.length;
      case "current":
        return currentMeetings.length;
      case "scheduled":
        return scheduledMeetings.length;
      default:
        return 0;
    }
  };

  const renderTable = (meetings) => (
    <div className="w-full backdrop-blur-xl bg-black/40 border border-white/10 shadow-xl rounded-xl overflow-hidden">
      <style>{`
        @keyframes tableEntrance {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes rowEntrance {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .table-row-hover {
          position: relative;
          isolation: isolate;
        }

        .table-row-hover::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.03), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .table-row-hover:hover::after {
          opacity: 1;
        }

        .glass-effect {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }
      `}</style>

      <div className="min-w-full divide-y divide-white/10">
        <div className="bg-black/50 backdrop-blur-lg border-b border-white/10">
          <div className="grid grid-cols-3 gap-2 px-6 py-4">
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
            <div className="flex items-center gap-3 text-white/90">
              <Users className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Host
              </span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-white/10 bg-transparent">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 px-6 py-4 animate-pulse"
              >
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-4 bg-white/10 rounded" />
              </div>
            ))
          ) : error ? (
            <div className="px-6 py-4 text-red-400">
              Error loading meetings. Please try again later.
            </div>
          ) : (
            meetings.map((meeting, index) => (
              <div
                key={meeting.id}
                className="table-row-hover grid grid-cols-3 gap-2 px-6 py-4 transition-colors hover:bg-white/5"
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
                <div className="text-sm text-white/90 font-medium truncate">
                  {meeting.hostName}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="w-full mb-8 backdrop-blur-md bg-black/40 border border-white/10 shadow-xl rounded-xl">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {["all", "current", "scheduled"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg transition-all duration-300 backdrop-blur-md ${
                    activeTab === tab
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
            <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500/20 to-blue-500/20 text-white/90 border border-white/10 backdrop-blur-md text-sm font-medium">
              {getBadgeCount()}{" "}
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Meetings
            </span>
          </div>
        </div>
      </div>

      {activeTab === "all" && renderTable(meetings)}
      {activeTab === "current" && renderTable(currentMeetings)}
      {activeTab === "scheduled" && renderTable(scheduledMeetings)}
    </div>
  );
};

export default Meetings;
