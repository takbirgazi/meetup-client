import emailjs from "emailjs-com";
import React from "react";
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
    <div
      id="support"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6"
    >
      <div className="relative w-full max-w-6xl">
        {/* Background blur circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="relative">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mt-[8%] bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-blue-300">
              Need Help? We're Here to Support You
            </h2>
            <p className="pt-6 text-lg text-gray-300 max-w-2xl mx-auto">
              If you're facing any issues or have questions about using MeetUp,
              feel free to reach out to us. Our team is here to help with
              technical problems, setup, and more.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center py-6">
                <MdEmail className="h-16 w-16 text-pink-300 animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Email Support
              </h3>
              <p className="text-gray-300 text-lg">
                You can send us an email at{" "}
                <a
                  href="mailto:meetup24bd@gmail.com"
                  className="text-pink-300 hover:text-pink-400 transition-colors"
                >
                  meetup24bd@gmail.com
                </a>{" "}
                and we'll get back to you as soon as possible.
              </p>
              <button
                onClick={openModal}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-lg text-white font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-pink-500/25"
              >
                Send Email
              </button>
            </div>

            <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20 shadow-xl hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-center py-6">
                <IoChatbubbleEllipsesSharp className="h-16 w-16 text-blue-300 animate-pulse" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Live Chat
              </h3>
              <p className="text-gray-300 text-lg">
                Need immediate help? Start a live chat with our support team and
                get your questions answered in real-time.
              </p>
            </div>
          </div>

          {/* Modal for Email Form */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Send Email Modal"
            className="fixed inset-0 flex items-center justify-center"
            overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm"
          >
            <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 sm:mx-auto border border-white/20">
              <AiOutlineClose
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                size={24}
              />
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send an Email
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    placeholder="Enter Your Email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    placeholder="Enter Subject"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white/50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                    rows="4"
                    placeholder="Write Here..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-pink-500/25"
                >
                  Send Email
                </button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Support;
