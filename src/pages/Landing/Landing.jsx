import React, { useEffect } from "react";
import Banner from "./LandingComponents/Banner/Banner";
import Faq from "./LandingComponents/FaqSection/Faq";
import Footer from "./LandingComponents/Footer/Footer";
import MovingSlider from "./LandingComponents/MovingSlider/MovingSlider";
import NavBar from "./LandingComponents/NavComponent/NavBar";
import Specialty from "./LandingComponents/Specialty/Specialty";
import Testimonials from "./LandingComponents/Testimonials/Testimonials";
import WhyChooseUs from "./LandingComponents/WhyChooseUs/WhyChooseUs";
import background from "../../assets/background5.jpg";
const Landing = () => {
  // Show the button during loading
  useEffect(() => {
    const chatButton = document.getElementById("tidio-chat");
    if (chatButton) {
      chatButton.style.display = "block";
    }
  }, []);
  // console.log(user);
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200">
      {/* <div className="lg:h-screen w-full flex items-center justify-center">
        <div className="container mx-auto">
          <NavBar />
          <Banner />
        </div>
      </div> */}
       <div
      className="lg:h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${background})`, // Use the imported background image
        backgroundSize: 'cover', // Ensure the background covers the entire div
        backgroundPosition: 'center', // Center the background image
      }}
    >
      {/* Black overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="container mx-auto relative z-10">
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
    </div>
  );
};

export default Landing;
