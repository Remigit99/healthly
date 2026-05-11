import { LayoutDashboard, CircleUser, CalendarDays, SquareLibrary, Bell, CreditCard, Settings, LogOut, Tablets } from 'lucide-react';
import { Link } from 'react-router';

const sidebarMenu = [
    {
        title: 'Dashboard',
        icon: <LayoutDashboard />
    },
    {
        title: 'Profile',
        icon: <CircleUser />
    },
    {
        title: 'Appointments',
        icon: <CalendarDays />
    },
    {
        title: 'Record+',
        icon: <SquareLibrary />
    },
    {
        title: 'Pharmacy',
        icon: <Tablets/>
    },
    {
        title: 'Notifications',
        icon: <Bell />
    },
    {
        title: 'Payment',
        icon: <CreditCard />
    },
    {
        title: 'Settings',
        icon: <Settings />
    },
    {
        title: 'Logout',
        icon: <LogOut />
    }

];

const Sidebar = () => {
    return (
        <aside className='bg-[#f3f4f6] max-w-16 md:max-w-56 flex flex-col h-full py-3 md:py-6 overflow-hidden'>
            <nav className="flex-1 flex flex-col">
                <ul className='px-2 md:px-4 flex flex-col h-full min-h-0'>
                    {sidebarMenu.map((item, index) => (
                        <Link to={item.path} key={index} className={`flex items-center gap-4 py-4 md:p-2 hover:bg-amber-50 hover:translate-x-2 transition-transform duration-500 rounded-md ${index === sidebarMenu.length - 1 ? "mt-auto" : ""}`}>
                            <span>{item.icon}</span>
                            <span className='hidden md:block'>{item.title}</span>
                        </Link>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar