"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
}, { timestamps: true });
// Hash Password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
// sign access token
UserSchema.methods.SignAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
        expiresIn: "7d",
    });
};
// compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
