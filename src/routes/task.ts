import { protect } from "../middlewares/auth";
import { corsWithOptions } from "../middlewares/cors";
import { Router } from "express";
const taskRouter = Router();

import { postTask, updateTask, deleteTask, findTasks, findTask } from "../controllers/task";

    // Tasks
taskRouter
    .route('/')
    .options(corsWithOptions)
    .post(protect, postTask);

taskRouter
    .route('/:id')
    .options(corsWithOptions)
    .put(protect, updateTask);

taskRouter
    .route('/:id')
    .options(corsWithOptions)
    .delete(protect, deleteTask);

taskRouter
    .route('/')
    .options(corsWithOptions)
    .get(protect, findTasks);

taskRouter
    .route('/:id')
    .options(corsWithOptions)
    .get(protect, findTask);

export default taskRouter;