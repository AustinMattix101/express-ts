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
exports.findTask = exports.findTasks = exports.deleteTask = exports.updateTask = exports.postTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const postTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const username = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username;
    function setProps(request, _username) {
        request.postBy = _username;
        return request;
    }
    try {
        if (!req.body)
            return next(new errorResponse_1.default(`Please provide a detail of your target Task!`, 400));
        const request = setProps(req.body, username);
        const task = new Task_1.default(request);
        const data = yield task.save();
        yield res.status(201).json({
            success: true,
            status: `CREATED`,
            message: `Task created successfully with Username : ${username}`,
            data,
        });
    }
    catch (error) {
        next(new errorResponse_1.default(`Something went wrong on create a new Task! Error: ${error}`, 400));
    }
});
exports.postTask = postTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    const request = req.body;
    try {
        const task = yield Task_1.default.findByIdAndUpdate(params, { $set: request }, { new: true });
        if (!task) {
            return next(new errorResponse_1.default(`Task with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Task updated successfully with given ID : ${params}`,
                data: task,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    try {
        const task = yield Task_1.default.findByIdAndDelete(params);
        if (!task) {
            return next(new errorResponse_1.default(`Task with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(201).json({
                success: true,
                status: `DELETED`,
                message: `Task deleted successfully with given ID : ${params}`,
                data: task,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTask = deleteTask;
const findTasks = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        if (!tasks) {
            return next(new errorResponse_1.default(`There are no task documents!`, 404));
        }
        else {
            yield res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `All Tasks are found successfully!`,
                data: tasks,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.findTasks = findTasks;
const findTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params.id;
    try {
        const task = yield Task_1.default.findById(params);
        if (!task) {
            return next(new errorResponse_1.default(`Task with given ID: [${params}] not found!`, 400));
        }
        else {
            yield res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `Task Founded successfully with given ID : ${params}`,
                data: task,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.findTask = findTask;
//# sourceMappingURL=task.js.map