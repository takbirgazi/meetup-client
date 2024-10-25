import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "scheduled-meetings";

// Helper function to calculate remaining time
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

// MeetingItem component
const MeetingItem = React.memo(({ meeting, isAnimating, onExpired }) => {
  const [remainingTime, setRemainingTime] = useState(() =>
    calculateRemainingTime(meeting.date)
  );
  const [isExpiring, setIsExpiring] = useState(false);
  const expiryTimeoutRef = useRef(null);

  useEffect(() => {
    const checkAndUpdateTime = () => {
      const newRemainingTime = calculateRemainingTime(meeting.date);
      setRemainingTime(newRemainingTime);

      if (newRemainingTime === "expired" && !isExpiring) {
        setIsExpiring(true);
        expiryTimeoutRef.current = setTimeout(() => {
          onExpired(meeting._id);
        }, 500);
      }
    };

    const intervalId = setInterval(checkAndUpdateTime, 1000);

    return () => {
      clearInterval(intervalId);
      if (expiryTimeoutRef.current) {
        clearTimeout(expiryTimeoutRef.current);
      }
    };
  }, [meeting.date, meeting._id, onExpired, isExpiring]);

  return (
    <div
      className={`group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4 
        hover:bg-gray-800/40 transition-all duration-300 
        before:absolute before:inset-0 before:rounded-xl before:border-2 before:border-transparent before:transition-all
        hover:before:border-blue-500/20 hover:before:scale-[1.02] hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/5
        ${isAnimating ? "animate-cardEntrance" : ""}
        ${isExpiring ? "animate-cardExit" : ""}
        transform-origin-top`}
      style={{
        animation: isExpiring
          ? "cardExit 0.5s ease-out forwards"
          : isAnimating
          ? "cardEntrance 0.8s ease-out forwards"
          : "none",
      }}
    >
      <div className="relative flex flex-col lg:flex-row items-stretch gap-4 p-2">
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

        <div className="flex flex-row items-center justify-center lg:justify-end gap-4 flex-wrap lg:flex-nowrap">
          <div className="bg-gradient-to-r from-gray-800 to-gray-800/50 rounded-full px-4 py-1.5 border border-gray-700/50 min-w-[120px] text-center">
            <code className="text-sm font-mono text-blue-400">
              {remainingTime}
            </code>
          </div>

          <a
            href={meeting.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-pink-500 to-blue-600 text-white hover:bg-blue-500  text-sm font-medium 
              transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25
              hover:scale-105 active:scale-95 min-w-[100px]"
          >
            Join
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 
        group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
    </div>
  );
});

// MiniScheduleTable component
const MiniScheduleTable = ({ meetings = [], loading, onMeetingExpired }) => {
  const [validMeetings, setValidMeetings] = useState([]);
  const [animatingItems, setAnimatingItems] = useState(new Set());
  const previousMeetingsRef = useRef([]);

  // Updated useEffect to handle duplicates properly
  useEffect(() => {
    const currentTime = moment();

    // Create a Map to store unique meetings by _id
    const meetingsMap = new Map();

    // First, add all incoming meetings to the map
    meetings.forEach((meeting) => {
      if (meeting._id) {
        meetingsMap.set(meeting._id, meeting);
      }
    });

    // Then, get stored meetings and only add them if they don't already exist
    try {
      const storedMeetings = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      storedMeetings.forEach((meeting) => {
        if (meeting._id && !meetingsMap.has(meeting._id)) {
          meetingsMap.set(meeting._id, meeting);
        }
      });
    } catch (error) {
      console.error("Error parsing stored meetings:", error);
    }

    // Convert map back to array and filter valid meetings
    const allMeetings = Array.from(meetingsMap.values()).filter((meeting) => {
      return (
        moment(meeting.date, "DD MMM YYYY, hh:mm A").isAfter(currentTime) &&
        meeting.meetingLink &&
        meeting.date
      );
    });

    // Sort by date
    allMeetings.sort(
      (a, b) =>
        moment(a.date, "DD MMM YYYY, hh:mm A").valueOf() -
        moment(b.date, "DD MMM YYYY, hh:mm A").valueOf()
    );

    // Update localStorage with the deduplicated list
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allMeetings));
    setValidMeetings(allMeetings);

    // Handle animations for new meetings
    const previousMeetingIds = new Set(
      previousMeetingsRef.current.map((m) => m._id)
    );
    allMeetings.forEach((meeting) => {
      if (!previousMeetingIds.has(meeting._id)) {
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

    previousMeetingsRef.current = allMeetings;
  }, [meetings]);

  const handleMeetingExpired = useCallback(
    (meetingId) => {
      setValidMeetings((prev) => {
        const updatedMeetings = prev.filter((m) => m._id !== meetingId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMeetings));
        return updatedMeetings;
      });
      onMeetingExpired?.(meetingId);
    },
    [onMeetingExpired]
  );

  if (validMeetings.length === 0 && !loading) {
    return (
      <div className="flex w-full justify-center items-center bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-lg">No upcoming meetings scheduled</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <style>
        {`
          @keyframes cardExit {
            0% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px) scale(0.8);
              height: 0;
              margin: 0;
              padding: 0;
            }
          }
          
          @keyframes cardEntrance {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.8);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
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
          {validMeetings.map((meeting) => (
            <MeetingItem
              key={meeting._id}
              meeting={meeting}
              isAnimating={animatingItems.has(meeting._id)}
              onExpired={handleMeetingExpired}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiniScheduleTable;
