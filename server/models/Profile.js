"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const residentSchema = new mongoose_1.Schema({
    country_code: {
        type: String,
        maxlenght: 2,
        default: ``
    },
    country: {
        type: String,
        minlenght: [2, " Country needed 2 minimum characters! "],
        default: ``
    },
    state: {
        type: String,
        minlenght: [2, " State needed 2 minimum characters! "],
        default: ``
    },
    address: {
        type: String,
        required: [true, " Please provide a address! "],
        default: ``
    },
    tel: {
        type: Number,
        default: null
    },
}, { timestamps: true });
const BioSchema = new mongoose_1.Schema({
    accuracy: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },
    shortbio: {
        type: String,
        maxlenght: [150, " Short bio reached 500 maximum characters "],
        default: ``
    },
    fullbio: {
        type: String,
        minlenght: [200, " Full Bio need 200 minimum 200 characters "],
        default: ``
    }
}, { timestamps: true });
const profileSchema = new mongoose_1.Schema({
    altid: {
        type: String,
        required: [true, " Need for invoke alternative access! "],
        unique: true,
        select: false,
        immutable: true
    },
    username: {
        type: String,
        required: [true, " Please povide a username! "],
        minlength: [4, " Name should be minimum of 4 characters "],
        unique: true,
        lowercase: true,
    },
    firstname: {
        type: String,
        default: ``
    },
    middlename: {
        type: String,
        default: ``
    },
    lastname: {
        type: String,
        default: ``
    },
    fullname: String,
    birthdate: {
        type: Date,
        default: null
    },
    sex: {
        type: String,
        minlenght: [1, "M or F"],
        default: ``
    },
    resident: [residentSchema],
    bio: [BioSchema],
    image: {
        type: String,
        required: true,
        default: `${process.env.CDN_URL}/square/user-profile-icon.png`
    },
    category: {
        type: String,
        default: ``
    },
    label: {
        type: String,
        default: ``
    },
    income: {
        type: Number,
        min: [2, " Income at least 2 digits "],
        default: null
    },
    featured: {
        type: Boolean,
        default: false
    },
    referred: {
        type: Boolean,
        default: false
    },
    referraldetails: {
        type: String,
        minlenght: [5, " Referral details need 5 minimum characters "],
        maxlenght: [50, " Referral details has 50 maximum characters "],
        default: ``
    },
    accepttos: {
        type: Boolean,
        truthy: "Yes",
        valid: true,
        required: true,
        default: false
    }
}, { timestamps: true });
const Profile = (0, mongoose_1.model)('profiles', profileSchema);
exports.default = Profile;
//# sourceMappingURL=Profile.js.map