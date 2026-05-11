import Child from '../models/child.model.js';
import Appointment from '../models/appointment.model.js';


export const getParentDashboard = async (req, res) => {
  try {
    const parentId = req.user._id;

    // 1. Get all children for this parent
    const children = await Child.find({ parent: parentId });

    // 2. Get the NEXT upcoming appointment (for the "Upcoming" card)
    const nextAppointment = await Appointment.findOne({
      parent: parentId,
      appointmentDate: { $gte: new Date() },
      status: 'scheduled'
    })
    .populate('child', 'name') // Get the kid's name too
    .sort({ appointmentDate: 1 });

    // 3. Get the "Visit History" (last 3 completed sessions)
    const recentVisits = await Appointment.find({
      parent: parentId,
      appointmentDate: { $lt: new Date() }
    })
    .populate('child', 'name')
    .sort({ appointmentDate: -1 })
    .limit(3);

    // 4. Aggregate some "Stats" (e.g., total children, total visits this year)
    const stats = {
      totalChildren: children.length,
      upcomingCount: await Appointment.countDocuments({ parent: parentId, appointmentDate: { $gte: new Date() } })
    };

    res.status(200).json({
      children,
      nextAppointment,
      recentVisits,
      stats
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: Dashboard fetch failed", error: error.message });
  }
};