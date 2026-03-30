import HeroImg from "/hero_main_img.png";
import HeroSvg from "/doll2.png";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
    <Navbar/>
    <header className="">
      <div className="container mx-auto flex flex-col gap-16 md:items-center md:grid md:grid-cols-2 md:gap-8 lg:gap-24 py-12 px-4 md:px-12">
        <div className="relative">
          <h1 className="font-semibold text-h2 md:text-h1">Smart Care</h1>
          <h1 className="font-semibold text-h2 md:text-h1">Warm Hearth</h1>

          <p className="text-gray2 text-p my-8 w-full md:w-full font-accent">
            Your health, our priority. Experience compassionate care and
            personalized wellness solutions with us.
          </p>

          <div>
            <button className="px-4 py-2  bg-[#FF7F50] rounded-md text-white font-semibold hover:bg-[#FF6347] transition duration-300   ">
              <p>Book a Pediatrician</p>
            </button>
          </div>

          <img
            className="absolute -top-14 right-24"
            src={HeroSvg}
            alt="hero_svg"
          />
        </div>

        <div>
          <img className="" src={HeroImg} alt="Hero_Img" />
        </div>
      </div>
    </header>

    </>
  );
};

export default Header;
