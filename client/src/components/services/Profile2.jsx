import React, { useState } from 'react';
import {useNavigate} from 'react-router';
import { motion } from 'motion/react';
import { Camera, User, Mail, Phone, MapPin, ShieldCheck, CreditCard, Edit3, Save, Baby } from 'lucide-react';
import { selectSelectedChildId, selectCurrentUser } from '../../store/features/auth/authSlice';
import { useSelector } from 'react-redux';
import { useGetParentDashboardQuery } from '../../store/features/services/servicesApiSlice';

const Profile = () => {
  const {isLoading, data: parentDashboardData } = useGetParentDashboardQuery();
  const [isEditing, setIsEditing] = useState(false);

//   console.log("Parent Dashboard Data in Profile:", parentDashboardData); // Debugging log to check the structure of the fetched data

  // Use your custom selectors here
  const user = useSelector(selectCurrentUser);
  const selectedChildId = useSelector(selectSelectedChildId);

  const navigate = useNavigate();
  // Find the currently selected child from the dashboard data
  const activeChild = parentDashboardData?.children?.find(c => c._id === selectedChildId) 
                     || parentDashboardData?.children?.[0];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* 1. IDENTITY HEADER */}
      <div className="bg-white rounded-4xl border border-slate-100 p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-2xl">
            {user?.firstName?.[0]}{user?.lastName?.[0]}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">{user?.firstName} {user?.lastName}</h1>
            <p className="text-slate-500 font-bold">Guardian Account • {parentDashboardData?.children?.length} Children</p>
          </div>
        </div>
        <button onClick={() => setIsEditing(!isEditing)} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2">
          {isEditing ? <Save size={18}/> : <Edit3 size={18}/>}
          {isEditing ? "Save Profile" : "Edit Details"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 2. PARENT SETTINGS */}
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl border border-slate-100 space-y-6">
          <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">Personal Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <InfoBox label="First Name" value={user?.firstName} isEditing={isEditing} />
             <InfoBox label="Last Name" value={user?.lastName} isEditing={isEditing} />
             <InfoBox label="Email" value={user?.email} isEditing={isEditing} />
             <InfoBox label="Phone" value={user?.phone || "Add Phone Number"} isEditing={isEditing} />
          </div>
        </div>

        {/* 3. ACTIVE CHILD CONTEXT (The "Reacting" Part) */}
        <div className="space-y-6">
          <div className="bg-emerald-600 rounded-4xl p-8 text-white shadow-xl shadow-emerald-100">
            <div className="flex justify-between items-start mb-6">
               <Baby size={32} className="opacity-80" />
               <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active Context</span>
            </div>
            <h3 className="text-xl font-black mb-1">{activeChild?.firstName} {activeChild?.lastName}</h3>
            <p className="text-emerald-100 font-bold text-sm mb-6">{activeChild?.age} Years Old • {activeChild?.gender}</p>
            
            <div className="space-y-3">
               <div className="flex justify-between text-xs font-bold border-b border-emerald-500/50 pb-2">
                  <span>Blood Group</span>
                  <span className="font-black">{activeChild?.bloodGroup || 'N/A'}</span>
               </div>
               <div className="flex justify-between text-xs font-bold border-b border-emerald-500/50 pb-2">
                  <span>Genotype</span>
                  <span className="font-black">{activeChild?.genotype || 'N/A'}</span>
               </div>
            </div>
            
            <button 
               onClick={() => navigate('/app/parent')} // Send back to dashboard to switch child
               className="mt-6 w-full bg-white text-emerald-600 py-3 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-colors"
            >
               Switch Child
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for clean inputs
const InfoBox = ({ label, value, isEditing }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      disabled={!isEditing}
      defaultValue={value}
      className="w-full bg-slate-50 border-none rounded-2xl p-4 text-slate-800 font-bold focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-70 transition-all"
    />
  </div>
);



export default Profile;