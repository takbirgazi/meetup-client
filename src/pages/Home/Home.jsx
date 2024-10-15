import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import moment from "moment";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { TiPlusOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../../components/Navbar/Navbar";
import options from "../../components/ParticleOptions/ParticleOptions";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meetingInput, setMeetingInput] = useState("");
  const axiosSecure = useAxiosSecure();
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data) => {
    const formattedDate = moment(data.date).format("DD MMM YYYY, hh:mm A");
    const uuid = uuidv4();
    const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
    const meetingLink = `${window.location.origin}/room/${meetingId}`;
    const status = "scheduled";

    const meetingData = {
      date: formattedDate,
      meetingLink,
      meetingId,
      status,
      participants: [
        {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          role: "host",
        },
      ],
    };

    axiosSecure
      .post("/create-meeting", meetingData)
      .then((response) => {
        const meetingLink = meetingData.meetingLink;
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
          // if copy to clipboard success then the toast will disappear after 3 seconds otherwise it will stay for 20 seconds
          { duration: 10000 }
        );
        console.log("Scheduled Meeting Data:", response.data);
        reset();
        document.getElementById("modal-2").checked = false;
      })
      .catch((error) => {
        toast.error("Failed to schedule the meeting. Please try again.");
        console.error("Error scheduling meeting:", error);
      });
  };

  const handleInstantMeet = () => {
    if (!user) {
      toast.error("Please login to create instant meeting.");
      return;
    }
    const uuid = uuidv4();
    const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
    const meetingLink = `${window.location.origin}/room/${meetingId}`;
    const status = "current";

    const meetingData = {
      date: moment().format("DD MMM YYYY, hh:mm A"),
      meetingLink,
      meetingId,
      status,
      participants: [
        {
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
          role: "host",
        },
      ],
    };

    axiosSecure
      .post("/create-meeting", meetingData)
      .then((response) => {
        toast.success("Instant meeting created successfully!");
        navigate(`/room/${meetingId}`);
      })
      .catch((error) => {
        toast.error("Failed to create instant meeting. Please try again.");
        console.error("Error creating instant meeting:", error);
      });
  };

  const handleScheduleForLater = (e) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login to schedule a meeting.");
      return;
    }
  };

  const handleJoinMeeting = async () => {
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
        axiosSecure
          .patch(`/meeting/${meetingId}`, {
            name: user.displayName,
            email: user.email,
            role: "participant",
          })
          .then((response) => {
            if (response.status === 200) {
              toast.success(response.data.message);
              navigate(`/room/${meetingId}`);
            } else {
              toast.error(response.data.error);
            }
          })
          .catch((error) => {
            console.error("Error adding participant:", error);
            toast.error(response.data.error);
          });
      } else {
        toast.error("Meeting not found.");
      }
    } catch (error) {
      console.error("Error checking meeting:", error);
      toast.error("Meeting not found.");
    }
  };
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
        <div className="min-h-screen-100 relative flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-center space-y-1 text-balance">
              <h1 className="text-3xl text-white">
                Video Calls and Meetings for Everyone
              </h1>
              <h4 className="text-lg text-gray-300">
                Connect, collaborate, and celebrate from anywhere with{" "}
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
                  <div className="modal-content min-h-72 flex flex-col gap-5 max-w-3xl bg-white text-black rounded-lg  p-12">
                    <div className="flex flex-col min-h-60 justify-center">
                      <label
                        htmlFor="modal-2"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      >
                        ✕
                      </label>
                      <h1 className="md:text-3xl text-2xl text-center font-semibold ">
                        Schedule Meeting for Later
                      </h1>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-3"
                      >
                        <div className="text-center my-6">
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
                            className="btn btn-error btn-block bg-[#1e3799]"
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
                className="btn btn-solid-primary"
                onClick={handleJoinMeeting}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
