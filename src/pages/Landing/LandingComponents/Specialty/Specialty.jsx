import SpecialtyCard from "./SpecialtyCard";
import features1 from "../../../../assets/images/LandingPageImages/features1.svg";
import features2 from "../../../../assets/images/LandingPageImages/features2.svg";
import features3 from "../../../../assets/images/LandingPageImages/features3.svg";
import { ScrollRestoration } from "react-router-dom";


const Specialty = () => {

    const featureCardData = [
        {
            id: 1,
            tittle: `Fast Performance`,
            image: features1,
            desc: `Nor again is there anyone who loves or pursues or desires to pain, because it is pain, but because occasionally`
        },
        {
            id: 2,
            tittle: `Easy to setup`,
            image: features2,
            desc: `Nor again is there anyone who loves or pursues or desires to pain, because it is pain, but because occasionally`
        },
        {
            id: 3,
            tittle: `Simple and clean UI`,
            image: features3,
            desc: `Nor again is there anyone who loves or pursues or desires to pain, because it is pain, but because occasionally`
        },
    ]

    return (
        <div id="features" className="section p-5 flex flex-col items-center justify-center gap-16">
            <ScrollRestoration/>
            <div className="flex flex-col gap-5 w-10/12">
                <p className="text-center font-bold text-xl text-[#0095ff]">Features</p>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-950">Get amazing benefits</h2>
            </div>
            <div className="w-11/12 md:w-10/12 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                    featureCardData.map(cardData => <SpecialtyCard key={cardData.id} cardDataInfo={cardData} />)
                }
            </div>
        </div>
    );
};

export default Specialty;