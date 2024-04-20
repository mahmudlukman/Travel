import { Router } from 'express';
import { createTravel } from '../controllers/travel';
import { isAuthenticated } from '../middleware/auth';

const travelRouter = Router();

travelRouter.post('/create', isAuthenticated, createTravel);

export default travelRouter;
