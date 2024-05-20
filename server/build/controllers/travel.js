"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentTravel = exports.likeTravel = exports.updateTravel = exports.deleteTravel = exports.getTravelsByCreator = exports.getTravelsBySearch = exports.getTravel = exports.getAllTravels = exports.createTravel = void 0;
const tryCatch_1 = __importDefault(require("./utils/tryCatch"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const Travel_1 = __importDefault(require("../models/Travel"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createTravel = (0, tryCatch_1.default)(async (req, res, next) => {
    const data = req.body;
    const image = data.image;
    if (image) {
        const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
            folder: 'travel',
        });
        data.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    const travel = await Travel_1.default.create({
        ...data,
        creator: req.user?.name,
    });
    res.status(201).json({ success: true, travel });
});
exports.getAllTravels = (0, tryCatch_1.default)(async (req, res, next) => {
    const { page } = req.query;
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    const total = await Travel_1.default.countDocuments({});
    const travels = await Travel_1.default.find()
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);
    res.status(200).json({
        success: true,
        data: travels,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
    });
});
exports.getTravel = (0, tryCatch_1.default)(async (req, res, next) => {
    const travelId = req.params.id;
    const travel = (await Travel_1.default.findById(travelId));
    if (!travel || travel.length === 0) {
        return next(new errorHandler_1.default('No travel found for ${name}', 404));
    }
    res.status(200).json({ success: true, data: travel });
});
exports.getTravelsBySearch = (0, tryCatch_1.default)(async (req, res, next) => {
    const { searchQuery, tags } = req.query;
    let title;
    if (typeof searchQuery === 'string') {
        title = new RegExp(searchQuery, 'i');
    }
    else {
        title = new RegExp('', 'i');
    }
    const tagsString = tags;
    const travels = await Travel_1.default.find({
        $or: [{ title }, { tags: { $in: tagsString?.split(',') } }],
    });
    res.json({ data: travels });
});
exports.getTravelsByCreator = (0, tryCatch_1.default)(async (req, res, next) => {
    const { name } = req.query.creator;
    const travels = await Travel_1.default.find({
        creator: { $regex: new RegExp(name, 'i') },
    });
    res.status(200).json({ success: true, data: travels });
});
exports.deleteTravel = (0, tryCatch_1.default)(async (req, res, next) => {
    const { id } = req.params;
    const travel = await Travel_1.default.findById(id);
    if (!travel) {
        return next(new errorHandler_1.default('Travel not found', 404));
    }
    await travel.deleteOne({ id });
    res
        .status(200)
        .json({ success: true, message: 'Travel deleted successfully' });
});
exports.updateTravel = (0, tryCatch_1.default)(async (req, res, next) => {
    const data = req.body;
    const image = data.image;
    const travelId = req.params.id;
    const travelData = await Travel_1.default.findById(travelId);
    if (!travelData) {
        return next(new errorHandler_1.default('Travel not found', 400));
    }
    if (image && typeof image === 'string' && !image.startsWith('https')) {
        if (travelData.image && travelData.image.public_id) {
            await cloudinary_1.default.v2.uploader.destroy(travelData.image.public_id);
        }
        const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
            folder: 'travel',
        });
        data.image = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }
    else if (image &&
        typeof image === 'string' &&
        image.startsWith('https')) {
        // Keep existing image
        data.image = {
            public_id: travelData.image?.public_id || '',
            url: travelData.image?.url || '',
        };
    }
    const updatedTravel = await Travel_1.default.findByIdAndUpdate(travelId, { $set: data }, { new: true });
    if (!updatedTravel) {
        return next(new errorHandler_1.default('Failed to update travel', 400));
    }
    res.status(200).json({ success: true, data: updatedTravel });
});
exports.likeTravel = (0, tryCatch_1.default)(async (req, res, next) => {
    const { id } = req.params;
    if (!req.user) {
        return next(new errorHandler_1.default('Unauthenticated', 400));
    }
    const travel = await Travel_1.default.findById(id);
    if (!travel) {
        return next(new errorHandler_1.default('Travel not found', 404));
    }
    const index = travel.likes.findIndex((userId) => userId === req.user._id.toString());
    if (index === -1) {
        travel.likes.push(req.user._id);
    }
    else {
        travel.likes = travel.likes.filter((userId) => userId !== req.user._id.toString());
    }
    const updatedTravel = await Travel_1.default.findByIdAndUpdate(id, { likes: travel.likes }, { new: true });
    if (!updatedTravel) {
        return next(new errorHandler_1.default('Failed to update travel', 500));
    }
    res.status(200).json({ success: true, data: updatedTravel });
});
exports.commentTravel = (0, tryCatch_1.default)(async (req, res, next) => {
    const travelId = req.params.id;
    const { value } = req.body;
    const travel = await Travel_1.default.findById(travelId);
    if (!travel) {
        return next(new errorHandler_1.default('Travel not found', 404));
    }
    travel.comments.push(value);
    const updatedTravel = await travel.save();
    res.status(200).json({ success: true, data: updatedTravel });
});
