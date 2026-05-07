import Appointment from "../models/appointment.model.js";

export const createAppointment = async (req, res) => {
  console.log("Request Body:", req.body); // 👈 Check your terminal here!
  console.log("User from Auth:", req.user); // 👈 Ensure 'protect' middleware is working

  try {
    const { child, appointmentDate, reason, type } = req.body;

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
    res.status(400).json({ status: "fail", message: error.message });
  }
};
