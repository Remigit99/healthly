import { Link } from "react-router"
import HealthlyLogo from "/echomed_logo.svg"

const Navbar = () => {
  return (
    <nav className="sticky h-16 w-full bg-amber-200 flex justify-between items-center">
        <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div>
            <img src={HealthlyLogo} alt="Healthly_Logo" />
        </div>

        {/* MENU LINKS */}
        <div className="flex gap-8">
            <Link className="font-semibold hover:text-gray-700" to="/">Home</Link>
            <Link className="font-semibold hover:text-gray-700" to="/">Services</Link>
            <Link className="font-semibold hover:text-gray-700" to="/about">About</Link>
            <Link className="font-semibold hover:text-gray-700" to="/contact">Contact</Link>
        </div>

        <div>
            <button className="px-4 py-2  bg-[#FF7F50] rounded-md text-white font-semibold hover:bg-[#FF6347] transition duration-300   ">
                <p>Get Started</p>
            </button>
        </div>

        </div>
    </nav>
  )
}

export default Navbar