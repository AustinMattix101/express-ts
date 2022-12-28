import { Schema, model, InferSchemaType } from "mongoose";

const HotelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    distance: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    desc: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false
    },
    postBy: {
        type:String,
        required: [true, " Please povide who post this hotel! "],
    },
}, {timestamps: true});

declare interface IHotel extends InferSchemaType<typeof HotelSchema> {

}

/**
 * @Usage HotelSchema Class and Config Methods {@link HotelSchema}
 */
const Hotel = model<IHotel>("Hotel", HotelSchema);
export default Hotel;