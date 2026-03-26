import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'

const UserLayout = () => {
  return (
    <main>
        <Navbar />
        <Outlet />
    </main>
  )
}

export default UserLayout