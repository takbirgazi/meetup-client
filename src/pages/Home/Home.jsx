import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="relative h-full w-full max-w-screen-xl mx-auto">
      <Helmet>
        <title>Home - MeetUp</title>
      </Helmet>
      <div className="">
        <p>Today we will work in this page</p>
      </div>
    </div>
  );
};

export default Home;
