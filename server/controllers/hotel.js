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
exports.countByType = exports.countByCity = exports.findHotel = exports.findHotels = exports.deleteHotel = exports.updateHotel = exports.postHotel = void 0;
const Hotel_1 = __importDefault(require("../models/Hotel"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const postHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
    function setProps(request, _username) {
        request.postBy = _username;
        return request;
    }
    try {
        if (!req.body) {
            return next(new errorResponse_1.default(`Please provide a detail of your target hotel!`, 400));
        }
        else {
            const request = setProps(req.body, username);
            const hotel = new Hotel_1.default(request);
            try {
                const data = yield hotel.save();
                yield res.status(201).json({
                    success: true,
                    status: `CREATED`,
                    message: `Hotel created successfully with Username : ${username}`,
                    data,
                });
            }
            catch (error) {
                next(new errorResponse_1.default(`Something went wrong on create a new hotel! Error: ${error}`, 400));
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.postHotel = postHotel;
const updateHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    const request = req.body;
    try {
        const hotel = yield Hotel_1.default.findByIdAndUpdate(params, { $set: request }, { new: true });
        if (!hotel) {
            return next(new errorResponse_1.default(`Hotel with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Hotel updated successfully with given ID : ${params}`,
                data: hotel,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateHotel = updateHotel;
const deleteHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    try {
        const hotel = yield Hotel_1.default.findByIdAndDelete(params);
        if (!hotel) {
            return next(new errorResponse_1.default(`Hotel with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(201).json({
                success: true,
                status: `DELETED`,
                message: `Hotel deleted successfully with given ID : ${params}`,
                data: hotel,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteHotel = deleteHotel;
const findHotels = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotel = yield Hotel_1.default.find();
        if (!hotel) {
            return next(new errorResponse_1.default(`There are no hotel documents!`, 404));
        }
        else {
            yield res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `All Hotels are found successfully`,
                data: hotel,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.findHotels = findHotels;
const findHotel = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    try {
        const hotel = yield Hotel_1.default.findById(params);
        if (!hotel) {
            return next(new errorResponse_1.default(`Hotel with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `Hotel Founded successfully with given ID : ${params}`,
                data: hotel,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.findHotel = findHotel;
const countByCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.query.cities.split(",");
    try {
        const list = yield Promise.all(cities.map((city) => {
            return Hotel_1.default.countDocuments({ city });
        }));
        yield res.status(200).json({
            success: true,
            status: `QUERIED`,
            message: `Query results are found successfully! Query: ${cities}`,
            data: list,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.countByCity = countByCity;
const countByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const types = req.query.types.split(",");
    try {
        const list = yield Promise.all(types.map((type) => {
            return Hotel_1.default.countDocuments({ type });
        }));
        yield res.status(200).json({
            success: true,
            status: `QUERIED`,
            message: `Query results are found successfully! Query: ${types}`,
            data: list,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.countByType = countByType;
//# sourceMappingURL=hotel.js.map