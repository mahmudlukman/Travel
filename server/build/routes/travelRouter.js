"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const travel_1 = require("../controllers/travel");
const auth_1 = require("../middleware/auth");
const travelRouter = (0, express_1.Router)();
travelRouter.post('/create', auth_1.isAuthenticated, travel_1.createTravel);
travelRouter.get('/search', travel_1.getTravelsBySearch);
travelRouter.get('/get-travels', travel_1.getAllTravels);
travelRouter.get('/get-travel/:id', travel_1.getTravel);
travelRouter.get('/creator', travel_1.getTravelsByCreator);
travelRouter.put('/update/:id', auth_1.isAuthenticated, travel_1.updateTravel);
travelRouter.delete('/delete/:id', auth_1.isAuthenticated, travel_1.deleteTravel);
travelRouter.put('/like/:id', auth_1.isAuthenticated, travel_1.likeTravel);
travelRouter.post('/comment/:id', auth_1.isAuthenticated, travel_1.commentTravel);
exports.default = travelRouter;
