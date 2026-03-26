import HeroImg from "/hero_main_img.png"
import HeroSvg from "/hero_svg.svg"

const Header = () => {
  return (
    <header className="">

<div className="container mx-auto flex items-center justify-between py-12 px-12">
      <div className='relative'>
        <h1 className='font-semibold text-6xl mb-4'>Smart Care</h1>
        <h1 className='font-semibold text-6xl'>Warm Hearth</h1>

        <p className='text-gray-500 my-8 w-1/2'>Your health, our priority.
           Experience compassionate care and personalized wellness
            solutions with us.
            </p> 

            <div>
              <button className="px-4 py-2  bg-[#FF7F50] rounded-md text-white font-semibold hover:bg-[#FF6347] transition duration-300   ">
                <p>Book a Pediatrician</p>
            </button>
            </div>

            <img className="absolute -top-14 right-24" src={HeroSvg} alt="hero_svg" />
      </div>

      <div>
        <img className="" src={HeroImg} alt="Hero_Img" />
      </div>

      </div>
    </header>
  )
}

export default Header