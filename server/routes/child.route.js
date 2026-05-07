import {Router} from 'express';
import { addChild, getChildren } from '../controller/child.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import   {restrictTo}  from '../middleware/restrictTo.middleware.js';

const childrenRouter = Router();

// All child routes require a logged-in user
childrenRouter.use(protect);

childrenRouter
  .route('/')
  .get(getChildren) // Both parents and doctors might need to see children
  .post(restrictTo('parent'), addChild); // ONLY parents can register new children

export default childrenRouter;