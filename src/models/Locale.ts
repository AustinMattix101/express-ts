import { Schema, model, InferSchemaType } from "mongoose";

const NameSpaceSchema = new Schema({
    index: {
        type: Object,
        required: true
    },
    navigation: {
        type: Object,
        required: true
    },
}, { timestamps: true });

const LocaleSchema = new Schema({
    language_code: {
        type: String,
        required: true,
        unique: true
    },
    namespaces: NameSpaceSchema,
}, { timestamps: true });

declare interface ILocale extends InferSchemaType<typeof LocaleSchema> { }

export default model<ILocale>('Locale', LocaleSchema);