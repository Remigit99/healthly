import { motion } from "motion/react";
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const AppointmentSuccess = ({ appointmentData }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/app/parent/my-appointments');
    }, 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"
      >
        <CheckCircle size={52} strokeWidth={2.5} />
      </motion.div>

      {/* Success Text */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-extrabold text-slate-800 mb-2"
      >
        Appointment Booked!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-500 mb-8 max-w-xs"
      >
        Your session for <strong>{appointmentData.childName}</strong> has been confirmed.
      </motion.p>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-8 w-full max-w-sm flex items-center gap-4"
      >
        <div className="bg-white p-3 rounded-xl shadow-sm text-emerald-600">
          <Calendar size={20} />
        </div>
        <div className="text-left">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Date & Time</p>
          <p className="text-slate-700 font-medium">{appointmentData.time} | Today</p>
        </div>
      </motion.div>

      {/* Manual Redirect Button */}
      <motion.button
        whileHover={{ x: 5 }}
        onClick={() => navigate('/app/parent/my-appointments')}
        className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
      >
        Go to my appointments <ArrowRight size={16} />
      </motion.button>
    </div>
  );
};

export default AppointmentSuccess;