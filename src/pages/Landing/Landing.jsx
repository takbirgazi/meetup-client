import Faq from "./LandingComponents/FaqSection/Faq";
import Footer from "./LandingComponents/Footer/Footer";
import MovingSlider from "./LandingComponents/MovingSlider/MovingSlider";
import Specialty from "./LandingComponents/Specialty/Specialty";
import Testimonials from "./LandingComponents/Testimonials/Testimonials";
import WhyChooseUs from "./LandingComponents/WhyChooseUs/WhyChooseUs";

const Landing = () => {
  return (
    <div>
      <div className="container mx-auto">
        <MovingSlider />
        <Specialty />
        <Testimonials />
        <WhyChooseUs />
        <Faq></Faq>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Landing;
