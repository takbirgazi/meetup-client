


import { useState } from "react";
import { WiDirectionRight, WiDirectionUpRight } from "react-icons/wi";
import FaqData from "./FaqData";
import img2 from "../../../../assets/images/LandingPageImages/contact.png";
import { NavLink, ScrollRestoration } from "react-router-dom";

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div id='faq' className="section flex flex-col lg:flex-row my-28 mx-[6%] justify-between">
            <ScrollRestoration/>
            <div className="w-full lg:w-[50%] mb-8 lg:mb-0">
                <h4 className="text-[#0095ff] text-2xl pb-8 font-medium">QUESTIONS & ANSWERS</h4>
                <h1 className="text-4xl md:text-5xl pb-4 font-semibold">
                    Frequently <span className="bg-[#fec458] px-3 rounded-tr-3xl">asked</span>
                </h1>
                <h1 className="text-4xl md:text-5xl font-semibold">Questions</h1>
                <p className="pt-12 font-bold text-xl">Don't get Answer?</p>
                <p className="pt-2 pb-12 text-gray-600 font-medium">We will answer you in less than 2 Hours!!</p>
                <div>
                    <NavLink to='/contact'>
                        <button className="group relative text-[#0095ff] font-medium text-[18px] flex justify-center">
                            Leave us a Message
                            <span className="relative w-6 h-6">
                                <WiDirectionRight className="absolute top-0 left-0 text-4xl opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                                <WiDirectionUpRight className="absolute top-0 left-0 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </span>
                        </button>
                    </NavLink>
                    <img src={img2} className="w-16 h-16 my-4" />
                </div>
            </div>
            <div className="w-full lg:w-[50%]">
                <div className="accordion-group accordion-group-bordered">
                    {FaqData.map((faq, index) => (
                        <div className="accordion" key={index}>
                            <div
                                className="flex items-center cursor-pointer p-2"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span className="ml-4 text-3xl text-gray-500">{openIndex === index ? '-' : '+'}</span>
                                <label className="accordion-title font-semibold bg-transparent">{faq.question}</label>
                            </div>
                            {openIndex === index && (
                                <div className="accordion-content flex items-center">
                                    <div className="min-h-0">{faq.answer}</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;
