import { createTransport } from "nodemailer";

/**
 *
 * @param options SendMail options
 * @Usage
 * ```js
 * const message = `
 *           <h1>Congratulations Your Account have been created!</h1>
 *           <p>Welcome to Mattix, Austin! </p>
 *           <h2><b>Congratulations your account is created using email: example@example.com! <b/></h2>
 *       `;
 * ```
 * @Functions
 * ```js
 * sendEmail({
 *           to: example@example.com,
 *           subject: "Congratulations, Account has been created!",
 *          text: message
 *       });
 * ```
 * @Reference {@link sendEmail}
 */
const sendEmail = (options:any) => {
    const transporter = createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        service: process.env.EMAIL_SERVICE,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        logger: true
    });
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: "Hello world?", // plain text body
        html: options.text
    }

    transporter.sendMail(mailOptions, (err:any, info:any) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.log(err);
        } else {
            // tslint:disable-next-line:no-console
            console.log(info);
        }
    });
}

export default sendEmail;