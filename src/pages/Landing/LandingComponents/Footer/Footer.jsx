import logo from "../../../../assets/logo.png";

const Footer = () => {
    return (
        <div>
            <div className="footer text-white bg-black p-4 flex justify-center items-center">
                <img src={logo} className="h-[40px] w-[60px] mr-2" alt="Logo" />
                <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
            </div>
        </div>
    );
};

export default Footer;
