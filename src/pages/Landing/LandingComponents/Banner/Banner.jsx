import { Link } from "react-router-dom";
import banner from "../../../../assets/images/LandingPageImages/banner.png";
const Banner = () => {
  return (
    <div className=" w-[95%] mx-auto md:flex gap-10 lg:gap-20">
      <div class="md:w-[50%] mt-[30%] md:mt-[12%] text-center md:text-start mb-[20px]">
        <p class="font-semibold text-gray-100 text-3xl lg:text-5xl">
          SuperCharge your Meeting and Make it Effective
        </p>

        <p class="py-6 text-gray-100">
          Experience seamless, high-quality video streaming and real-time
          meetings with our app, designed for effortless collaboration and
          connection from anywhere. With powerful features stay productive and
          engaged with a click
        </p>
        <Link to={"/room"} class="btn btn-outline-primary font-semibold mt-2">
          Explore a meeting
        </Link>
      </div>

      <div class="md:w-[50%] lg:mt-[8%] mb-[20px] lg:mb-0 flex justify-end ">
        <img src={banner} className="h-[95%] w-auto" />
      </div>
    </div>
  );
};

export default Banner;
