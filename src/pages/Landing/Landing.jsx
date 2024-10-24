import Banner from "./LandingComponents/Banner/Banner";
import React from 'react';
import ScrollToTop from 'react-scroll-to-top';
import Faq from "./LandingComponents/FaqSection/Faq";
import Footer from "./LandingComponents/Footer/Footer";
import MovingSlider from "./LandingComponents/MovingSlider/MovingSlider";
import NavBar from "./LandingComponents/NavComponent/NavBar";
import Specialty from "./LandingComponents/Specialty/Specialty";
import Testimonials from "./LandingComponents/Testimonials/Testimonials";
import WhyChooseUs from "./LandingComponents/WhyChooseUs/WhyChooseUs";
import useAuth from "../../hooks/useAuth";

const Landing = () => {
    const {user, logOut} = useAuth();
    // console.log(user);
  return (
    <div className='bg-gradient-to-r from-gray-50 to-gray-200'>
      <div className="md:h-screen bg-gray-900 w-full flex items-center justify-center">
        <div className="container mx-auto">
          <NavBar />
          <Banner />
        </div>
      </div>

      <div className="container mx-auto">
        <MovingSlider />
        <Specialty />
        <Testimonials />
        <WhyChooseUs />
        <Faq />
      </div>

      <div>
        <Footer />
      </div>

      <ScrollToTop
        smooth
        className="fixed bottom-10 right-10 flex justify-center items-center h-16 w-16 rounded-full border-4 border-blue-500 cursor-pointer"
        component={<CustomIcon />}
      >
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 animate-pulse"></div>
      </ScrollToTop>
    </div>
  );
};

// CustomIcon component for the circular scroll-to-top button
const CustomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

export default Landing;
