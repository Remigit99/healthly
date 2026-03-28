import { Link } from "react-router"
import HealthlyLogo from "/echomed_logo.svg"

const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 h-16 w-full bg-amber-200 flex justify-between items-center">
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
            <button className="px-4 py-2  text-[#FF7F50] rounded-md  font-semibold hover:bg-[#FF6347] transition duration-300   ">
                <Link className="text-white" to="/login">Login</Link>
            </button>
           
            <button className="px-4 py-2  bg-[#FF7F50] rounded-md text-white font-semibold hover:bg-[#FF6347] transition duration-300   ">
                <Link className="text-white" to="/register">Sign Up</Link>
            </button>
        </div>

        </div>
    </nav>
  )
}

export default Navbar