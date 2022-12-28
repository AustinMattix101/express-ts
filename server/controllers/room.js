"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRoom = exports.findRooms = exports.deleteRoom = exports.updateRoom = exports.postRoom = void 0;
const Hotel_1 = __importDefault(require("../models/Hotel"));
const Room_1 = __importDefault(require("../models/Room"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const postRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
    const params = req.params.hotelid;
    function setProps(request, _username) {
        request.postBy = _username;
        return request;
    }
    try {
        const request = setProps(req.body, username);
        const room = new Room_1.default(request);
        const data = yield room.save();
        try {
            yield Hotel_1.default.findByIdAndUpdate(params, { $push: { rooms: room._id } });
            yield res.status(201).json({
                success: true,
                status: `CREATED`,
                message: `Rooom created successfully with given Hotel ID : ${params}`,
                data,
            });
        }
        catch (error) {
            next(new errorResponse_1.default(`Something went wrong on create a new room! Error: ${error}`, 400));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.postRoom = postRoom;
const updateRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    const request = req.body;
    try {
        const room = yield Room_1.default.findByIdAndUpdate(params, { $set: request }, { new: true });
        if (!room) {
            return next(new errorResponse_1.default(`Room with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Room updated successfully with given ID : ${params}`,
                data: room,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hotelid = req.params.hotelid;
    const params = req.params.id;
    try {
        const room = yield Room_1.default.findByIdAndDelete(params);
        if (!room) {
            return next(new errorResponse_1.default(`Room with given ID: [${params}] not found!`, 400));
        }
        else {
            yield Hotel_1.default.findByIdAndUpdate(hotelid, { $pull: { rooms: params } });
            yield res.status(201).json({
                success: true,
                status: `DELETED`,
                message: `Room deleted successfully with given ID : ${params}`,
                data: room,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteRoom = deleteRoom;
const findRooms = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield Room_1.default.find();
        if (!room) {
            return next(new errorResponse_1.default(`There are no room documents`, 404));
        }
        else {
            yield res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `All Rooms are found successfully`,
                data: room,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.findRooms = findRooms;
const findRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    try {
        const room = yield Room_1.default.findById(params);
        if (!room) {
            return next(new errorResponse_1.default(`Room with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `Room Founded successfully with given ID : ${params}`,
                data: room,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.findRoom = findRoom;
//# sourceMappingURL=room.js.map