import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";

const MiniScheduleTable = ({ meetings, loading, onMeetingExpired }) => {
  const [meetingTimes, setMeetingTimes] = useState([]);
  const [animatingItems, setAnimatingItems] = useState(new Set());

  const calculateRemainingTime = (dateStr) => {
    const now = moment();
    const meetingTime = moment(dateStr, "DD MMM YYYY, hh:mm A");

    if (!meetingTime.isValid()) {
      console.error("Invalid datetime:", dateStr);
      return "Invalid time";
    }

    const duration = moment.duration(meetingTime.diff(now));

    if (duration.asSeconds() <= 0) {
      return "expired";
    }

    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const timeString = [];
    if (days > 0) timeString.push(`${days}d`);
    if (hours > 0) timeString.push(`${hours}h`);
    if (minutes > 0) timeString.push(`${minutes}m`);
    timeString.push(`${seconds}s`);

    return timeString.join(" ");
  };

  useEffect(() => {
    const updateMeetingTimes = () => {
      const times = meetings
        .map((meeting) => ({
          ...meeting,
          remainingTime: calculateRemainingTime(meeting.date),
        }))
        .filter((meeting) => meeting.remainingTime !== "expired");

      times.forEach((meeting) => {
        if (!meetingTimes.find((m) => m._id === meeting._id)) {
          setAnimatingItems((prev) => new Set(prev).add(meeting._id));
          setTimeout(() => {
            setAnimatingItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(meeting._id);
              return newSet;
            });
          }, 800);
        }
      });

      if (times.length !== meetingTimes.length) {
        const expiredMeetings = meetings.filter(
          (meeting) => calculateRemainingTime(meeting.date) === "expired"
        );
        expiredMeetings.forEach((meeting) => {
          onMeetingExpired && onMeetingExpired(meeting._id);
        });
      }

      setMeetingTimes(times);
    };

    if (!loading) {
      updateMeetingTimes();
      const intervalId = setInterval(updateMeetingTimes, 1000);
      return () => clearInterval(intervalId);
    }
  }, [loading, meetings, onMeetingExpired]);

  if (meetingTimes.length === 0 && !loading) {
    return (
      <div className="flex w-full justify-center items-center bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-lg">No upcoming meetings scheduled</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4"
            >
              <div className="h-16 bg-gray-800/50 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {meetingTimes.map((meeting) => (
            <div
              key={meeting._id}
              className={`group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 
                hover:bg-gray-800/40 transition-all duration-300 
                before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent before:transition-all
                hover:before:border-blue-500/20 hover:before:scale-[1.02] hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/5
                ${
                  animatingItems.has(meeting._id) ? "animate-cardEntrance" : ""
                }`}
            >
              {/* Main Content */}
              <div className="relative flex flex-col lg:flex-row items-stretch gap-4 p-2">
                {/* Date and Time Section */}
                <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 lg:flex-1">
                  <div className="inline-flex items-center gap-2 text-gray-300 bg-gray-800/30 px-3 py-1.5 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-sm whitespace-nowrap">
                      {moment(meeting.date).format("LL")}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-gray-300 bg-gray-800/30 px-3 py-1.5 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-sm whitespace-nowrap">
                      {moment(meeting.date).format("LT")}
                    </span>
                  </div>
                </div>

                {/* Countdown and Action Section */}
                <div className="flex flex-row items-center justify-center lg:justify-end gap-4 flex-wrap lg:flex-nowrap">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-full px-4 py-1.5 border border-gray-700/50 min-w-[120px] text-center">
                    <code className="text-sm font-mono text-blue-400">
                      {meeting.remainingTime}
                    </code>
                  </div>

                  <a
                    href={meeting.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
                      bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium 
                      transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25
                      hover:scale-105 active:scale-95 min-w-[100px]"
                  >
                    Join
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </div>
              </div>

              {/* Gradient Border Effect */}
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 
                group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiniScheduleTable;
