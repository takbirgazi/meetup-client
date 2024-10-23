import { useQuery, useQueryClient } from "@tanstack/react-query";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { TiPlusOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import MiniScheduleTable from "../../components/MiniScheduleTable/MiniScheduleTable";
import Navbar from "../../components/Navbar/Navbar";
import options from "../../components/ParticleOptions/ParticleOptions";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MEETINGS_QUERY_KEY = "meetings";
const REFETCH_INTERVAL = 30000; // 30 seconds

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meetingInput, setMeetingInput] = useState("");
  const axiosSecure = useAxiosSecure();
  const [init, setInit] = useState(false);
  const queryClient = useQueryClient();
  const lastFetchTime = useRef(Date.now());

  // Memoize the fetch function with better error handling
  const fetchMeetings = useCallback(async () => {
    if (!user) return [];

    const now = Date.now();
    if (now - lastFetchTime.current < 1000) {
      // Debounce fetches within 1 second
      return queryClient.getQueryData([MEETINGS_QUERY_KEY, user?.email]) || [];
    }

    try {
      lastFetchTime.current = now;
      const response = await axiosSecure("/meetings");
      const filteredMeetings = response.data.filter(
        (meeting) =>
          meeting.status === "scheduled" &&
          meeting.participants.some(
            (participant) => participant.email === user.email
          )
      );

      // Sort meetings by date
      return filteredMeetings.sort(
        (a, b) =>
          moment(a.date, "DD MMM YYYY, hh:mm A").valueOf() -
          moment(b.date, "DD MMM YYYY, hh:mm A").valueOf()
      );
    } catch (error) {
      console.error("Error fetching meetings:", error);
      return queryClient.getQueryData([MEETINGS_QUERY_KEY, user?.email]) || [];
    }
  }, [user, axiosSecure, queryClient]);

  // Optimized React Query implementation with better caching and update strategy
  const {
    data: meetings = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [MEETINGS_QUERY_KEY, user?.email],
    queryFn: fetchMeetings,
    enabled: !!user,
    staleTime: REFETCH_INTERVAL,
    cacheTime: REFETCH_INTERVAL * 2,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    onError: (error) => {
      console.error("Error fetching meetings:", error);
      toast.error("Failed to fetch meetings");
    },
  });

  // Memoize meetings data with deep comparison
  const memoizedMeetings = useMemo(() => {
    return meetings.map((meeting) => ({
      ...meeting,
      key: `${meeting.meetingId}-${meeting.date}`, // Add a stable key for each meeting
    }));
  }, [meetings]);

  // Optimized particle initialization
  useEffect(() => {
    let mounted = true;
    if (!init) {
      const initializeParticles = async () => {
        try {
          await initParticlesEngine(async (engine) => {
            await loadSlim(engine);
          });
          if (mounted) {
            setInit(true);
          }
        } catch (error) {
          console.error("Failed to initialize particles:", error);
        }
      };
      initializeParticles();
    }
    return () => {
      mounted = false;
    };
  }, []);

  const particlesLoaded = useCallback((container) => {
    console.log(container);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(
      () => ({
        name: user?.displayName || "",
        email: user?.email || "",
      }),
      [user]
    ),
  });

  // Form reset effect
  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  // Optimized meeting creation with proper cache updates
  const createMeeting = useCallback(
    async (meetingData) => {
      try {
        await axiosSecure.post("/create-meeting", meetingData);
        // Optimistic update
        queryClient.setQueryData([MEETINGS_QUERY_KEY, user?.email], (old) => {
          return [...(old || []), meetingData];
        });
        await queryClient.invalidateQueries([MEETINGS_QUERY_KEY, user?.email]);
      } catch (error) {
        console.error("Error creating meeting:", error);
        throw error;
      }
    },
    [axiosSecure, queryClient, user?.email]
  );

  const onSubmit = useCallback(
    async (data) => {
      const formattedDate = moment(data.date).format("DD MMM YYYY, hh:mm A");
      const uuid = uuidv4();
      const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
      const meetingLink = `${window.location.origin}/room/${meetingId}`;

      const meetingData = {
        date: formattedDate,
        meetingLink,
        meetingId,
        status: "scheduled",
        participants: [
          {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: "host",
          },
        ],
      };

      try {
        await createMeeting(meetingData);
        toast.success("Meeting scheduled successfully!");
        toast.success(
          <div className="flex items-center gap-2">
            <p className="text-blue-500">Scheduled Meeting Link: </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast.success("Meeting link copied to clipboard!");
              }}
              className="btn btn-sm btn-solid-primary"
            >
              <IoCopyOutline />
            </button>
          </div>,
          { duration: 10000 }
        );

        reset();
        document.getElementById("modal-2").checked = false;
      } catch (error) {
        toast.error("Failed to schedule the meeting. Please try again.");
      }
    },
    [user, createMeeting, reset]
  );

  const handleInstantMeet = useCallback(async () => {
    if (!user) {
      toast.error("Please login to create instant meeting.");
      return;
    }

    const uuid = uuidv4();
    const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
    const meetingLink = `${window.location.origin}/room/${meetingId}`;

    const meetingData = {
      date: moment().format("DD MMM YYYY, hh:mm A"),
      meetingLink,
      meetingId,
      status: "current",
      participants: [
        {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          role: "host",
        },
      ],
    };

    try {
      await createMeeting(meetingData);
      toast.success("Instant meeting created successfully!");
      navigate(`/room/${meetingId}`);
    } catch (error) {
      toast.error("Failed to create instant meeting. Please try again.");
    }
  }, [user, createMeeting, navigate]);

  const handleScheduleForLater = useCallback(
    (e) => {
      if (!user) {
        e.preventDefault();
        toast.error("Please login to schedule a meeting.");
      }
    },
    [user]
  );

  const handleJoinMeeting = useCallback(async () => {
    if (!user) {
      toast.error("Please login to join a meeting.");
      return;
    }
    if (!meetingInput) {
      toast.error("Please enter a meeting code or link.");
      return;
    }

    let meetingId = meetingInput.trim();
    if (meetingInput.includes("/room/")) {
      const urlParts = meetingInput.split("/room/");
      meetingId = urlParts[urlParts.length - 1];
    }

    try {
      const response = await axiosSecure.get(`/meeting/${meetingId}`);
      if (response.status === 200 && response.data) {
        const participantResponse = await axiosSecure.patch(
          `/meeting/${meetingId}`,
          {
            name: user.displayName,
            email: user.email,
            role: "participant",
          }
        );

        if (participantResponse.status === 200) {
          toast.success(participantResponse.data.message);
          await queryClient.invalidateQueries([
            MEETINGS_QUERY_KEY,
            user?.email,
          ]);
          navigate(`/room/${meetingId}`);
        } else {
          toast.error(participantResponse.data.error);
        }
      } else {
        toast.error("Meeting not found.");
      }
    } catch (error) {
      console.error("Error checking meeting:", error);
      toast.error("Meeting not found.");
    }
  }, [user, meetingInput, axiosSecure, queryClient, navigate]);

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading meetings</div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen relative">
      <Helmet>
        <title>Home - MeetUp</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center">
        <Navbar />
        {init && (
          <Particles
            id="tsparticles"
            options={options}
            loaded={particlesLoaded}
            className="absolute top-0 left-0 w-full h-full"
          />
        )}
        <div className="min-h-screen relative flex flex-col md:flex-row justify-evenly items-center w-full max-w-screen-xl mx-auto p-4">
          <div className="flex flex-col items-center md:w-1/2 w-full p-4">
            <div className="text-center space-y-1 text-balance">
              <h1 className="text-3xl text-white">
                Video Calls and Meetings for Everyone
              </h1>
              <h4 className="text-lg text-gray-300">
                Connect, collaborate, and celebrate from anywhere with
              </h4>
            </div>
            <div className="flex flex-wrap w-full justify-center items-center md:gap-3 gap-1 mt-4">
              <div className="dropdown">
                <button className="btn my-2" tabIndex="0">
                  New Meeting
                </button>
                <div className="dropdown-menu w-44 dropdown-menu-bottom-right">
                  <button
                    onClick={handleInstantMeet}
                    className="dropdown-item text-sm flex-row items-center gap-2"
                  >
                    <TiPlusOutline />
                    Instant meeting
                  </button>
                  <label
                    tabIndex="-1"
                    className="dropdown-item text-sm flex-row items-center gap-2"
                    htmlFor="modal-2"
                    onClick={handleScheduleForLater}
                  >
                    <FaRegCalendarCheck />
                    Schedule for later
                  </label>
                </div>
                <input className="modal-state" id="modal-2" type="checkbox" />
                <div className="modal w-screen">
                  <label className="modal-overlay" htmlFor="modal-2"></label>
                  <div className="modal-content min-h-72 flex flex-col gap-5 max-w-3xl bg-gray-200 text-black rounded-lg p-4 md:p-12">
                    <div className="flex flex-col min-h-60 justify-center">
                      <label
                        htmlFor="modal-2"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <h1 className="md:text-3xl text-2xl text-center font-semibold">
                        Schedule Meeting for Later
                      </h1>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3"
                      >
                        <div className="text-center space-y-4 my-6">
                          <input
                            id="date"
                            type="datetime-local"
                            className="input text-black bg-white border border-gray-300 rounded p-2 w-full"
                            {...register("date", { required: true })}
                          />
                          {errors.date && (
                            <p className="text-red-500">
                              This field is required
                            </p>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="btn text-black btn-block bg-gradient-to-r from-[#ffbfff] to-[#a2deff]"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <input
                className="input w-auto"
                placeholder="Enter Meet Code or Link..."
                value={meetingInput}
                onChange={(e) => setMeetingInput(e.target.value)}
              />
              <button
                className="btn bg-gradient-to-r from-[#ffbfff] to-[#a2deff]"
                onClick={handleJoinMeeting}
              >
                Join
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 mt-4 md:mt-0 md:w-1/2 w-full p-4">
            <MiniScheduleTable
              meetings={memoizedMeetings}
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
