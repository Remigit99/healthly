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
        icon: <Tablets />
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
        <aside className='bg-[#f3f4f6] w-16 md:w-56 flex flex-col h-screen border-r border-slate-200 overflow-hidden'>
            <nav className="flex-1 flex flex-col min-h-0"> {/* min-h-0 prevents flex items from expanding beyond parent */}
                <ul className='px-2 md:px-4 flex flex-col h-full py-6'>
                    {sidebarMenu.map((item, index) => {
                        // const Icon = item.icon;
                        return (
                            <Link
                                to={item.path}
                                key={index}
                                className={`flex items-center gap-4 py-4 md:p-3 hover:bg-white hover:shadow-sm transition-all rounded-xl group ${index === sidebarMenu.length - 1 ? "mt-auto" : ""
                                    }`}
                            >
                                {/* <Icon size={22} className="shrink-0" /> */}
                                <span>{item.icon}</span>
                                <span className='hidden md:block truncate'>{item.title}</span>
                            </Link>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    )
}

export default Sidebar;