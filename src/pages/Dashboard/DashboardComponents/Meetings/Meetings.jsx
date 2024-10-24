import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock } from "lucide-react";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Meetings = () => {
  const [activeTab, setActiveTab] = useState("all");
  const axiosSecure = useAxiosSecure();

  // Format date helper function
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
    <div className="w-full rounded-xl bg-gray-900/40 backdrop-blur-sm border border-gray-800/50">
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
          background: linear-gradient(to right, transparent, rgba(59, 130, 246, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }

        .table-row-hover:hover::after {
          opacity: 1;
        }
      `}</style>

      <div className="min-w-full divide-y divide-gray-800/30">
        <div className="bg-gray-800/50 backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-2 px-4 py-3.5">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Date
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Time
              </span>
            </div>
            <div className="flex items-center text-gray-300">
              <span className="text-xs font-medium uppercase tracking-wider">
                Host
              </span>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-800/30 bg-transparent">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-2 px-4 py-3.5 animate-pulse"
              >
                <div className="h-4 bg-gray-800/50 rounded" />
                <div className="h-4 bg-gray-800/50 rounded" />
                <div className="h-4 bg-gray-800/50 rounded" />
              </div>
            ))
          ) : error ? (
            <div className="px-4 py-3.5 text-red-400">
              Error loading meetings. Please try again later.
            </div>
          ) : (
            meetings.map((meeting, index) => (
              <div
                key={meeting.id}
                className="table-row-hover grid grid-cols-3 gap-2 px-4 py-3.5 transition-colors"
                style={{
                  animation: `rowEntrance 0.5s ease-out forwards`,
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="text-sm text-gray-300 truncate">
                  {formatDate(meeting.date)}
                </div>
                <div className="text-sm text-gray-300 truncate">
                  {meeting.date.split(", ")[1]}
                </div>
                <div className="text-sm text-gray-300 font-medium truncate">
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
    <div className="p-4 lg:p-6 min-h-screen bg-gray-900 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {["all", "current", "scheduled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              <span className="whitespace-nowrap">
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Meetings
              </span>
            </button>
          ))}
        </div>
        <span className="px-4 py-2 badge badge-primary text-sm bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg whitespace-nowrap">
          {getBadgeCount()}{" "}
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Meetings
        </span>
      </div>

      {activeTab === "all" && renderTable(meetings)}
      {activeTab === "current" && renderTable(currentMeetings)}
      {activeTab === "scheduled" && renderTable(scheduledMeetings)}
    </div>
  );
};

export default Meetings;
