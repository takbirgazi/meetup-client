import { Helmet } from "react-helmet-async";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TiPlusOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useAuth from "../../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleInstantMeet = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    const uuid = uuidv4(); // Generate a meeting id
    const meetingId = uuid.slice(0, 4) + "-" + uuid.slice(4, 8);
    console.log("Instant Meet", meetingId);
    navigate(`/room/${meetingId}`); // Redirect to the new meeting room
  };

  return (
    <div className="min-h-[calc(100vh-4.1rem)]  min-w-screen bg-[#202124] flex items-center justify-center">
      <div className="relative h-full  flex flex-col items-center justify-center w-full max-w-screen-xl mx-auto">
        <Helmet>
          <title>Home - MeetUp</title>
        </Helmet>
        <div className="flex flex-col items-center">
          {/* text info */}
          <div className="text-center space-y-1 text-balance">
            <h1 className="text-3xl text-white">
              Video Calls and Meetings for Everyone
            </h1>
            <h4 className="text-lg text-gray-300">
              Connect, collaborate, and celebrate from anywhere with{" "}
            </h4>
          </div>
          {/* button option div */}
          <div className="flex flex-wrap w-full justify-center items-center md:gap-3 gap-1 mt-4">
            <div className="dropdown">
              <button className="btn my-2" tabIndex="0">
                New Meeting
              </button>
              <div className="dropdown-menu w-44 dropdown-menu-bottom-right">
                <button
                  onClick={handleInstantMeet}
                  className="dropdown-item text-sm flex-row items-center gap-2 "
                >
                  <TiPlusOutline />
                  Instant meeting
                </button>
                <label
                  tabIndex="-1"
                  className="dropdown-item text-sm flex-row items-center gap-2 "
                  htmlFor="modal-2"
                >
                  <FaRegCalendarCheck />
                  Schedule for later
                </label>
              </div>
              {/* modal starts here*/}
              <input className="modal-state" id="modal-2" type="checkbox" />
              <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="modal-2"></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                  <label
                    htmlFor="modal-2"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h1 className="text-2xl font-semibold">
                    Schedule Meeting for Later
                  </h1>
                  <form>
                    <div className="flex flex-col gap-3">
                      <p> {user?.displayName} </p>
                      <p> {user?.email} </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="btn btn-error btn-block">
                        Submit
                      </button>
                      {/* <button className="btn btn-block">Cancel</button> */}
                    </div>
                  </form>
                </div>
              </div>
              {/* modal ends here */}
            </div>

            <input className="input w-auto" placeholder="Enter Meet Code..." />
            <button className="btn btn-solid-primary">Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
