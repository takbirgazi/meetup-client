
import logo from "../../../../assets/MeetUp.png";

const Footer = () => {
  return (
    <footer className=" bg-[#0d0428] text-center md:text-start">
      <div className="footer text-white py-10 flex flex-col items-center md:flex-row justify-between container mx-auto ">
        <div className="w-full md:w-[40%] flex flex-col items-center md:items-start mb-6 md:mb-0">
          
          <img src={logo} className="h-10 w-auto mb-2" />
          <p>
            Video Calling App
            <br />
            Connecting people, anywhere, anytime.
          </p>
          <p className="text-white/60 pt-3">Copyright © 2024 - All right reserved</p>
        </div>

        <div className="flex w-full md:w-[60%] justify-around">
        <nav className="flex flex-col mb-6 md:mb-0 ">
          <h6 className="footer-title font-semibold text-lg ">Features</h6>
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
        </div>
        
      </div>
      

      
    </footer>
  );
};

export default Footer;
