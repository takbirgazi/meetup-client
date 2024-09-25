

import moment from "moment";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TiPlusOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";
import { axiosCommon } from '../../hooks/useAxiosCommon';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

    const meetingData = {
      ...data,
      date: formattedDate,
      meetingLink,
    };

    console.log("Scheduled Meeting Data:", meetingData);
    reset();
    // Close the modal after submitting
    document.getElementById("modal-2").checked = false;

    // You can add your form submission logic here
  };

  const handleInstantMeet = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const uuid = uuidv4();
    const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
    navigate(`/room/${meetingId}`);
  };

  const handleCreateMeeting = () => {
    // axiosCommon.post('/create-meeting', {})
    //   .then((response) => {
    //     console.log(response.data)
    //   }
    //   )
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

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
                >
                  <FaRegCalendarCheck />
                  Schedule for later
                </label>
              </div>
              {/* Modal starts here */}
              <input className="modal-state" id="modal-2" type="checkbox" />
              <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="modal-2"></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl bg-white text-black rounded-lg p-5">
                  <label
                    htmlFor="modal-2"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h1 className="text-2xl font-semibold">
                    Schedule Meeting for Later
                  </h1>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3"
                  >
                    <div>
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
                    </div>
                    <div>
                      <label htmlFor="date" className="text-black">
                        Schedule Date:
                      </label>
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
                      <button type="submit" className="btn btn-error btn-block">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* Modal ends here */}
            </div>
            <input className="input w-auto" placeholder="Enter Meet Code..." />
            <button className="btn btn-solid-primary" onClick={handleCreateMeeting}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
