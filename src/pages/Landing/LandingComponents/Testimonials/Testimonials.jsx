import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React from "react";
import { FaStar } from "react-icons/fa6";
import testimonialImg from "../../../../assets/images/LandingPageImages/Testimonial_img.png";
import "./Testimonials.css";

const Testimonials = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  return (
    <div className="my-28 mx-[6%] gap-8 space-y-5 md:space-y-0 md:flex justify-between items-center">
      {/* Carousel div */}
      <div className="md:w-[50%] w-full h-auto">
        <div>
          <p className="text-[#0095ff] text-lg font-semibold text-center md:text-left">
            Testimonials
          </p>
          <h1 className="text-3xl text-center md:text-left md:text-5xl font-semibold mt-2">
            What Customers Say
          </h1>
          <p className="mt-3 md:text-left text-center text-xl text-gray-500 text-balance">
            Don’t just take our word for it. Here’s what our customers have to
            say about MeetUp.
          </p>
        </div>
        {/* Carousel Sliders here: currently hardcoded! */}

        <div ref={sliderRef} className="keen-slider">
          {/* 1 */}
          <div className="keen-slider__slide mt-3 md:block md:text-left flex flex-col items-center text-center">
            <div className=" mt-2">
              <img
                className="w-40 h-12 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/1024px-Amazon_2024.svg.png"
                alt=""
              />
            </div>
            <div className="flex gap-1 mt-4 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-2xl mt-5 text-gray-500 text-balance">
              “MeetUp has been a game-changer for our team. The video quality is
              top-notch, and the audio is crystal clear. It’s made remote
              collaboration a breeze.”
            </p>
            <div className="flex items-center mt-5">
              <div className="avatar">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="text-gray-500">CEO, Amazon</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="keen-slider__slide mt-3 md:block md:text-left flex flex-col items-center text-center">
            <div className=" mt-2">
              <img
                className="w-40 h-12 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png"
                alt=""
              />
            </div>
            <div className="flex gap-1 mt-4 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-2xl mt-5 text-gray-500 text-balance">
              “MeetUp has been a game-changer for our team. The video quality is
              top-notch, and the audio is crystal clear. It’s made remote
              collaboration a breeze.”
            </p>
            <div className="flex items-center mt-5">
              <div className="avatar">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-semibold">Michael Smith</p>
                <p className="text-gray-500">Principle Engineer, Google</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="keen-slider__slide mt-3 md:block md:text-left flex flex-col items-center text-center">
            <div className=" mt-2">
              <img
                className="w-40 h-10 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1024px-Microsoft_logo_%282012%29.svg.png"
                alt=""
              />
            </div>
            <div className="flex gap-1 mt-4 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-2xl mt-5 text-gray-500 text-balance">
              “MeetUp has been a game-changer for our team. The video quality is
              top-notch, and the audio is crystal clear. It’s made remote
              collaboration a breeze.”
            </p>
            <div className="flex items-center mt-5">
              <div className="avatar">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-semibold">Satya Nadella</p>
                <p className="text-gray-500">COO, Microsoft</p>
              </div>
            </div>
          </div>
          {/* 4 */}
          <div className="keen-slider__slide mt-3 md:block md:text-left flex flex-col items-center text-center">
            <div className=" mt-2">
              <img
                className="w-12 h-12 "
                src="https://www.alpharesumes.com.au/wp-content/uploads/2018/11/apple-logo-transparent-1024x1024.png"
                alt=""
              />
            </div>
            <div className="flex gap-1 mt-4 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-2xl mt-5 text-gray-500 text-balance">
              “MeetUp has been a game-changer for our team. The video quality is
              top-notch, and the audio is crystal clear. It’s made remote
              collaboration a breeze.”
            </p>
            <div className="flex items-center mt-5">
              <div className="avatar">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-semibold">Tim Cook</p>
                <p className="text-gray-500">CEO, Apple</p>
              </div>
            </div>
          </div>
          {/* 5 */}
          <div className="keen-slider__slide mt-3 md:block md:text-left flex flex-col items-center text-center">
            <div className=" mt-2">
              <img
                className="w-40 h-10 "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Facebook_logo_%282023%29.svg/1024px-Facebook_logo_%282023%29.svg.png"
                alt=""
              />
            </div>
            <div className="flex gap-1 mt-4 text-amber-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-2xl mt-5 text-gray-500 text-balance">
              “MeetUp has been a game-changer for our team. The video quality is
              top-notch, and the audio is crystal clear. It’s made remote
              collaboration a breeze.”
            </p>
            <div className="flex items-center mt-5">
              <div className="avatar">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                  alt="avatar"
                />
              </div>
              <div className="ml-3">
                <p className="text-lg font-semibold">Mark Zuckerberg</p>
                <p className="text-gray-500">CEO, Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* image div */}
      <div className="md:w-[50%] w-full md:pt-0 pt-4 flex justify-center md:justify-end">
        <img
          className="w-4/5 md:w-full max-w-xs md:max-w-md lg:max-w-lg"
          src={testimonialImg}
          alt="Testimonial"
        />
      </div>
    </div>
  );
};

export default Testimonials;
