"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middlewares/auth");
const cors_1 = require("../middlewares/cors");
const express_1 = require("express");
const taskRouter = (0, express_1.Router)();
const task_1 = require("../controllers/task");
taskRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .post(auth_1.protect, task_1.postTask);
taskRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .put(auth_1.protect, task_1.updateTask);
taskRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .delete(auth_1.protect, task_1.deleteTask);
taskRouter
    .route('/')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, task_1.findTasks);
taskRouter
    .route('/:id')
    .options(cors_1.corsWithOptions)
    .get(auth_1.protect, task_1.findTask);
exports.default = taskRouter;
//# sourceMappingURL=task.js.map