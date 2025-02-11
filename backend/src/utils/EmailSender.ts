import nodemailer from "nodemailer";

interface MailParams {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    from?: string;
}

export class MailSender {

    private static instance: MailSender;
    private transporter: nodemailer.Transporter;
    private mail: string;

    constructor() {
        if (MailSender.instance) {
            return MailSender.instance;
        }

        MailSender.instance = this;

        this.mail = process.env.EMAIL;
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true, // true for port 465, false for other ports
            auth: {
                user: this.mail,
                pass: process.env.EMAIL_PASS
            },
        });
    }

    async sendMail({ to, subject, text = '', html = '', from = 'Artesanias Bogotá info' }: MailParams) {
        if (!from) {
            from = this.mail;
        }
        else {
            from = `"${from}" <${this.mail}>`;
        }

        if (html === '' && text === '') {
            throw new Error('No content provided');
        }
        const info = await this.transporter.sendMail({
            from,
            to,
            subject,
            text,
            html
        });
    }
}