import LOGO from '/echomed_logo.svg';
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className='bg-light3'>
      <div className="container mx-auto px-4 md:px-12 py-8">

        <div className='mb-12 flex md:flex-row flex-col items-start justify-between gap-8'>
            <div> 
                <img src={LOGO} alt="Healthly Logo" />
                <p className='text-sm'>Nuturing Healthy Future</p>
                <div className='flex items-center gap-0.5'>
                    <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                        <CiFacebook size={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                        <FaXTwitter size={24} />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-800 mx-2">
                        <CiInstagram size={24} />
                    </a>
                </div>
            </div>

            <div>
                <h3 className='font-bold text-h6 text-gray2 mb-4'>Quick Links</h3>
                <ul className='text-p-small text-gray1'>
                    <li><a href="#" className='hover:text-gray-800'>Home</a></li>
                    <li><a href="#" className='hover:text-gray-800'>About Us</a></li>
                    <li><a href="#" className='hover:text-gray-800'>Blogs</a></li>
                    <li><a href="#" className='hover:text-gray-800'>Contact</a></li>
                    <li><a href="#" className='hover:text-gray-800'>Policy</a></li>
                    <li><a href="#" className='hover:text-gray-800'>Terms and Conditions</a></li>
                </ul>

            </div>

            <div>
                <h3 className='font-bold text-h6 text-gray2 mb-4'>Contact Us</h3>
                <p className='text-p-small text-gray1'>123 Healthly St, Wellness City, HC 12345</p>
                <p className='text-p-small text-gray1'>Email: info@healthly.com</p>   

            </div>
        </div>

        <p className="text-center text-gray-600">
          &copy; {new Date().getFullYear()} Healthly. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer