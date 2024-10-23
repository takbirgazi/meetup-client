
import { useState } from "react";
import contactUsBanner from "../../../../../assets/images/LandingPageImages/contactUs.jpg";
import { NavLink } from "react-router-dom";
import { WiDirectionLeft } from "react-icons/wi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";

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
    // console.log(formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    toast.success("Message sent successfully!");
  };

  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="container mx-auto px-4 min-h-screen">
        {/* Banner Section */}
        <div className="relative">
          <img
            src={contactUsBanner}
            className="h-[320px] w-full object-cover"
            alt="Contact Us"
          />
          <div className="absolute left-[10%] top-[35%] text-white font-bold">
            <NavLink to="/">
              <button className="border border-1 border-transparent bg-gradient-to-r from-[#ffbfff] to-[#a2deff] p-[2px] mt-2 font-semibold text-black hover:text-white transition-all duration-300 px-4 py-2 rounded flex items-center">
                <WiDirectionLeft className="text-3xl" />
                Go Back
              </button>
            </NavLink>
            <p className="text-3xl font-bold mt-6">CONTACT US</p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row py-10 justify-between gap-14">
          {/* Google Map Section */}
          <div className="w-full md:w-1/2 p-4 ">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14722.631062583061!2d90.36020773754575!3d22.703780665498925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375534060f19a4e1%3A0x9b44a149b2c8787a!2sBarishal%208200!5e0!3m2!1sen!2sbd!4v1728750410859!5m2!1sen!2sbd"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Barishal Sadar Location"
              className="rounded"
            ></iframe>
            {/* Contact Information Section */}
            <div className="mt-6 md:flex justify-between">

              <div className="flex items-center mb-4">
                <div className="rounded-full border border-black p-2 mr-4 flex items-center justify-center">
                  <FaPhoneAlt className="text-2xl text-black" />
                </div>
                <p className="text-lg">+123 456 7890</p>
              </div>
              <div className="flex items-center mb-4">
                <div className="rounded-full border border-black p-2 mr-4 flex items-center justify-center">
                  <MdEmail className="text-2xl text-black" />
                </div>
                <p className="text-lg">meetup24@gmail.com</p>
              </div>
            </div>

          </div>

          {/* Contact Form Section */}
          <div className="w-full md:w-1/2 mr-10">
            <h1 className="text-3xl md:text-4xl font-semibold mb-6">We'd be pleased to hear</h1>
            <form className="w-full" onSubmit={handleSubmit}>
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
                className="border text-black font-bold px-4 py-2 bg-gradient-to-r from-[#ffbfff] to-[#a2deff] rounded hover:bg-blue-600 hover:text-white transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
