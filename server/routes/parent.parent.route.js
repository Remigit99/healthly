import {Router} from 'express';
const router = Router();

import { getParentDashboard } from '../controller/dashboard.controller.js';
import {protect} from '../middleware/auth.middleware.js';

// This is the endpoint the dashboard will call
router.get('/parent-dashboard', protect, getParentDashboard);

export default router;