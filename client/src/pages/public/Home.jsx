import { Link } from "react-router";
import Header from "../../components/Header";
import MedDev from "/med_dev.svg";
import PedCon from "/pedcon.svg";
import MedServe from "/med_service.svg";
import OneTapBooking from "/booking_staff.png";
import CareLine from "/careline.png";
import Record from "/record.png";
import Prescribe from "/prescribe.png";
import DrEmily from "/dr_emily.png";
import DrMike from "/dr_mike.png";
import Subscribe from "/subscribe.png";
import Faqs from "../../components/Faqs";
import Footer from "../../components/Footer";

import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <Header />

      {/* WHY   CHOOSE HEALTHLY? */}
      <section>
        <div className="container mx-auto px-4 md:px-12 pt-8 pb-16">
          <h1 className="text-h4 font-semibold text-center my-12">
            Why Choose Healthly?
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="border p-6 rounded-md shadow-md flex flex-col justify-between">
              <div>
                <div>
                  <img src={PedCon} alt="icon" />
                  <h3 className="font-semibold my-3">Pediatric Consultation</h3>
                </div>

                <p className="font-accent mb-8 text-gray2">
                  Our certified pediatric specialists are ready to listen,
                  guide, and provide expert medical advice for your little one
                  making quality child care simple, safe, and accessible from
                  the comfort of your home.
                </p>
              </div>

              <div>
                <Link
                  className="text-amber-700 flex items-center hover:text-amber-500 transition duration-300"
                  to="/"
                >
                  <p className="font-semibold">Learn More</p>
                  <FaArrowRight className="inline ml-1" />
                </Link>
              </div>
            </article>

            <article className="border p-6 rounded-md shadow-md flex flex-col justify-between">
              <div>
                <div>
                  <img src={MedDev} alt="icon" />
                  <h3 className="font-semibold my-3">Medication Delivery</h3>
                </div>

                <p className="font-accent mb-8 text-gray2">
                  Skip the long queues and uncertainty. We partner with verified
                  pharmacies to ensure your prescriptions are delivered fast,
                  safe, and genuine. Your child’s health deserves only the best.
                </p>
              </div>

              <div>
                <Link
                  className="text-amber-700 flex items-center hover:text-amber-500 transition duration-300"
                  to="/"
                >
                  <p className="font-semibold">Learn More</p>
                  <FaArrowRight className="inline ml-1" />
                </Link>
              </div>
            </article>

            <article className="border p-6 rounded-md shadow-md flex flex-col justify-between">
              <div>
                <div>
                  <img src={MedServe} alt="icon" />
                  <h3 className="font-semibold my-3">Pediatric Consultation</h3>
                </div>

                <p className="font-accent mb-8 text-gray2">
                  Whether it’s follow-up visits, vaccination reminders, or
                  at-home checkups, our trusted healthcare professionals bring
                  expert care right to your doorstep.
                </p>
              </div>
              <div>
                <Link
                  className="text-amber-700 flex items-center hover:text-amber-500 transition duration-300"
                  to="/"
                >
                  <p className="font-semibold">Learn More</p>
                  <FaArrowRight className="inline ml-2" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section>
        <div className="container mx-auto px-4 md:px-12 pt-8 pb-16">
          <h1 className="text-h3 font-semibold text-center mb-12">
            Our Services
          </h1>

          {/* ONE TAP BOOKING */}
          <div className="md:flex md:items-center grid grid-cols-1 gap-12 md:justify-between ">
            <div>
              <h2 className="font-bold text-h4 text-gray2">One-Tap Booking</h2>
              <p className="font-accent my-6 text-gray1 text-p-small w-full  md:w-3/4">
                Book, reschedule, and manage appointments effortlessly
              </p>

              <button className="bg-amber-700  cursor-pointer text-white py-2 px-4 rounded-md hover:bg-amber-800 transition duration-300">
                Book Appointment
                <FaArrowRight className="inline ml-2" />
              </button>
            </div>

            <div>
              <img src={OneTapBooking} alt="One-Tap Booking" />
            </div>
          </div>

          {/* CARELINE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center my-24">
            <div>
              <img src={CareLine} alt="care_line" />
            </div>

            <div>
              <h2 className="font-bold text-h4 text-gray2">Careline</h2>
              <p className="font-accent my-3 text-gray1 text-p-small w-full  md:w-3/4">
                High-definition, encrypted video calls for secure consultations.
              </p>

              <button className="bg-amber-700  cursor-pointer text-white py-2 px-4 rounded-md hover:bg-amber-800 transition duration-300">
                Call Now
                   <FaArrowRight className="inline ml-2" />
              </button>
            </div>
          </div>

          {/* RECORD+ */}
          <div className="md:flex md:items-center grid grid-cols-1 gap-12 md:justify-between ">
            <div>
              <h2 className="font-bold text-h4 text-gray2">Record+</h2>
              <p className="font-accent my-6 text-gray1 text-p-small w-full  md:w-3/4">
                Secure access to your child's health records.
              </p>

              <button className="bg-amber-700  cursor-pointer text-white py-2 px-4 rounded-md hover:bg-amber-800 transition duration-300">
                Manage Record
                <FaArrowRight className="inline ml-2" />
              </button>
            </div>

            <div>
              <img src={Record} alt="Record_plus" />
            </div>
          </div>

          {/* PRESCRIBER PRO */}
          <div className="md:flex md:items-center grid grid-cols-1 gap-12 md:justify-between mt-24">
            <div>
              <img src={Prescribe} alt="prescribe" />
            </div>

            <div>
              <h2 className="font-bold text-h4 text-gray2">Prescriber Pro</h2>
              <p className="font-accent my-6 text-gray1 text-p-small w-full  md:w-3/4">
                Convenient prescription handling and renewals
              </p>

              <button className="bg-amber-700  cursor-pointer text-white py-2 px-4 rounded-md hover:bg-amber-800 transition duration-300">
                Get Care
                <FaArrowRight className="inline ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR PROVIDER */}
      <section>
        <div className="container mx-auto px-4 md:px-12 pt-8 pb-16">
          <h1 className="text-h4 md:text-h3 font-semibold text-center mt-9 mb-2">
            Meet Your Provider
          </h1>

          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div>
                <img src={DrEmily} alt="Dr. Emily Carter" />
              </div>

              <div>
                <h3 className="font-bold text-h5 text-gray2">
                  Dr. Emily Carter, MD
                </h3>
                <h4 className="font-bold text-h6 text-gray2">
                  Board-Certified Pediatrician | 10+ Years Experience
                </h4>
                <p className="font-accent my-6 text-gray1 text-p-small w-full  md:w-3/4">
                  Dr. Emily Carter is a board-certified pediatrician with over a
                  decade of experience caring for infants, toddlers, and young
                  children. She specializes in preventive care, childhood
                  immunizations, and early development, helping parents make
                  confident decisions about their child’s health.
                </p>

                <div className="py-3">
                  <p>⭐ 4.9 • 1,200+ consultations</p>
                  <p>🕒 Available Mon–Fri</p>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <div>
                <h3 className="font-bold text-h5 text-gray2">
                  Dr. Michael Thompson, MD, MPH
                </h3>
                <h4 className="font-bold text-h6 text-gray2">
                  Pediatric Telemedicine Specialist | 7+ Years Experience
                </h4>
                <p className="font-accent my-6 text-gray1 text-p-small w-full  md:w-3/4">
                  Dr. Michael Thompson combines clinical expertise with digital
                  healthcare delivery, providing reliable virtual pediatric care
                  for families. His focus areas include nutrition guidance,
                  common childhood illnesses, and follow-up care, with an
                  emphasis on clear communication and parent education.
                </p>

                <div className="py-2">
                  <p>⭐ 4.8 • 850+ consultations</p>
                  <p>🕒 Available Tue–Sat</p>
                </div>
              </div>

              <div>
                <img src={DrMike} alt="Dr. Emily Carter" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-green-950 text-white py-12">
        <div className="container mx-auto px-8 md:px-24 py-16 md:flex md:justify-between md:items-center">
          <div>
            <h3 className="text-h5 md:text-h4 font-bold ">
              Because Every Parent{" "}
            </h3>
            <h3 className="text-h5 md:text-h4 font-bold ">
              {" "}
              Deserves to Know More.
            </h3>
            <p className="text-p-small w-full md:w-3/4 mt-6 mb-8">
              Get expert health tips, parenting insights, and updates from our
              medical team
            </p>

            <div className="mt-4">
              <form className="flex gap-4 flex-col  md:flex-row">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="bg-white w-max rounded-md px-4 py-2 outline-0 placeholder:text-gray2 placeholder:font-accent"
                />
                <Link
                  className="bg-light-green rounded-md w-32 md:w-36 px-2 md:px-4 py-2"
                  to="/"
                >
                  Get Updated
                </Link>
              </form>
            </div>
          </div>

          <div className="hidden md:block">
            <img src={Subscribe} alt="newsletter" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <Faqs />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default Home;
