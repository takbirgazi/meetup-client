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
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meetingInput, setMeetingInput] = useState("");

  const axiosSecure = useAxiosSecure();

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

    // console.log(meetingData);

    // Submit the form data to the backend
    axiosSecure
      .post("/create-meeting", meetingData)
      .then((response) => {
        const meetingLink = meetingData.meetingLink;
        toast.success("Meeting scheduled successfully!");
        toast.success(
          <div className="flex items-center gap-2">
            {/* keep the meeting link text only and make it blue like a link  */}
            <p className="text-blue-500">Scheduled Meeting Link: </p>
            {/* copy the link by this button */}
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
          {
            duration: 500000,
          }
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

  // Instant Meeting Handler
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

    // console.log(meetingData);

    // Submit the form data to the backend
    axiosSecure
      .post("/create-meeting", meetingData)
      .then((response) => {
        toast.success("Instant meeting created successfully!");
        console.log("Current Meeting Data:", response.data);
        navigate(`/room/${meetingId}`);
      })
      .catch((error) => {
        toast.error("Failed to create instant meeting. Please try again.");
        console.error("Error creating instant meeting:", error);
      });
  };

  // show error message for handleSchedule if user is not logged in
  const handleScheduleForLater = (e) => {
    console.log("ok");
    if (!user) {
      e.preventDefault();
      toast.error("Please login to schedule a meeting.");
      return;
    }
  };
  // handle join meeting
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

    // Extract meeting ID if the input is a full meeting link
    if (meetingInput.includes("/room/")) {
      const urlParts = meetingInput.split("/room/");
      meetingId = urlParts[urlParts.length - 1];
    }

    try {
      // Check if the meeting exists in the database
      const response = await axiosSecure.get(`/meeting/${meetingId}`);

      if (response.status === 200 && response.data) {
        console.log("Meeting found:", response.data);

        // Patch the new participant to the meeting
        axiosSecure
          .patch(`/meeting/${meetingId}`, {
            name: user.displayName,
            email: user.email,
            role: "participant",
          })
          .then((response) => {
            // You can check the server response status here
            if (response.status === 200) {
              console.log("Participant added successfully!");
              toast.success(response.data.message);
              navigate(`/room/${meetingId}`); // Redirect to the meeting room
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
    <div className="min-h-[calc(100vh-4.1rem)] min-w-screen bg-[#202124] flex items-center justify-center">
      <div className="relative h-full flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto">
        <Helmet>
          <title>Home - MeetUp</title>
        </Helmet>
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
              {/* Modal starts here */}
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
                      {/* <div>
                      <label htmlFor="name" className="text-black">
                        Name:
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="input text-black bg-white border border-gray-300 rounded p-2 w-full"
                        {...register("name", { required: true })}
                        readOnly
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-black">
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="input text-black bg-white border border-gray-300 rounded p-2 w-full"
                        {...register("email", { required: true })}
                        readOnly
                      />
                    </div> */}
                      <div className="text-center my-6">
                        {/* <label htmlFor="date" className="text-black">
                        Schedule Date:
                      </label> */}
                        <input
                          id="date"
                          type="datetime-local"
                          className="input text-black bg-white border border-gray-300 rounded p-2 w-full"
                          {...register("date", { required: true })}
                        />
                        {errors.date && (
                          <p className="text-red-500">This field is required</p>
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
              {/* Modal ends here */}
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
  );
};

export default Home;