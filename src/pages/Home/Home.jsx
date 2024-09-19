import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="relative h-full w-full">
      <Helmet>
        <title>Home - MeetUp</title>
      </Helmet>
      <div>
        <p>Today we will work in this page</p>
      </div>
    </div>
  );
};

export default Home;
