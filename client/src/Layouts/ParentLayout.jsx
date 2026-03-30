import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'

const ParentLayout = () => {
  return (
    <main>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default ParentLayout