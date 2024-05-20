"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const tryCatch_1 = __importDefault(require("../controllers/utils/tryCatch"));
const User_1 = __importDefault(require("../models/User"));
// authenticated user
exports.isAuthenticated = (0, tryCatch_1.default)(async (req, res, next) => {
    const access_token = req.cookies.access_token;
    if (!access_token) {
        return next(new errorHandler_1.default('Please login to access this resources', 400));
    }
    const decoded = jsonwebtoken_1.default.verify(access_token, process.env.ACCESS_TOKEN);
    if (!decoded) {
        return next(new errorHandler_1.default('Access token is not valid', 400));
    }
    req.user = await User_1.default.findById(decoded.id);
    next();
});
