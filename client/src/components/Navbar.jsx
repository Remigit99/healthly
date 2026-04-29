import { Link } from "react-router"
import HealthlyLogo from "/echomed_logo.svg"
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logOut } from "../store/features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    setIsOpen(false);
  };

  return (
    <nav className="sticky z-100 top-0 left-0 right-0 h-16 w-full bg-amber-200 flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link to="/">
            <img src={HealthlyLogo} alt="Healthly_Logo" />
        </Link>

        {/* MENU LINKS */}
        <div className=" hidden md:flex md:gap-8 ">
            <Link className="font-semibold hover:text-gray-700" to="/">Home</Link>
            <Link className="font-semibold hover:text-gray-700" to="/">Services</Link>
            <Link className="font-semibold hover:text-gray-700" to="/about">About</Link>
            <Link className="font-semibold hover:text-gray-700" to="/contact">Contact</Link>
        </div>

        <div className="flex gap-4 items-center">
            {user ? (
          /* LOGGED IN: Show Avatar Dropdown */
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg transition"
            >
              <FaUserCircle size={24} className="text-gray-600" />
              <span className="font-medium text-gray-700">{user.name || 'Account'}</span>
              <FaChevronDown size={12} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-xl z-50">
                <Link 
                  to={user.role === 'parent' ? '/parent-dashboard' : '/doctor-dashboard'} 
                  className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  My Profile
                </Link>
                <hr />
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          /* NOT LOGGED IN: Show Login/Signup */
          
           <div className="flex gap-4">     
            <button className="px-4 py-2  text-[#FF7F50] rounded-md  font-semibold hover:bg-[#FF6347] transition duration-300   ">
                <Link className="text-black1 hover:text-white" to="/login">Login</Link>
            </button>
           
            <button className="px-4 py-2  bg-[#FF7F50] rounded-md text-white font-semibold hover:bg-[#FF6347] transition duration-300   ">
                <Link className="text-white" to="/register">Sign Up</Link>
            </button>
        </div>)}

        </div>
        </div>
    </nav>
  )
}

export default Navbar