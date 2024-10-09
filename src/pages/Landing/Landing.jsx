import Faq from "./LandingComponents/FaqSection/Faq";
import MovingSlider from "./LandingComponents/MovingSlider/MovingSlider";
import Specialty from "./LandingComponents/Specialty/Specialty";


const Landing = () => {
    return (
        <div className="container mx-auto">

            <MovingSlider />
            <Specialty />
            <Faq></Faq>

        </div>
    );
};

export default Landing;