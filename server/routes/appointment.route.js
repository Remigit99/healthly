import {Router} from 'express';
import { createAppointment,getMyAppointments } from '../controller/appointment.controller.js';
import {protect} from '../middleware/auth.middleware.js';

export const appointmentRouter = Router();

appointmentRouter.use(protect); // All appointment routes need a token

appointmentRouter.post('/', createAppointment);
appointmentRouter.get('/my-appointments', getMyAppointments);

