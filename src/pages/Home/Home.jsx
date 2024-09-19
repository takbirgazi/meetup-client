import { Helmet } from "react-helmet-async";

const Home = () => {
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
              <div className="dropdown-menu dropdown-menu-bottom-right">
                <a className="dropdown-item text-sm">Instant meeting</a>
                <a tabIndex="-1" className="dropdown-item text-sm">
                  Schedule for later
                </a>
              </div>
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
