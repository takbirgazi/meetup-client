import { Link } from "react-router-dom";
import banner from "../../../../assets/images/LandingPageImages/banner.png";
import background from "../../../../assets/background5.jpg";
const Banner = () => {
  return (
    <div className=" w-[95%] mx-auto md:flex gap-10 lg:gap-20">
      <div className="md:w-[50%] mt-[30%] md:mt-[12%] text-center md:text-start mb-[20px]">
        <p className="font-semibold text-gray-100 text-3xl lg:text-5xl">
          SuperCharge your Meeting and Make it Effective
        </p>

        <p className="py-6 text-gray-100">
          Experience seamless, high-quality video streaming and real-time
          meetings with our app, designed for effortless collaboration and
          connection from anywhere. With powerful features stay productive and
          engaged with a click
        </p>

        <Link
          to="/room"
          className="inline-block rounded-lg border bg-transparent p-[2px] mt-2 font-semibold text-black transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-blue-500 hover:text-white"
        >
          <div className="text-white font-bold px-6 py-2 rounded-md transition-all duration-300 hover:shadow-lg">
            Explore with a meeting
          </div>
        </Link>
      </div>

      <div className="md:w-[50%] lg:mt-[8%] mb-[20px] lg:mb-0 flex justify-end ">
        <img src={banner} className="h-[95%] w-auto" />
      </div>
    </div>
  );
};

export default Banner;
