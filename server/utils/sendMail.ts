/* import nodemailer from 'nodemailer';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html?: string;
}

const sendMail = async (mailOptions: MailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password',
            },
        });

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

export default sendMail; */

import nodemailer, { Transporter } from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
require('dotenv').config();


interface Options {
    email: string,
    subject: string,
    template: string,
    data: {[key: string]: any},
}

const sendMail = async (options: Options) => {
    try {
        const transporter: Transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587') ,
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            },
            logger: true,
            debug: true,
        });

        const {email, subject, template, data} = options;
        //get the path to the email template file
        const templatePath = path.join(__dirname, "../mails", template);

        //render the email template with ejs
        const html: string = await ejs.renderFile(templatePath, data);

        //mailOptions
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html,
        };

        await transporter.sendMail(mailOptions);


    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

export default sendMail;