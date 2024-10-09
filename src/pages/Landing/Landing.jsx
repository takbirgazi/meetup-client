import Banner from "./LandingComponents/Banner/Banner";
import MovingSlider from "./LandingComponents/MovingSlider/MovingSlider";
import NavBar from "./LandingComponents/NavComponent/NavBar";
import Specialty from "./LandingComponents/Specialty/Specialty";


const Landing = () => {
    return (
        <div className=" bg-[#0F172A] min-h-screen">
            <div className="bg-gray-300 h-screen">
                <NavBar />
                <Banner />
            </div>
            <MovingSlider />
            <Specialty />

        </div>
    );
};

export default Landing;