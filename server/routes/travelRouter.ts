import { Router } from 'express';
import { createTravel, getAllTravels, getTravel, getTravelsByCreator } from '../controllers/travel';
import { isAuthenticated } from '../middleware/auth';

const travelRouter = Router();

travelRouter.post('/create', isAuthenticated, createTravel);
travelRouter.get('/', isAuthenticated, getAllTravels);
travelRouter.get('/:id', isAuthenticated, getTravel);
travelRouter.get('/creator', isAuthenticated, getTravelsByCreator);

export default travelRouter;
