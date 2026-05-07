import React, { useState } from 'react';
import { useGetChildrenQuery } from '../../store/features/children/ChildrenApiSlice';
import AddChildForm from '../../components/services/AddChildForm';
import { Calendar, UserPlus, ChevronRight, CheckCircle } from 'lucide-react';

const BookAppointment = () => {
  const { data, isLoading, isError } = useGetChildrenQuery();
  const [selectedChild, setSelectedChild] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Child, 2: Select Slot, 3: Confirm

  if (isLoading) return <div className="p-10 text-center">Loading family profiles...</div>;

  const children = data?.data || [];

  // LOGIC: If no children registered, force "Add Child" first
  if (children.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex items-center">
            <UserPlus className="text-blue-500 mr-3" />
            <p className="text-blue-700 font-medium">First Time Booking?</p>
          </div>
          <p className="text-blue-600 text-sm mt-1">
            Please register your child's medical profile first to ensure our doctors have the right context.
          </p>
        </div>
        <AddChildForm />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8">Book an Appointment</h1>

      {/* Progress Stepper */}
      <div className="flex items-center space-x-4 mb-10 overflow-x-auto pb-2">
        <StepIndicator num={1} label="Select Child" active={step === 1} completed={step > 1} />
        <ChevronRight size={16} className="text-slate-300" />
        <StepIndicator num={2} label="Pick Time" active={step === 2} completed={step > 2} />
        <ChevronRight size={16} className="text-slate-300" />
        <StepIndicator num={3} label="Confirm" active={step === 3} completed={false} />
      </div>

      {/* Step 1: Child Selection */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {children.map((child) => (
            <button
              key={child._id}
              onClick={() => {
                setSelectedChild(child);
                setStep(2);
              }}
              className={`flex items-center p-4 rounded-2xl border-2 transition-all text-left ${
                selectedChild?._id === child._id 
                ? 'border-emerald-500 bg-emerald-50 shadow-md' 
                : 'border-slate-100 hover:border-emerald-200 bg-white'
              }`}
            >
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold mr-4">
                {child.firstName[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{child.firstName} {child.lastName}</h3>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{child.genotype} | {child.gender}</p>
              </div>
              {selectedChild?._id === child._id && <CheckCircle className="text-emerald-500" />}
            </button>
          ))}
          
          <button 
            onClick={() => setStep(0)} // Toggle to show form
            className="flex items-center p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
          >
            <div className="h-12 w-12 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 mr-4">
              <UserPlus size={20} />
            </div>
            <span className="font-medium text-slate-500 group-hover:text-blue-600">Add Another Child</span>
          </button>
        </div>
      )}

      {/* Step 2: Calendar Slot Selection (Placeholder for now) */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-3xl border border-slate-100">
            <h2 className="text-lg font-bold mb-4">Available Slots for {selectedChild.firstName}</h2>
            <div className="grid grid-cols-3 gap-3">
                {['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM'].map(time => (
                    <button 
                        key={time}
                        onClick={() => setStep(3)}
                        className="py-3 px-4 border border-slate-200 rounded-xl hover:bg-emerald-500 hover:text-white transition-colors"
                    >
                        {time}
                    </button>
                ))}
            </div>
            <button onClick={() => setStep(1)} className="mt-6 text-slate-400 text-sm hover:underline">← Back to Child Selection</button>
        </div>
      )}
    </div>
  );
};

// Helper Component for the Stepper
const StepIndicator = ({ num, label, active, completed }) => (
  <div className={`flex items-center space-x-2 ${active ? 'opacity-100' : 'opacity-50'}`}>
    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
      completed ? 'bg-emerald-500 text-white' : active ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-500'
    }`}>
      {completed ? <CheckCircle size={16} /> : num}
    </div>
    <span className={`text-sm font-medium ${active ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
  </div>
);

export default BookAppointment;