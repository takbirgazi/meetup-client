import { ScrollRestoration } from "react-router-dom";
import MovingSwiper from "./MovingSwiper";

const MovingSlider = () => {
    return (
        <div id="partners" className="section p-5 pt-16 flex flex-col items-center justify-center gap-10">
            <ScrollRestoration/>
            <div className="flex flex-col gap-5 w-10/12">
                <p className="text-center font-bold text-xl text-gray-950">Big & Small business trusted us</p>
            </div>
            <div className="w-11/12 md:w-10/12">
                <MovingSwiper />
            </div>
        </div>
    );
};

export default MovingSlider;