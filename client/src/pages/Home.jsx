import { Link } from "react-router-dom";
import Header from "../components/Header";
import MedDev from "/med_dev.svg";
import PedCon from "/pedcon.svg";
import MedServe from "/med_service.svg";
import OneTapBooking from "/booking_staff.png";
import CareLine from "/careline.png";
import Record from "/record.png";
import Prescribe from "/prescribe.png";
import DrEmily from "/dr_emily.png";
import DrMike from "/dr_mike.png";
import Subscribe from "/subscribe.png"

const Home = () => {
  return (
    <>
      <Header />

      {/* WHY   CHOOSE HEALTHLY? */}
      <section>
        <div className="container mx-auto px-12 pt-8 pb-16">
          <h1 className="text-4xl font-semibold text-center my-12">
            Why Choose Healthly?
          </h1>

          <div className="grid grid-cols-3 gap-8">
            <article className="border p-6 rounded-md shadow-md">
              <img src={PedCon} alt="icon" />
              <h3 className="font-semibold my-3">Pediatric Consultation</h3>

              <p className="font-accent mb-8 text-gray2">
                Our certified pediatric specialists are ready to listen, guide,
                and provide expert medical advice for your little one making
                quality child care simple, safe, and accessible from the comfort
                of your home.
              </p>

              <Link className="text-amber-700" to="/">
                {" "}
                Learn More{" "}
              </Link>
            </article>

            <article className="border p-6 rounded-md shadow-md">
              <img src={MedDev} alt="icon" />
              <h3 className="font-semibold my-3">Medication Delivery</h3>

              <p className="font-accent mb-8 text-gray2">
                Skip the long queues and uncertainty. We partner with verified
                pharmacies to ensure your prescriptions are delivered fast,
                safe, and genuine. Your child’s health deserves only the best.
              </p>

              <Link className="text-amber-700" to="/">
                {" "}
                Learn More{" "}
              </Link>
            </article>

            <article className="border p-6 rounded-md shadow-md">
              <img src={MedServe} alt="icon" />
              <h3 className="font-semibold my-3">Pediatric Consultation</h3>

              <p className="font-accent mb-8 text-gray2">
                Whether it’s follow-up visits, vaccination reminders, or at-home
                checkups, our trusted healthcare professionals bring expert care
                right to your doorstep.
              </p>
              <Link className="text-amber-700" to="/">
                {" "}
                Learn More{" "}
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section>
        <div className="container mx-auto px-12 pt-8 pb-16">
          <h1 className="text-h3 font-semibold text-center my-12">
            Our Services
          </h1>

          {/* ONE TAP BOOKING */}
          <div className="flex items-center justify-between my-32">
            <div>
              <h2 className="font-bold text-h4 text-gray2">One-Tap Booking</h2>
              <p className="font-accent my-6 text-gray1 text-p w-3/4">
                Book, reschedule, and manage appointments effortlessly
              </p>

              <button className="bg-amber-700  text-white py-2 px-4 rounded-md hover:bg-amber-800">
                Book Appointment
              </button>
            </div>

            <div>
              <img src={OneTapBooking} alt="One-Tap Booking" />
            </div>
          </div>

          {/* CARELINE */}
          <div className="grid grid-cols-2 gap-24 items-center my-32">
            <div>
              <img src={CareLine} alt="care_line" />
            </div>

            <div>
              <h2 className="font-bold text-h4 text-gray2">Careline</h2>
              <p className="font-accent my-6 text-gray1 text-p w-3/4">
                High-definition, encrypted video calls for secure consultations.
              </p>

              <button className="bg-amber-700  text-white py-2 px-4 rounded-md hover:bg-amber-800">
                Call Now
              </button>
            </div>
          </div>

          {/* RECORD+ */}
          <div className="flex items-center justify-between my-32">
            <div>
              <h2 className="font-bold text-h4 text-gray2">Record+</h2>
              <p className="font-accent my-6 text-gray1 text-p w-3/4">
                Secure access to your child's health records.
              </p>

              <button className="bg-amber-700  text-white py-2 px-4 rounded-md hover:bg-amber-800">
                Manage Record
              </button>
            </div>

            <div>
              <img src={Record} alt="Record_plus" />
            </div>
          </div>

          {/* PRESCRIBER PRO */}
          <div className="flex items-center justify-between my-32">
            <div>
              <img src={Prescribe} alt="prescribe" />
            </div>

            <div>
              <h2 className="font-bold text-h4 text-gray2">Prescriber Pro</h2>
              <p className="font-accent my-6 text-gray1 text-p w-3/4">
                Convenient prescription handling and renewals
              </p>

              <button className="bg-amber-700  text-white py-2 px-4 rounded-md hover:bg-amber-800">
                Get Care
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR PROVIDER */}
      <section>
        <div className="container mx-auto px-12 pt-8 pb-16">
          <h1 className="text-h3 font-semibold text-center my-9">
            Meet Your Provider
          </h1>

          <div className="py-20">
            <div className="grid grid-cols-2 gap-24 items-center">
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
                <p className="font-accent my-6 text-gray1 text-p-small w-3/4">
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
            <div className="grid grid-cols-2 gap-24 items-center">
              <div>
                <h3 className="font-bold text-h5 text-gray2">
                  Dr. Michael Thompson, MD, MPH
                </h3>
                <h4 className="font-bold text-h6 text-gray2">
                  Pediatric Telemedicine Specialist | 7+ Years Experience
                </h4>
                <p className="font-accent my-6 text-gray1 text-p-small  w-3/4">
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
        <div className="container mx-auto px-24 py-16 flex justify-between items-center">
          <div>
            <h3 className="text-h4 font-bold ">Because Every Parent </h3>
            <h3 className="text-h4 font-bold "> Deserves to Know More.</h3>
            <p className="text-p-small w-3/4 mt-6 mb-8">
              Get expert health tips, parenting insights, and updates from our
              medical team
            </p>

            <div className="mt-4">
              <form className="flex gap-4 items-center">
                <input type="email" placeholder="Enter Your Email Address" className="bg-white w-max rounded-md px-4 py-2 outline-0 placeholder:text-gray2 placeholder:font-accent"/>
              <Link className="bg-light-green rounded-md px-4 py-2" to="/">Get Updated</Link>
              </form>
            </div>
          </div>

          <div>
          <img src={Subscribe} alt="newsletter" />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section>
        <div className="container mx-auto px-24 py-16">
          <h1>Frequently Asked Questions</h1>

          <div>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
