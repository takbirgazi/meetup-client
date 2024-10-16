import moment from "moment";
import React, { useEffect, useState } from "react";

const MiniScheduleTable = ({ meetings, loading, onMeetingExpired }) => {
  const [meetingTimes, setMeetingTimes] = useState([]);

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

      // Check if any meetings were filtered out (expired)
      if (times.length !== meetingTimes.length) {
        // Notify parent component about expired meetings
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
      <div className="flex w-full justify-center items-center bg-gray-900 p-8 rounded-lg shadow-lg">
        <p className="text-gray-300 text-lg">No upcoming meetings scheduled</p>
      </div>
    );
  }

  return (
    <div className="flex w-full overflow-x-auto bg-gray-900 p-4 rounded-lg shadow-lg">
      <table className="table-compact table-auto w-full text-left max-w-4xl">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            <th className="px-4 py-2">Date & Time</th>
            <th className="px-4 py-2">Remaining Time</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <tr
                  key={index}
                  className="animate-pulse bg-gray-800 border-b border-gray-700"
                >
                  <td className="px-4 py-2">
                    <div className="h-5 bg-gray-700 rounded-md"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-5 bg-gray-700 rounded-md"></div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="h-5 bg-gray-700 rounded-md"></div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            meetingTimes.map((meeting) => (
              <tr
                key={meeting._id}
                className="bg-gray-800 text-gray-100 border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <td className="px-4 py-2 text-white">{meeting.date}</td>
                <td className="px-4 py-2 text-white font-mono">
                  {meeting.remainingTime}
                </td>
                <td className="px-4 py-2">
                  <button className="btn btn-primary btn-sm text-white hover:bg-blue-600 transition-colors">
                    <a
                      href={meeting.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white no-underline"
                    >
                      Join
                    </a>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MiniScheduleTable;
