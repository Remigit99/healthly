import { useState, useEffect } from "react";
import { useGetChildrenQuery } from "../../store/features/children/ChildrenApiSlice";

  // Local UI State
import AddChildForm from "../../components/services/AddChildForm";
import {
  UserPlus,
  ChevronRight,
  CheckCircle,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useBookAppointmentMutation } from "../../store/features/services/servicesApiSlice";

const formattedDate = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(new Date()); // This defaults to "Today"

const BookAppointment = () => {
  const { data, isLoading } = useGetChildrenQuery();
const [bookAppointment, { isLoading: isBooking }] = useBookAppointmentMutation();

  const [selectedChild, setSelectedChild] = useState(null);
  const [step, setStep] = useState(1); // 1: Select Child, 2: Select Slot, 3: Confirm
  const [isAddingNew, setIsAddingNew] = useState(false); // Toggle for "Add Another"
  const [bookingDetails, setBookingDetails] = useState({
    reason: "",
    type: "Physical", // Default value
    time: "",
  });

  const handleFinalConfirm = async () => {

    // 1. Safety check: make sure we have the critical data
  if (!selectedChild?._id || !bookingDetails.time || !bookingDetails.reason) {
    console.error("Missing booking data");
    return;
  }
    
    try {

      const payload = {
      child: selectedChild._id, // Must be the MongoDB ObjectId string
      appointmentDate: new Date().toISOString(), // Use ISO string for better compatibility
      time: bookingDetails.time,
      reason: bookingDetails.reason,
      type: bookingDetails.type || 'Physical',
    };

    console.log("Sending Payload:", payload); // Check this in your browser console!

      await bookAppointment(payload).unwrap();

      // Redirect or Success View
      setStep(4);
    } catch (err) {
      // Error handling logic
      console.error("Booking failed:", err);
    }
  };

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
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-xl shadow-slate-100/50 animate-in zoom-in-95 duration-300 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">
              Appointment Details
            </h2>
            <p className="text-slate-500 text-sm">
              Tell us more about the visit for {selectedChild.firstName}.
            </p>
          </div>

          {/* Section 1: Reason for Visit */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Reason for Consultation
            </label>
            <textarea
              required
              placeholder="e.g., Fever and cough for 2 days, or routine immunization"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white outline-none transition-all resize-none h-24"
              value={bookingDetails.reason}
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, reason: e.target.value })
              }
            />
          </div>

          {/* Section 2: Consultation Type */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1">
              How would you like to see the doctor?
            </label>
            <div className="grid grid-cols-2 gap-4">
              {["Physical", "Virtual"].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setBookingDetails({ ...bookingDetails, type: t })
                  }
                  className={`py-4 rounded-2xl font-bold border-2 transition-all ${
                    bookingDetails.type === t
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-md shadow-emerald-100"
                      : "border-slate-100 text-slate-500 hover:border-emerald-200"
                  }`}
                >
                  {t === "Physical" ? "🏥 Hospital Visit" : "💻 Online Video"}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Time Slots */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Select a Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM"].map((time) => (
                <button
                  key={time}
                  disabled={!bookingDetails.reason} // Disable until reason is typed
                  onClick={() => {
                    setBookingDetails({ ...bookingDetails, time });
                    setStep(3);
                  }}
                  className={`py-4 px-4 border-2 rounded-2xl font-bold transition-all ${
                    !bookingDetails.reason
                      ? "opacity-40 cursor-not-allowed bg-slate-50 border-slate-100"
                      : "border-slate-100 text-slate-700 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
            {!bookingDetails.reason && (
              <p className="text-[10px] text-amber-600 font-medium ml-1 italic">
                * Please provide a reason to unlock time slots
              </p>
            )}
          </div>

          <button
            onClick={() => setStep(1)}
            className="mt-4 text-slate-400 text-sm font-semibold hover:text-emerald-600 flex items-center transition-colors"
          >
            <ArrowLeft size={14} className="mr-2" /> Change Child
          </button>
        </div>
      )}

      {/* Step 3: Confirmation View */}
      {step === 3 && (
        <div className="max-w-xl mx-auto animate-in zoom-in-95 duration-300">
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-emerald-100/40 overflow-hidden">
            {/* Header Area */}
            <div className="bg-emerald-600 p-8 text-white text-center relative">
              <div className="absolute top-4 right-6 opacity-20">
                <CheckCircle size={80} />
              </div>
              <h2 className="text-2xl font-bold mb-1">Confirm Booking</h2>
              <p className="text-emerald-100 text-sm opacity-90">
                Review details for {selectedChild.firstName}'s visit
              </p>
            </div>

            <div className="p-8 space-y-6">
              {/* 1. Patient & Type Summary */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center font-bold text-lg mr-4">
                    {selectedChild.firstName[0]}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      Patient Profile
                    </p>
                    <h3 className="font-bold text-slate-800">
                      {selectedChild.firstName} {selectedChild.lastName}
                    </h3>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                    bookingDetails.type === "Physical"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {bookingDetails.type} Visit
                </div>
              </div>

              <hr className="border-slate-50" />

              {/* 2. Detail Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                    Date & Time
                  </p>
                  {/* No more hardcoded May 14! */}
                  <p className="text-sm font-bold text-slate-700">
                    {formattedDate}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium whitespace-nowrap">
                    at {bookingDetails.time} (WAT)
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">
                    Consultation
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Pediatric Care
                  </p>
                  <p className="text-xs text-slate-500">Healthly Services</p>
                </div>
              </div>

              {/* 3. Reason Summary (The New Addition) */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
                  Reason for Visit
                </p>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{bookingDetails.reason || "No specific reason provided"}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <button
                  disabled={isBooking}
                  onClick={handleFinalConfirm}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center justify-center space-x-2 active:scale-95"
                >
                  {isBooking ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" /> Processing...
                    </span>
                  ) : (
                    <span>Confirm & Book Appointment</span>
                  )}
                </button>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-slate-400 text-sm font-semibold hover:text-slate-600 transition-colors flex items-center justify-center"
                >
                  <ArrowLeft size={14} className="mr-2" /> Back to details
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-start space-x-3 px-4">
            <div className="mt-1 text-emerald-500">
              <CheckCircle size={14} />
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              By confirming, you authorize Healthly to share this medical reason
              with the attending physician. A reminder will be sent via SMS.
            </p>
          </div>
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
