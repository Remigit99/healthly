import { useState } from "react";
import { useAddChildMutation } from "../../store/features/children/ChildrenApiSlice";
import { Loader2, AlertCircle, Save } from "lucide-react";

const AddChildForm = () => {
  const [addChild, { isLoading, error }] = useAddChildMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    genotype: "",
    bloodGroup: "",
    allergies: "", // We'll split this string into an array before sending
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic: Convert comma-separated allergies into an array
      const submissionData = {
        ...formData,
        allergies: formData.allergies
          ? formData.allergies.split(",").map((a) => a.trim())
          : [],
      };

      await addChild(submissionData).unwrap();
      // RTK Query handles the UI update via 'invalidatesTags'
    } catch (err) {
      console.error("Failed to add child:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Child's Medical Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-600 ml-1">
              First Name
            </label>
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="Aishat"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-600 ml-1">
              Last Name
            </label>
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="Aderemi"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DOB */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-600 ml-1">
              Date of Birth
            </label>
            <input
              required
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-600 ml-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Genotype */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-600 ml-1">
              Genotype
            </label>
            <select
              name="genotype"
              value={formData.genotype}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">Unknown / Not Tested</option>{" "}
              {/* Default empty value */}
              {["AA", "AS", "SS", "AC", "SC"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Blood Group */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-semibold text-slate-600 ml-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none transition-all"
            >
              <option value="">Unknown / Not Tested</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Allergies */}
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold text-slate-600 ml-1">
            Allergies (Optional)
          </label>
          <textarea
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="e.g. Peanuts, Penicillin (separate with commas)"
            className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-emerald-500 outline-none h-24 resize-none transition-all"
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm">
            <AlertCircle size={16} />
            <span>
              {error.data?.message ||
                "Failed to save profile. Please check your data."}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-200 flex items-center justify-center space-x-2 active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Save size={20} />
          )}
          <span>
            {isLoading ? "Saving Profile..." : "Register Child & Continue"}
          </span>
        </button>
      </form>
    </div>
  );
};

export default AddChildForm;
