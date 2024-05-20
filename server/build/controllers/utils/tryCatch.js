"use strict";
// import { NextFunction, Request, Response } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
const tryCatch = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong! Try again later" });
        }
    };
};
exports.default = tryCatch;
