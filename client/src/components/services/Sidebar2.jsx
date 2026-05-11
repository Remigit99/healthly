
import { NavLink, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import {
    LayoutDashboard, User, Calendar, FileText,
    Store, Bell, CreditCard, Settings, LogOut
} from 'lucide-react';
import { logOut } from '../../store/features/auth/authSlice';
import Logo from '../Logo';

const sidebarMenu = [
    { title: "Dashboard", icon: LayoutDashboard, path: "/app/parent" },
    { title: "Profile", icon: User, path: "/app/parent/profile" },
    { title: "Appointments", icon: Calendar, path: "/app/parent/my-appointments" },
    { title: "Records+", icon: FileText, path: "/app/parent/records" },
    { title: "Pharmacy", icon: Store, path: "/app/parent/pharmacy" },
    { title: "Notifications", icon: Bell, path: "/app/parent/notifications" },
    { title: "Payments", icon: CreditCard, path: "/app/parent/payments" },
    { title: "Settings", icon: Settings, path: "/app/parent/settings" },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    return (
        <aside className="bg-slate-50 w-20 md:w-64 flex flex-col h-screen border-r border-slate-200 sticky top-0 left-0 overflow-hidden">
            {/* Brand Logo */}
            <div className="p-6 mb-4">

                <Logo />

            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-2 h-full flex flex-col">
                    {sidebarMenu.map((item) => (
                        <li key={item.title}>
                            <NavLink
                                to={item.path}
                                end={item.path === "/app/parent"}
                                className={({ isActive }) => `
                  flex items-center gap-4 p-3 rounded-2xl transition-all group
                  ${isActive
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                        : 'text-slate-500 hover:bg-white hover:text-emerald-600'}
                `}
                            >
                                <item.icon size={22} className="shrink-0" />
                                <span className="hidden md:block font-bold tracking-tight">{item.title}</span>
                            </NavLink>
                        </li>
                    ))}

                    {/* Logout pushed to bottom */}
                    <li className="mt-auto pb-8">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-4 p-3 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all group"
                        >
                            <LogOut size={22} className="shrink-0" />
                            <span className="hidden md:block font-bold tracking-tight">Logout</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;