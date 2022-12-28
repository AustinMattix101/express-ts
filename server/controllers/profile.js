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
exports.deleteProfileByUsername = exports.updateProfileByUsername = exports.clearProfile = exports.updateProfile = exports.writeProfile = exports.findProfileByUsername = exports.findProfile = void 0;
const Profile_1 = __importDefault(require("../models/Profile"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function findProfile(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        const profile = yield Profile_1.default.findOne({ altid });
        try {
            res.status(200).json({ success: true, status: `RECEIVED`, message: `Get Operation & Responses Delivered successfully!`, data: profile });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.findProfile = findProfile;
function findProfileByUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.params.username;
        const profile = yield Profile_1.default.findOne({ username: params });
        try {
            if (!profile) {
                return next(new errorResponse_1.default(`Parameters of Username: [${params}] you given not found!`, 404));
            }
            res.status(200).json({ success: true, status: `RECEIVED`, message: `Get Operation & Responses ByUsername Delivered successfully!`, data: profile });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.findProfileByUsername = findProfileByUsername;
function writeProfile(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        try {
            if (!req.body) {
                return next(new errorResponse_1.default(`Please provide a detail of your target profile!`, 400));
            }
            const request = yield setProps(req.body, altid);
            const profile = yield Profile_1.default.findOneAndUpdate({ altid }, { $set: request }, { new: true });
            function setProps(_request, id) {
                _request.altid = id;
                _request.fullname = `${_request.firstname} ${_request.middlename} ${_request.lastname}`;
                return _request;
            }
            res.status(201).json({
                success: true,
                status: `WRITTEN`,
                message: `Post Operation & Responses Delivered successfully!`,
                data: profile
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.writeProfile = writeProfile;
function updateProfile(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const altid = (_a = req.user) === null || _a === void 0 ? void 0 : _a.altid;
        yield Profile_1.default.findOneAndUpdate({ altid }, { $set: req.body }, { new: true })
            .then(profiles => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: `UPDATED`, message: `Update Operation is completed successfully!`, data: profiles });
        })
            .catch(err => next(err));
    });
}
exports.updateProfile = updateProfile;
function clearProfile(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
        const altid = (_b = req.user) === null || _b === void 0 ? void 0 : _b.altid;
        yield Profile_1.default.findOneAndDelete({ altid })
            .then(profile => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: true,
                status: `CLEARED`,
                message: `Delete Operation is completed successfully! Ensure that you can't get it back!`,
                data: profile,
            });
        })
            .catch(err => next(err));
        yield Profile_1.default.create({ altid, username })
            .catch(err => next(err));
    });
}
exports.clearProfile = clearProfile;
function updateProfileByUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.params.username;
        const profile = yield Profile_1.default.findOneAndUpdate({ username: params }, { $set: req.body }, { new: true });
        try {
            if (!profile) {
                return next(new errorResponse_1.default(`Parameters of Username: [${params}] you given not found!`, 404));
            }
            yield res.status(201)
                .setHeader('Content-Type', 'application/json')
                .json({
                success: true, status: `UPDATED`,
                message: `Update Operation byUsername is completed successfully!`,
                data: profile
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateProfileByUsername = updateProfileByUsername;
function deleteProfileByUsername(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.params.username;
        const profile = yield Profile_1.default.findOneAndDelete({ username: params });
        try {
            if (!profile) {
                return next(new errorResponse_1.default(`Parameters of Username: [${params}] you given not found!`, 404));
            }
            yield res.status(201)
                .setHeader('Content-Type', 'application/json')
                .json({
                success: true, status: `DELETED`,
                data: `Delete Operation byUsername is completed successfully! Ensure that you can't get it back!
                : ${profile}`
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteProfileByUsername = deleteProfileByUsername;
//# sourceMappingURL=profile.js.map