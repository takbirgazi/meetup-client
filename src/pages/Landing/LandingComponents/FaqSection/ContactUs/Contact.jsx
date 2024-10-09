
import  { useState } from "react";
import contactUsBanner from "../../../../../assets/images/LandingPageImages/contactUs.jpg";
import { NavLink } from "react-router-dom";
import { WiDirectionLeft } from "react-icons/wi";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative">
        <img
          src={contactUsBanner}
          className="h-[320px] w-full object-cover"
          alt="Contact Us"
        />
        <div className="absolute left-[10%] top-[35%] text-white font-bold">
          <NavLink to="/">
            <button className="border text-white px-4 py-2 rounded flex items-center">
              <WiDirectionLeft className="text-3xl" />
              Go Back
            </button>
          </NavLink>
          <p className="text-3xl font-bold mt-6">CONTACT US</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row my-10 justify-between">
        <div className="w-full md:w-1/2 p-4 mt-10 md:mt-32">
          <div className="flex items-center mb-4">
            <div className="rounded-full border border-black p-2 mr-2 flex items-center justify-center">
              <FaLocationDot className="text-2xl text-black" />
            </div>
            <p className="text-lg">123 Barishal Sadar, Barishal, Bangladesh</p>
          </div>
          <div className="flex items-center mb-4">
            <div className="rounded-full border border-black p-2 mr-2 flex items-center justify-center">
              <FaPhoneAlt className="text-2xl text-black" />
            </div>
            <p className="text-lg">+123 456 7890</p>
          </div>
          <div className="flex items-center mb-4">
            <div className="rounded-full border border-black p-2 mr-2 flex items-center justify-center">
              <MdEmail className="text-2xl text-black" />
            </div>
            <p className="text-lg">meetup24@gmail.com</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 mr-10">
          <h1 className="text-2xl font-semibold mb-4">We'd be pleased to hear</h1>
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-lg font-semibold">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="border border-gray-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="border bg-black text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
