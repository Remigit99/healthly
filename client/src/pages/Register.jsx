import { Link } from 'react-router'
import RegisterBackground from '/signup_img.png'

const Register = () => {
  return (
    <div className='grid grid-cols-2 gap-8  '>
        <div>
            <img src={RegisterBackground} alt="Register Background" className="w-full h-screen object-cover" />
        </div>

        <div className='pt-12'>
            <h2 className='text-h4 font-semibold text-center'>Register</h2>
            <p className='text-accent text-gray1 text-p-small mt-6 mb-12'>
                 Join EchoMed and Experience Pediatric Care like never before.
            </p>

            <div>
                <form className='flex flex-col gap-6'>
                    <input type="text" name="firstName" id="" placeholder='First Name' autoFocus className='px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-3/4 outline-0 border border-gray1'/>
                    <input type="text" name="lastName" id="" placeholder='Last Name' className='px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-3/4 outline-0 border border-gray1'/>
                    <input type="email" name="email" id="" placeholder='Email' className='px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-3/4 outline-0 border border-gray1'/>
                    <input type="password" name="password" id="" placeholder='Password' className='px-1 focus:border-green1 placeholder:text-accent placeholder:text-gray1 rounded  py-2 w-3/4 outline-0 border border-gray1'/>

                    <button type='submit' className='my-6 cursor-pointer w-48 font-bold bg-orange5 text-white rounded px-4 py-2 hover:bg-orange3'>Register</button>
                </form>

                <div>
                    <p className='text-p-small text-gray1'>Already have an account? <Link to="/login" className='text-green1 font-semibold cursor-pointer hover:underline'>Login</Link></p> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register