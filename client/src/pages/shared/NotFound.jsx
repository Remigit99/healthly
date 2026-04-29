import { Link } from 'react-router'
import PageNotFound from '/notfound.jpg'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-2 bg-amber-50'>
        <img className='w-1/4 h-1/4' src={PageNotFound} alt="page not found" />
        <h2 className='text-h3 font-semibold text-center mt-4'>Page Not Found</h2>
        <p className='text-p-small text-gray1 text-center mt-2'>The page you are looking for does not exist.</p>
        <Link to="/" className='text-green1 font-semibold text-center mt-4 block hover:underline hover:text-[#007CFF]'>Go Back Home</Link>   
    </div>
  )
}

export default NotFound