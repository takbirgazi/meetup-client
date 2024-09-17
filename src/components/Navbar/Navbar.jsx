import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-[#000435]">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center lg:px-12 md:px-8 px-4 py-4">
                <h2 className="text-gray-200 font-bold lg:text-3xl md:text-2xl text-xl"><NavLink to="/">MeetUp</NavLink></h2>
                <div className="text-gray-200">
                    <ul className="flex gap-2 items-center">
                        <li><NavLink to="/">Sign Up</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;