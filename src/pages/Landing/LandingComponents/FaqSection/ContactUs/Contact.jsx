import React from 'react';
import contactUsBanner from "../../../../../assets/images/LandingPageImages/contactUs.jpg";
import { NavLink } from 'react-router-dom';
import { WiDirectionLeft } from "react-icons/wi";

const Contact = () => {
    return (
        <div>
            <div className='relative'>
                <img src={contactUsBanner} className='h-[350px] w-full' alt="Contact Us" />
                <div className='absolute left-[10%] top-[40%] text-white font-bold'>
                    <NavLink to='/'>
                        <button className="border text-white px-4 py-2 rounded flex items-center">
                        <WiDirectionLeft className='text-3xl'/>
                        Go Back</button>
                    </NavLink>
                    <p className="text-3xl font-bold mt-6">CONTACT US</p>
                </div>
            </div>
            
        </div>
    );
};

export default Contact;
