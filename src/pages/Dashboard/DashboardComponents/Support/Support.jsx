import { MdEmail } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaQuoteLeft } from "react-icons/fa";

const Support = () => {
    return (
        <section id="support" className="h-full bg-gradient-to-r from-gray-50 to-gray-200 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-20 lg:pt-36">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Need Help? We're Here to Support You
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        If you're facing any issues or have questions about using MeetUp, feel free to reach out to us. Our team is here to help with technical problems, setup, and more.
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center py-5">
                            <MdEmail className="h-12 w-12 border-2 border-transparent p-1 rounded-full" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Email Support
                        </h3>
                        <p className="mt-4 text-gray-600">
                            You can send us an email at <a href="mailto:support@meetup.com" className="text-indigo-600 hover:text-indigo-500">support@meetup.com</a> and we'll get back to you as soon as possible.
                        </p>
                        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                            Send Email
                        </button>
                    </div>


                    <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center py-5">
                            <IoChatbubbleEllipsesSharp className="h-12 w-12 border-2 border-transparent p-1 rounded-full" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                            Live Chat
                        </h3>
                        <p className="mt-4 text-gray-600">
                            Need immediate help? Start a live chat with our support team and get your questions answered in real-time.
                        </p>
                        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                            Live Chat
                        </button>
                    </div>

                    <div className="flex-1 bg-white shadow-lg rounded-lg p-6 text-center">
                        <div className="flex items-center justify-center py-5">
                            <FaQuoteLeft className="h-12 w-12 border-2 border-transparent p-1 rounded-full" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900">
                            FAQs
                        </h3>
                        <p className="mt-4 text-gray-600">
                            Browse through our Frequently Asked Questions for quick answers to common issues.
                        </p>
                        <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                            Visit FAQ
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Support;