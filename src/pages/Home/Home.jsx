import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="relative h-full w-full">
      <Helmet>
        <title>Home - MeetUp</title>
        <p>Today we will work in this page</p>
      </Helmet>
      <div></div>
    </div>
  );
};

export default Home;
