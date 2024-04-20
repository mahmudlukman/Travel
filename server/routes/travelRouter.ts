import { Router } from 'express';
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  getTravel,
  getTravelsByCreator,
  updateTravel,
} from '../controllers/travel';
import { isAuthenticated } from '../middleware/auth';

const travelRouter = Router();

travelRouter.post('/create', isAuthenticated, createTravel);
travelRouter.get('/', isAuthenticated, getAllTravels);
travelRouter.get('/:id', isAuthenticated, getTravel);
travelRouter.get('/creator', isAuthenticated, getTravelsByCreator);
travelRouter.put('/:id', isAuthenticated, updateTravel);
travelRouter.delete('/:id', isAuthenticated, deleteTravel);

export default travelRouter;
