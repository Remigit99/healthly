import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
  console.log("Request Body:", req.body); // 👈 Check your terminal here!
  console.log("User from Auth:", req.user); // 👈 Ensure 'protect' middleware is working

  try {
    const { child, appointmentDate, reason, type } = req.body;

    if (!req.user?._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // 1. Check for scheduling conflicts for this specific child
    const conflict = await Appointment.findOne({
      child,
      appointmentDate,
      status: { $ne: "cancelled" },
    });

    if (conflict)
      return res.status(400).json({ message: "Duplicate booking detected." });

    // 2. Create the record
    const appointment = await Appointment.create({
      parent: req.user._id,
      child,
      appointmentDate,
      reason,
      type,
    });

    res.status(201).json({ status: "success", data: appointment });
  } catch (error) {
    console.error("Mongoose Error:", error.message);
    
    res.status(400).json({
      status: 'fail',
      message: error.message || "Invalid appointment data"
    });;
  }
};


// getAppointmentController.js
export const getMyAppointments = async (req, res) => {
  try {
    // Find all appointments where the parent is the logged-in user
    // We use .populate('child') to get the kid's name instead of just an ID
    const appointments = await Appointment.find({ parent: req.user._id })
      .populate('child', 'name age') 
      .sort({ appointmentDate: -1 }); // Show newest first

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments" });
  }
};
