import { NextFunction, Request, Response } from "express";

import Task from "../models/Task";
import ErrorResponse from "../utils/errorResponse";

export const postTask = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.user?.username as string;

    function setProps(request: Request["body"], _username: string) {
        request.postBy = _username;

        return request;
    }

    try {
        if (!req.body)
            return next(new ErrorResponse(`Please provide a detail of your target Task!`, 400));
        const request = setProps(req.body, username);
        const task = new Task(request);
        const data = await task.save();

        await res.status(201).json({
            success: true,
            status: `CREATED`,
            message: `Task created successfully with Username : ${username}`,
            data,
        });
    } catch (error) {
        next(new ErrorResponse(`Something went wrong on create a new Task! Error: ${error}`, 400));
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    const request = req.body;
    try {
        const task = await Task.findByIdAndUpdate(params, { $set: request }, { new: true });

        if (!task) {
            return next(new ErrorResponse(`Task with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(201).json({
                success: true,
                status: `UPDATED`,
                message: `Task updated successfully with given ID : ${params}`,
                data: task,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(params);

        if (!task) {
            return next(new ErrorResponse(`Task with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(201).json({
                success: true,
                status: `DELETED`,
                message: `Task deleted successfully with given ID : ${params}`,
                data: task,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const findTasks = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find();

        if (!tasks) {
            return next(new ErrorResponse(`There are no task documents!`, 404));
        } else {
            await res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `All Tasks are found successfully!`,
                data: tasks,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const findTask = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params.id;
    try {
        const task = await Task.findById(params);

        if (!task) {
            return next(new ErrorResponse(`Task with given ID: [${params}] not found!`, 400));
        } else {
            await res.status(200).json({
                success: true,
                status: `FOUNDED`,
                message: `Task Founded successfully with given ID : ${params}`,
                data: task,
            });
        }
    } catch (error) {
        next(error);
    }
};