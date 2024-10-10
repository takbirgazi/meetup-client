import Banner from "./LandingComponents/Banner/Banner";
import Testing from "./LandingComponents/Banner/Testing";
import MovingSlider from "./LandingComponents/MovingSlider/MovingSlider";
import NavBar from "./LandingComponents/NavComponent/NavBar";
import Specialty from "./LandingComponents/Specialty/Specialty";


const Landing = () => {
    return (
        <div className="">
            <div className="bg-gray-900 h-screen flex items-center justify-center">
                <NavBar />
                <Banner />
                {/* <Testing/> */}
            </div>
            <MovingSlider />
            <Specialty />

        </div>
    );
};

export default Landing;