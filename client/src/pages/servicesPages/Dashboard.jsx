// import DashboardMain from "../../components/services/DashboardMain"
// import Sidebar from "../../components/services/Sidebar"


// export const Dashboard = () => {
//   return (
//     <div className="grid grid-cols-[auto_1fr]">
//       <Sidebar/>
//       <DashboardMain/>
//     </div>
//   )
// }


import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Bell, Plus, Calendar, FileText, 
  ArrowRight, Activity, TrendingUp, MoreHorizontal 
} from 'lucide-react';
import { useGetParentDashboardQuery } from '../../store/features/services/servicesApiSlice';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetParentDashboardQuery();
  const [activeChildId, setActiveChildId] = useState(null);
  console.log("Dashboard Data:", data); // Debugging log to check the structure of the fetched data

  // loading state
  if (isLoading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading Command Center...</div>;

  const children = data?.children || [];
  const upcoming = data?.nextAppointment;
  const history = data?.visitHistory || [];
  
  // Logic to handle "Switching" context like in your reference Image 2
  const activeChild = activeChildId 
    ? children.find(c => c._id === activeChildId) 
    : children[0];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
      
      {/* HEADER SECTION (Inspiration: Image 1) */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
            Good morning, {data?.parentName || 'Patrick'}!
          </h1>
          <p className="text-slate-500 font-medium">Welcome to your family health overview.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search health records..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 w-64 transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </button>
          <button 
            onClick={() => navigate('book-appointment')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-200"
          >
            <Plus size={18} strokeWidth={3} /> <span className="hidden sm:inline">Book a Session</span>
          </button>
        </div>
      </header>

      {/* CHILD SELECTOR (Inspiration: Image 2 "Patient Profiles") */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-slate-700">Family Profiles</h2>
          <button className="text-sm font-bold text-emerald-600 flex items-center gap-1">See All <ArrowRight size={14}/></button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {children.map((child) => (
            <motion.div
              key={child._id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveChildId(child._id)}
              className={`shrink-0 cursor-pointer p-4 rounded-3xl border-2 transition-all flex items-center gap-4 min-w-45 ${
                activeChild?._id === child._id 
                ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' 
                : 'border-transparent bg-white shadow-sm hover:border-slate-200'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl uppercase">
                {child.name[0]}
              </div>
              <div>
                <p className="font-black text-slate-800 leading-none mb-1">{child.name}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{child.age} Years</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENTO GRID AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: UPCOMING & TRENDS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* UPCOMING APPOINTMENT (Inspiration: Image 1) */}
          <div className="bg-orange-50 rounded-4xl p-6 border border-orange-100 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-orange-800 font-black mb-4 flex items-center gap-2">
                <Calendar size={18} /> Upcoming Appointment
              </h3>
              {upcoming ? (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-500">
                       <Activity size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800">{upcoming.doctor}</h4>
                      <p className="text-slate-600 font-medium capitalize">{upcoming.child.name} • {upcoming.type || 'Consultation'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <p className="text-2xl font-black text-orange-600">{upcoming.time}</p>
                    <p className="text-orange-700/60 font-bold uppercase text-xs tracking-tighter">16th July, 2026</p>
                  </div>
                </div>
              ) : (
                <p className="text-orange-700/50 italic font-medium">No appointments scheduled.</p>
              )}
            </div>
            {/* Background Decoration */}
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <Calendar size={180} />
            </div>
          </div>

          {/* VISIT HISTORY (Inspiration: Image 2) */}
          <div className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-lg">Visit History</h3>
                <select className="bg-slate-50 border-none text-sm font-bold rounded-lg px-2 py-1 text-slate-500 focus:ring-0">
                    <option>Last 30 Days</option>
                </select>
            </div>
            <div className="space-y-4">
              {history.map((visit) => (
                <div key={visit._id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 tracking-tight">{visit.doctor || 'Pediatrician'}</p>
                      <p className="text-xs text-slate-400 font-medium">For {visit.child?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden md:block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full uppercase">Visited</span>
                    <button className="text-slate-300 group-hover:text-slate-600"><MoreHorizontal size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STATS & QUICK ACTIONS (Inspiration: Image 2 Patient Profiles Sidebar) */}
        <div className="space-y-6">
          <div className="bg-white rounded-4xl p-6 border border-slate-100 shadow-sm">
             <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto mb-4 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-slate-300">
                    <Activity size={48} />
                </div>
                <h4 className="text-xl font-black text-slate-800">{activeChild?.name || 'Select a Child'}</h4>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{activeChild?.gender || '--'}</p>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50/50 rounded-2xl">
                    <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Height</p>
                    <p className="text-lg font-black text-blue-700">110 <span className="text-xs">cm</span></p>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-2xl">
                    <p className="text-[10px] font-black text-emerald-400 uppercase mb-1">Weight</p>
                    <p className="text-lg font-black text-emerald-700">18 <span className="text-xs">kg</span></p>
                </div>
             </div>

             <div className="mt-6 p-4 border border-dashed border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold text-slate-500">Vaccination Progress</p>
                    <span className="text-xs font-black text-emerald-600">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[85%] rounded-full"></div>
                </div>
             </div>
          </div>

          {/* QUICK PROMO / HEALTH TIP (Inspiration: Image 2 "Stay on Track") */}
          <div className="bg-indigo-600 rounded-4xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
             <h3 className="text-lg font-bold mb-2 relative z-10">Records+ Premium</h3>
             <p className="text-indigo-100 text-sm mb-4 relative z-10 opacity-80">Get AI-powered health insights for your children.</p>
             <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-sm font-black relative z-10 hover:bg-indigo-50 transition-colors">
                Upgrade Now
             </button>
             <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                <TrendingUp size={120} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
