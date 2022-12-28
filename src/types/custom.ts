import { ObjectId } from "mongoose";

export const SUPPORTED_LANGUAGES = ["en", "es", "it", "cn"]
// this syntax is equals to "en" | "es" | "it"
export type Language = typeof SUPPORTED_LANGUAGES[number]

export type User = {
    id: ObjectId,
    altid: string,
    // name: string,
    // surname: string,
    username: string,
    email: string
    authenticationToken : string | null,
    language: string
}