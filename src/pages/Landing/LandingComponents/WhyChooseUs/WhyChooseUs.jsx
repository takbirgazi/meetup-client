import React from "react";
import { FiVideo } from "react-icons/fi";
import { RiLockStarLine, RiVoiceprintFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import groupImg from "../../../../assets/images/landingPageImages/group-image.avif";

const WhyChooseUs = () => {
  return (
    <div className="my-28 mx-[6%]  md:flex justify-between items-center">
      {/* section:1 (all the texts and icons) */}
      <div>
        <div>
          <p className="text-[#0095ff] font-semibold text-lg">
            The MeetUp Advantage
          </p>
          <h1 className="text-5xl font-semibold">Why Choose MeetUp</h1>
          <p className="mt-3 text-xl text-gray-500 text-balance ">
            In a world where connection is everything, MeetUp takes the lead.
            Our cutting-edge video conferencing app offers:
          </p>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:mt-10 lg:mt-20">
          {/* grid item 1*/}
          <div>
            <div className="text-[#0095ff] w-fit p-2 border rounded-full">
              <FiVideo />
            </div>
            <h2 className="text-2xl font-semibold mt-1">
              Crystal-clear HD Video
            </h2>
            <p className="text-gray-500 text-balance mt-2">
              No more pixelation or blurriness just stunning, lifelike clarity
              that brings your team closer in meetings.
            </p>
          </div>
          {/* grid item 2*/}
          <div>
            <div className="text-[#0095ff] w-fit p-2 border rounded-full">
              <RiVoiceprintFill />
            </div>
            <h2 className="text-2xl font-semibold mt-1">
              Noise-cancelling audio
            </h2>
            <p className="text-gray-500 text-balance mt-2">
              Say goodbye to background noise and distractions. Our app filters
              out unwanted sounds for a seamless meeting experience.
            </p>
          </div>
          {/* grid item 3*/}
          <div>
            <div className="text-[#0095ff] w-fit p-2 border rounded-full">
              <SlCalender />
            </div>
            <h2 className="text-2xl font-semibold mt-1">
              Scheduling made easy
            </h2>
            <p className="text-gray-500 text-balance mt-2">
              Streaming your agenda with MeetUp's intuitive scheduling. Plan and
              manage your meetings easily and efficiently.
            </p>
          </div>
          {/* grid item 4*/}
          <div>
            <div className="text-[#0095ff] w-fit p-2 border rounded-full">
              <RiLockStarLine />
            </div>
            <h2 className="text-2xl font-semibold mt-1">Bank-grade security</h2>
            <p className="text-gray-500 text-balance mt-2">
              Your privacy is our priority with bank-grade security protocols
              safeguarding your meetings and data from unwanted intruders.
            </p>
          </div>
        </div>
        {/* Grid */}
      </div>
      {/* section:2 (image svg) */}
      <div className="w-full">
        <img src={groupImg} alt="group" />
      </div>
    </div>
  );
};

export default WhyChooseUs;
