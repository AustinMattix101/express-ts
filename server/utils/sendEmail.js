"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const sendEmail = (options) => {
    const transporter = (0, nodemailer_1.createTransport)({
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
        text: "Hello world?",
        html: options.text
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    });
};
exports.default = sendEmail;
//# sourceMappingURL=sendEmail.js.map