import { capitalize } from "../index";

/**
 *
 * @param e string
 * @returns Template of Registered email responses.
 */
export const tRegister = (e: string) => {
    return `
    <h1>Congratulations Your Account have been created!</h1>
    <p>Welcome to ${process.env.BRAND_NAME}, ${capitalize(e)}! </p>
    <h2><b>Congratulations your account is created using email: ${e}! <b/></h2>
    `
}

/**
 *
 * @param e string
 * @returns Template of Forgotpassword email responses.
 */
export const tForgotpassword = (t: string) => {
    return `
    <h1> You have requested a pasword reset</h1>
    <p> Please go to this link to reset your password </p>
    <a href=${process.env.RESET_PASSWORD_HOST}/passwordreset/${t} clicktracking=off>${process.env.RESET_PASSWORD_HOST}/passwordreset/${t}</a>
    <p> Link expired in 15 minutes<p/>
    `
}

/**
 *
 * @param e string
 * @returns Template of Resetpassword email responses.
 */
export const tResetpassword = (u: string) => {
    return `
    <h1>Congratulations Your Password have been reseted!</h1>
    <p> Welcome, ${capitalize(u)}! </p>
    <h2><b> We want to inform you that your password has been changed! If It is not you, Please contact us as soon as possible. <b/></h2>
    <p><a href=${process.env.CONTACT_URL} clicktracking=off>${process.env.CONTACT_URL}</a></p>
    `
}

/**
 *
 * @param e string
 * @returns Template of SendEmailConfirm email responses.
 */
export const tSendEmailConfirm = (otp : string) => {
    return `
    <h1> You have requested a Email Confirmation!</h1>
    <p> Here your request OTP with expired in 10 minutes! ;) </p>
    <h2><b>${otp}<b/></h2>
    `
}

/**
 *
 * @param e string
 * @returns Template of VerifyEmail email responses.
 */
export const tVerifyEmail = (u: string) => {
    return `
    <h1>Congratulations Your Account Email have been verified!</h1>
    <p>Welcome to ${process.env.BRAND_NAME}, ${capitalize(u)}! </p>
    <h2><b>Congratulations your email is verified! <b/></h2>
    `
}