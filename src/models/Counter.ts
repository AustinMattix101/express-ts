import { Schema, model, InferSchemaType, CallbackWithoutResultAndOptionalError } from "mongoose";

const CounterSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    seq: {
        type: Number,
        default: 0,
    },
    etc: {
        type: String,
    }
}, { timestamps: true });

declare interface ICounter extends InferSchemaType<typeof CounterSchema> { }

CounterSchema.index({ seq: 1 }, { unique: true });

CounterSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
        return;
    }
    this.seq += 1;
});

const autoIncrementModelID = async (modelName: string, next: CallbackWithoutResultAndOptionalError): Promise<number | void> => {
    try {
        const { seq } = await Counter.findOneAndUpdate(     // ** Method call begins **
            { id: modelName },                              // The ID to find for in counters model
            { $inc: { seq: 1 } },                           // The update
            { new: true, upsert: true });                   // The options
        return seq;
    } catch (error) {
        return next(error as any);                          // The callback
    }                                                       // ** Method call ends **
};

//     try {
//         const { seq } = await Counter.findByIdAndUpdate(
//             this._id,
//             { $inc: { seq: 1 } },
//             { new: true, upsert: true });
//         return seq;
//     } catch (error) {
//         return next(error);
//     }                                    // ** Method call ends **
// };
const Counter = model<ICounter>('Counter', CounterSchema);

export { autoIncrementModelID };
export default Counter;