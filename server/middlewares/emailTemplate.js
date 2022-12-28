"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tVerifyEmail = exports.tSendEmailConfirm = exports.tResetpassword = exports.tForgotpassword = exports.tRegister = void 0;
const index_1 = require("../index");
const tRegister = (e) => {
    return `
    <h1>Congratulations Your Account have been created!</h1>
    <p>Welcome to ${process.env.BRAND_NAME}, ${(0, index_1.capitalize)(e)}! </p>
    <h2><b>Congratulations your account is created using email: ${e}! <b/></h2>
    `;
};
exports.tRegister = tRegister;
const tForgotpassword = (t) => {
    return `
    <h1> You have requested a pasword reset</h1>
    <p> Please go to this link to reset your password </p>
    <a href=${process.env.RESET_PASSWORD_HOST}/passwordreset/${t} clicktracking=off>${process.env.RESET_PASSWORD_HOST}/passwordreset/${t}</a>
    <p> Link expired in 15 minutes<p/>
    `;
};
exports.tForgotpassword = tForgotpassword;
const tResetpassword = (u) => {
    return `
    <h1>Congratulations Your Password have been reseted!</h1>
    <p> Welcome, ${(0, index_1.capitalize)(u)}! </p>
    <h2><b> We want to inform you that your password has been changed! If It is not you, Please contact us as soon as possible. <b/></h2>
    <p><a href=${process.env.CONTACT_URL} clicktracking=off>${process.env.CONTACT_URL}</a></p>
    `;
};
exports.tResetpassword = tResetpassword;
const tSendEmailConfirm = (otp) => {
    return `
    <h1> You have requested a Email Confirmation!</h1>
    <p> Here your request OTP with expired in 10 minutes! ;) </p>
    <h2><b>${otp}<b/></h2>
    `;
};
exports.tSendEmailConfirm = tSendEmailConfirm;
const tVerifyEmail = (u) => {
    return `
    <h1>Congratulations Your Account Email have been verified!</h1>
    <p>Welcome to ${process.env.BRAND_NAME}, ${(0, index_1.capitalize)(u)}! </p>
    <h2><b>Congratulations your email is verified! <b/></h2>
    `;
};
exports.tVerifyEmail = tVerifyEmail;
//# sourceMappingURL=emailTemplate.js.map