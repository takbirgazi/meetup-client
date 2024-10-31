
import React, { useEffect } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Support = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    subject: "",
    message: "",
    email: "",
  });

  // Handle opening and closing of modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceId = "service_2g4bo8b";
    const templateId = "template_rt7xuay";
    const userId = "I9IaDBN3uMEbEOTlS";

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then(() => {
        toast.success("Email sent successfully!");
        setFormData({ subject: "", message: "", email: "" });
        closeModal();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send email. Please try again.");
      });
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/a6vab3qwefqger4viz3zhpg3jt5rxzp2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="support" className="flex items-center justify-center min-h-screen p-6 mr-10">
      <style>{`
        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          animation: cardEntrance 0.8s ease-out forwards;
          padding: 20px;
        }

        .input-field {
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          padding: 10px;
          color: black;
          background-color: rgba(255, 255, 255, 0.8); /* Light background for input fields */
        }

        .modal-content {
          background-color: rgba(255, 255, 255, 0.9); /* Lighter modal background */
          border-radius: 12px; /* Rounded corners for the modal */
        }
      `}</style>

      <div className="px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Need Help? We're Here to Support You
          </h2>
          <p className="pt-4 text-md text-gray-200">
            If you're facing any issues or have questions about using MeetUp, feel free to reach out to us.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex-1 glass-effect rounded-lg text-center">
            <div className="flex items-center justify-center py-5">
              <MdEmail className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Email Support</h3>
            <p className="mt-4 text-gray-200">
              You can send us an email at{" "}
              <a href="mailto:support@meetup.com" className="text-indigo-400 hover:text-indigo-500">
                meetup24bd@gmail.com
              </a>{" "}
              and we'll get back to you as soon as possible.
            </p>
            <button
              onClick={openModal}
              className="mt-6 px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg shadow-lg text-white"
            >
              Send Email
            </button>
          </div>

          <div className="flex-1 glass-effect rounded-lg text-center">
            <div className="flex items-center justify-center py-5">
              <IoChatbubbleEllipsesSharp className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Live Chat</h3>
            <p className="mt-4 text-gray-200">
              Need immediate help? Start a live chat with our support team and get your questions answered in real-time.
            </p>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Send Email Modal"
          className="fixed inset-0 flex items-center justify-center"
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75"
        >
          <div className="relative glass-effect modal-content p-8 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto">
            <AiOutlineClose
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900"
              size={24}
            />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Send an Email</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field mt-1 block w-full"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="input-field mt-1 block w-full"
                  placeholder="Enter Subject"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="input-field mt-1 block w-full"
                  rows="4"
                  placeholder="Write Here..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 py-2 rounded font-medium text-white"
              >
                Send Email
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Support;
