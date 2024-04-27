import { Router } from 'express';
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  getTravel,
  getTravelsByCreator,
  likeTravel,
  updateTravel,
} from '../controllers/travel';
import { isAuthenticated } from '../middleware/auth';

const travelRouter = Router();

travelRouter.post('/create', isAuthenticated, createTravel);
travelRouter.get('/get-travels', isAuthenticated, getAllTravels);
travelRouter.get('get-travel/:id', isAuthenticated, getTravel);
travelRouter.get('/creator', isAuthenticated, getTravelsByCreator);
travelRouter.put('update/:id', isAuthenticated, updateTravel);
travelRouter.delete('delete/:id', isAuthenticated, deleteTravel);
travelRouter.put('like/:id', isAuthenticated, likeTravel);

export default travelRouter;
