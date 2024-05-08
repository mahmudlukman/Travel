import { Router } from 'express';
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  getTravel,
  getTravelsByCreator,
  getTravelsBySearch,
  likeTravel,
  updateTravel,
} from '../controllers/travel';
import { isAuthenticated } from '../middleware/auth';

const travelRouter = Router();

travelRouter.post('/create', isAuthenticated, createTravel);
travelRouter.get('/search', getTravelsBySearch);
travelRouter.get('/get-travels', getAllTravels);
travelRouter.get('/get-travel/:id', getTravel);
travelRouter.get('/creator', getTravelsByCreator);
travelRouter.put('/update/:id', isAuthenticated, updateTravel);
travelRouter.delete('/delete/:id', isAuthenticated, deleteTravel);
travelRouter.put('/like/:id', isAuthenticated, likeTravel);

export default travelRouter;
