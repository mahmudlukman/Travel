"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TravelSchema = new mongoose_1.default.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    image: {
        public_id: String,
        url: String,
    },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
}, { timestamps: true });
const TravelModel = mongoose_1.default.model('Travel', TravelSchema);
exports.default = TravelModel;
