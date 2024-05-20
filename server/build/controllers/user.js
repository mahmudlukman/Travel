"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = exports.logout = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jwt_1 = require("../utils/jwt");
const tryCatch_1 = __importDefault(require("./utils/tryCatch"));
exports.register = (0, tryCatch_1.default)(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const oldUser = await User_1.default.findOne({ email });
    if (oldUser) {
        return next(new errorHandler_1.default('Email already exist', 400));
    }
    const user = await User_1.default.create({
        name: `${firstName} ${lastName}`,
        email,
        password,
    });
    res.status(201).json({ success: true, user });
});
exports.login = (0, tryCatch_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler_1.default('Please enter email and password', 400));
    }
    const user = await User_1.default.findOne({ email }).select('+password');
    if (!user) {
        return next(new errorHandler_1.default('Invalid credentials', 400));
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new errorHandler_1.default('Invalid credentials', 400));
    }
    (0, jwt_1.sendToken)(user, 200, res);
});
exports.logout = (0, tryCatch_1.default)(async (req, res, next) => {
    res.cookie('access_token', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'none',
        secure: true,
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
});
// get user info
exports.getUserInfo = (0, tryCatch_1.default)(async (req, res, next) => {
    const userId = req.user?._id;
    const user = await User_1.default.findById(userId);
    res.status(200).json({ success: true, user });
});
