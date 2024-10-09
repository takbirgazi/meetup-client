
import logo from "../../../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-10 flex flex-col md:flex-row justify-between items-start">
      <aside className="flex flex-col items-start mb-6 md:mb-0">
        <img src={logo} className="h-[50px] w-[65px] mb-4" alt="Logo" />
        <p>
          Video Calling App
          <br />
          Connecting people, anywhere, anytime.
        </p>
      </aside>

      <nav className="flex flex-col mb-6 md:mb-0">
        <h6 className="footer-title font-semibold text-lg">Features</h6>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">High-Quality Video</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Screen Sharing</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Group Calls</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Record Meetings</a>
      </nav>

      <nav className="flex flex-col mb-6 md:mb-0">
        <h6 className="footer-title font-semibold text-lg">Support</h6>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Help Center</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Contact Us</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">FAQ</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Feedback</a>
      </nav>

      <nav className="flex flex-col mb-6 md:mb-0">
        <h6 className="footer-title font-semibold text-lg">Community</h6>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Blog</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Forum</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Events</a>
        <a className="link link-hover text-gray-300 hover:text-blue-400 transition">Partnerships</a>
      </nav>
    </footer>
  );
};

export default Footer;
