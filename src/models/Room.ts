import { Schema, model, InferSchemaType } from "mongoose";

const RoomSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    maxPeople: {
        type: Number,
        required: true,
    },
    roomNumbers: [
        { number:Number, unavailableDates: [{type: Date}]}
    ],
    postBy: {
        type:String,
        required: [true, " Please povide who post this Room! "],
    },
}, {timestamps: true});

declare interface IRoom extends InferSchemaType<typeof RoomSchema> {

}


/**
 * @Usage RoomSchema Class and Config Methods
 * ```js
 * {number:101, unavailableDates:{05.12.2022, 06.12.2022}},
 * ```
 * {@link RoomSchema}
 */
const Room = model<IRoom>("Room", RoomSchema);
export default Room;