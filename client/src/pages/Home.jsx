import { Link } from 'react-router-dom'
import Header from '../components/Header'
import MedDev from "/med_dev.svg"
import PedCon from "/pedcon.svg"
import MedServe from "/med_service.svg"

const Home = () => {
  return (
    <>
    <Header/>

    <section>
        <div className='container mx-auto px-12'>
            <h1 className='text-4xl font-semibold text-center my-12'>Why Choose Healthly?</h1>

            <div className='grid grid-cols-3 gap-8'> 
                <article className='border p-6 rounded-md shadow-md'>
                    <img src={PedCon} alt="icon" />
                    <h3 className="font-semibold my-3">Pediatric Consultation</h3>

                    <p>
                    Our certified pediatric specialists are ready to listen, guide, and provide expert medical advice 
                    for your little one making quality child care simple, safe, and accessible from the comfort of your home.
                    </p>

                    <Link to="/"> Learn More </Link>



                </article>


                 <article className='border p-6 rounded-md shadow-md'>
                    <img src={MedDev} alt="icon" />
                    <h3 className="font-semibold my-3">Pediatric Consultation</h3>

                    <p>
                    Our certified pediatric specialists are ready to listen, guide, and provide expert medical advice 
                    for your little one making quality child care simple, safe, and accessible from the comfort of your home.
                    </p>

                    <Link to="/"> Learn More </Link>



                </article>


                 <article className=' p-6 rounded-md shadow-md'>
                    <img src={MedServe} alt="icon" />
                    <h3 className="font-semibold my-3">Pediatric Consultation</h3>

                    <p>
                    Our certified pediatric specialists are ready to listen, guide, and provide expert medical advice 
                    for your little one making quality child care simple, safe, and accessible from the comfort of your home.
                    </p>

                    <Link to="/"> Learn More </Link>



                </article>
            </div>
        </div>
    </section>
    </>
  )
}

export default Home