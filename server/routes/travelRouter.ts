import { Router } from 'express';
import { createTravel, getAllTravels } from '../controllers/travel';
import { isAuthenticated } from '../middleware/auth';

const travelRouter = Router();

travelRouter.post('/create', isAuthenticated, createTravel);
travelRouter.get('/', isAuthenticated, getAllTravels);

export default travelRouter;
