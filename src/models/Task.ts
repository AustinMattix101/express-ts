import { Schema, model } from "mongoose";

const TaskSchema = new Schema({
    text: String,
    day: String,
    reminder: {
        type: Boolean,
        default: false
    },
    postBy: {
        type:String,
        required: [true, " Please povide who post this task! "],
    },
}, { timestamps: true });

/**
 * @Usage TaskSchema Class and Config Methods {@link TaskSchema}
 */
const Task = model("Tasks", TaskSchema);
export default Task;