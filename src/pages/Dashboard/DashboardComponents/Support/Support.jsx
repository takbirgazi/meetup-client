import React from "react";
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

    // EmailJS configuration
    const serviceId = "service_2g4bo8b";
    const templateId = "template_rt7xuay";
    const userId = "I9IaDBN3uMEbEOTlS";

    emailjs
      .send(serviceId, templateId, formData, userId)
      .then(() => {
        toast.success("Email sent successfully!");
        // Clear the form
        setFormData({ subject: "", message: "", email: "" });

        closeModal();
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send email. Please try again.");
      });
  };

  // Inject Tawk.to Script using useEffect
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://embed.tawk.to/670ee6f44304e3196ad21f8a/1ia93cb1n";
//     script.async = true;
//     script.charset = "UTF-8";
//     script.setAttribute("crossorigin", "*");

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

  
  return (
    <div id="support" className=" flex items-center justify-center">
      <div className="px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mt-[8%]">
            Need Help? We're Here to Support You
          </h2>
          <p className="pt-4 text-md text-gray-200">
            If you're facing any issues or have questions about using MeetUp, feel free to reach out to us. Our team is here to help with technical problems, setup, and more.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          <div className="flex-1 bg-gray-900 shadow-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center py-5">
              <MdEmail className="h-12 w-12 border-2 border-transparent p-1 rounded-full text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Email Support
            </h3>
            <p className="mt-4 text-gray-200">
              You can send us an email at <a href="mailto:support@meetup.com" className="text-indigo-400 hover:text-indigo-500">meetup24bd@gmail.com</a> and we'll get back to you as soon as possible.
            </p>
            <button onClick={openModal} className="mt-6 px-4 py-2 bg-gradient-to-r from-[#ffbfff] to-[#a2deff] rounded ">
              Send Email
            </button>
          </div>

          <div className="flex-1 bg-gray-900 shadow-lg rounded-lg p-6 text-center">
            <div className="flex items-center justify-center py-5">
              <IoChatbubbleEllipsesSharp className="h-12 w-12 border-2 border-transparent p-1 rounded-full text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-white">
              Live Chat
            </h3>
            <p className="mt-4 text-gray-200">
              Need immediate help? Start a live chat with our support team and get your questions answered in real-time.
            </p>
          </div>
        </div>

        {/* Modal for Email Form */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Send Email Modal"
          className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center"
          overlayClassName="fixed inset-0"
        >
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 sm:mx-auto">
            {/* Cross Icon to close modal */}
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  rows="4"
                  placeholder="Write Here..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ffbfff] to-[#a2deff] py-2 rounded font-medium"
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



