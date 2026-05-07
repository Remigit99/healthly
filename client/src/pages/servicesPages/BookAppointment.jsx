import { useState, useEffect } from "react";
import { useGetChildrenQuery } from "../../store/features/children/ChildrenApiSlice";
import AddChildForm from "../../components/services/AddChildForm";
import {Calendar, UserPlus, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";

const BookAppointment = () => {
  const { data, isLoading } = useGetChildrenQuery();
  const [selectedChild, setSelectedChild] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Child, 2: Select Slot, 3: Confirm
  const [isAddingNew, setIsAddingNew] = useState(false); // Toggle for "Add Another"

  const children = data?.data || [];

  // Automatically reset the 'Adding New' toggle once a child is successfully added
  useEffect(() => {
    if (children.length > 0) {
      setIsAddingNew(false);
    }
  }, [children.length]);

  if (isLoading)
    return (
      <div className="p-10 text-center font-medium text-emerald-600">
        Loading family profiles...
      </div>
    );

  // VIEW 1: Forced AddChildForm if user has zero children
  if (children.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-xl">
          <div className="flex items-center">
            <UserPlus className="text-blue-500 mr-3" />
            <p className="text-blue-700 font-medium">First Time Booking?</p>
          </div>
          <p className="text-blue-600 text-sm mt-1">
            Please register your child's medical profile first to ensure our
            doctors have the right context.
          </p>
        </div>
        <AddChildForm />
      </div>
    );
  }

  // VIEW 2: Temporary view when an existing parent wants to "Add Another"
  if (isAddingNew) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button
          onClick={() => setIsAddingNew(false)}
          className="flex items-center text-emerald-600 font-medium mb-6 hover:underline transition-all"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to child selection
        </button>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            Add Another Profile
          </h1>
          <p className="text-slate-500">
            Fill in the details for your other child.
          </p>
        </div>
        {/* Pass a success callback if you want the form to close itself */}
        <AddChildForm onSuccess={() => setIsAddingNew(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 tracking-tight">
        Book an Appointment
      </h1>

      {/* Progress Stepper */}
      <div className="flex items-center space-x-4 mb-10 overflow-x-auto pb-2">
        <StepIndicator
          num={1}
          label="Select Child"
          active={step === 1}
          completed={step > 1}
        />
        <ChevronRight size={16} className="text-slate-300" />
        <StepIndicator
          num={2}
          label="Pick Time"
          active={step === 2}
          completed={step > 2}
        />
        <ChevronRight size={16} className="text-slate-300" />
        <StepIndicator
          num={3}
          label="Confirm"
          active={step === 3}
          completed={false}
        />
      </div>

      {/* Step 1: Child Selection */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children.map((child) => (
            <button
              key={child._id}
              onClick={() => {
                setSelectedChild(child);
                setStep(2);
              }}
              className={`flex items-center p-5 rounded-3xl border-2 transition-all text-left group shadow-sm ${
                selectedChild?._id === child._id
                  ? "border-emerald-500 bg-emerald-50 shadow-emerald-100 shadow-lg"
                  : "border-slate-100 hover:border-emerald-200 bg-white hover:shadow-md"
              }`}
            >
              <div
                className={`h-12 w-12 rounded-2xl flex items-center justify-center font-bold mr-4 transition-colors ${
                  selectedChild?._id === child._id
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white"
                }`}
              >
                {child.firstName[0]}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800">
                  {child.firstName} {child.lastName}
                </h3>
                <p className="text-xs text-slate-500 uppercase font-semibold tracking-widest">
                  {child.genotype || "Unknown"} • {child.gender}
                </p>
              </div>
              {selectedChild?._id === child._id ? (
                <CheckCircle className="text-emerald-600" />
              ) : (
                <ChevronRight
                  className="text-slate-300 group-hover:text-emerald-400"
                  size={20}
                />
              )}
            </button>
          ))}

          <button
            onClick={() => setIsAddingNew(true)}
            className="flex items-center p-5 rounded-3xl border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left group"
          >
            <div className="h-12 w-12 rounded-2xl bg-slate-50 group-hover:bg-emerald-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 mr-4">
              <UserPlus size={22} />
            </div>
            <span className="font-bold text-slate-600 group-hover:text-emerald-700">
              Add Another Child
            </span>
          </button>
        </div>
      )}

      {/* Step 2: Calendar Slot Selection */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 animate-in zoom-in-95 duration-300">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Available Slots for {selectedChild.firstName}
          </h2>
          <p className="text-slate-500 mb-6 text-sm">
            Select a convenient time for the pediatric consultation.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"].map((time) => (
              <button
                key={time}
                onClick={() => setStep(3)}
                className="py-4 px-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-200 transition-all"
              >
                {time}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="mt-8 text-slate-400 text-sm font-semibold hover:text-emerald-600 flex items-center transition-colors"
          >
            <ArrowLeft size={14} className="mr-2" /> Change Child
          </button>
        </div>
      )}

      {/* Step 3: Confirmation View */}
      {step === 3 && (
        <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-emerald-100/50 overflow-hidden">
            {/* Header Summary */}
            <div className="bg-emerald-600 p-8 text-white text-center">
              <div className="h-20 w-20 bg-white/20 backdrop-blur-md rounded-3xl mx-auto mb-4 flex items-center justify-center">
                <Calendar size={40} />
              </div>
              <h2 className="text-2xl font-bold">Confirm Appointment</h2>
              <p className="text-emerald-100 opacity-90">
                Almost done! Review the details below.
              </p>
            </div>

            <div className="p-8 space-y-6">
              {/* Child Summary */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold mr-3">
                    {selectedChild.firstName[0]}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Patient
                    </p>
                    <p className="font-bold text-slate-800">
                      {selectedChild.firstName} {selectedChild.lastName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-emerald-600 text-xs font-bold hover:underline"
                >
                  Edit
                </button>
              </div>

              {/* Appointment Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Date & Time
                    </p>
                    <p className="font-semibold text-slate-800">
                      Thursday, May 14, 2026
                    </p>
                    <p className="text-slate-500 text-sm">at 10:30 AM (WAT)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="mt-1 p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Service
                    </p>
                    <p className="font-semibold text-slate-800">
                      General Pediatric Consultation
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Final Action */}
              <div className="pt-2">
                <button
                  onClick={() => alert("Booking Confirmed!")} // We will replace this with a mutation later
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 flex items-center justify-center"
                >
                  Confirm & Schedule Appointment
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-3 text-slate-400 text-sm font-semibold hover:text-slate-600 transition-colors"
                >
                  Cancel and go back
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs mt-6 px-10">
            By confirming, you agree to Healthly's terms of service. A
            confirmation SMS will be sent to your registered Nigerian number.
          </p>
        </div>
      )}
    </div>
  );
};

const StepIndicator = ({ num, label, active, completed }) => (
  <div
    className={`flex items-center space-x-2 transition-all duration-300 ${active ? "opacity-100 scale-105" : "opacity-50"}`}
  >
    <div
      className={`h-9 w-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
        completed
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
          : active
            ? "bg-slate-800 text-white shadow-lg shadow-slate-200"
            : "bg-slate-100 text-slate-400"
      }`}
    >
      {completed ? <CheckCircle size={18} /> : num}
    </div>
    <span
      className={`text-sm font-bold whitespace-nowrap ${active ? "text-slate-800" : "text-slate-500"}`}
    >
      {label}
    </span>
  </div>
);

export default BookAppointment;
