import { Schema, model, InferSchemaType } from 'mongoose';

const residentSchema = new Schema({
    country_code: {
        type: String,
        maxlenght: 2,
        default: ``
    },
    country: {
        type: String,
        minlenght: [2, " Country needed 2 minimum characters! "],
        default: `` // " Please provide a country or nation! "
    },
    state: {
        type: String,
        minlenght: [2, " State needed 2 minimum characters! "],
        default: `` // " Please provide a state or province! "
    },
    address: {
        type: String,
        required: [true, " Please provide a address! "],
        default: `` // " Address need 10 minimum characters! "
    },
    tel: {
        type: Number,
        default: null // " Please provide a Telephone Number! "
    },

}, { timestamps: true });

const BioSchema = new Schema({
    accuracy: {
        type: Number,
        min: 0,
        max: 100,
        default: null // " Please provide a accuracy of static information! "
    },
    shortbio: {
        type: String,
        maxlenght: [150, " Short bio reached 500 maximum characters "],
        default: `` // " Please provide short bio. "
    },
    fullbio: {
        type: String,
        minlenght: [200, " Full Bio need 200 minimum 200 characters "],
        default: `` // " Please provide full bio. "
    }

}, { timestamps: true });

const profileSchema = new Schema({
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
        default: `` // " Please provide a firstname! "
    },
    middlename: {
        type: String,
        default: `` // " Please provide a middlename! "
    },
    lastname: {
        type: String,
        default: `` // " Please provide a lastname! "
    },
    fullname: String,
    birthdate: {
        type: Date,
        default: null // " Please provide a birthdate simple: 2003-03-17 [YEARS:MONTHS:DAYS]! "
    },
    sex: {
        type: String,
        minlenght: [1, "M or F"],
        default: `` // " Please provide a sex! "
    },
    resident: [residentSchema],
    bio: [BioSchema],
    image: {
        type: String,
        required: true,
        default: `${process.env.CDN_URL}/square/user-profile-icon.png` // " Please set image location /src/images/*.* "
    },
    category: {
        type: String,
        default: `` // " Please provide a category! "
    },
    label: {
        type: String,
        default: ``
    },
    income: {
        type: Number,
        min: [2, " Income at least 2 digits "],
        default: null // " Please provide an income! "
    },
    featured: {
        type: Boolean,
        default: false
    },
    referred: {
        type: Boolean,
        default: false // " Please provide a referred! | True or False "
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
        default: false // " Please accept our privacy policy! "
    }

}, { timestamps: true });

declare interface IProfiles extends InferSchemaType<typeof profileSchema> { }

/**
 * @Usage ProfilesSchema Class and Account Methods {@link profileSchema}
 */
const Profile = model<IProfiles>('profiles', profileSchema);
export default Profile;