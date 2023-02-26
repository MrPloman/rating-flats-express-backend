import nodemailer from 'nodemailer'

export function sendEmail(to: string, subject: string, text: string): Promise<any> {
    const MAIL = process.env.MAIL
    const MAIL_PASSWORD = process.env.MAIL_PASSWORD
    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: MAIL,
            pass: MAIL_PASSWORD,
        },
        secure: true,
    })
    console.log(transporter)
    const mailData = {
        from: MAIL, // sender address
        to: to, // list of receivers
        subject: subject,
        text: text,
        html: '',
    }

    const isEmailSent = new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (_error: any, mailSent: any) => {
            if (_error) {
                reject(undefined)
            }
            if (mailSent) {
                resolve(mailSent)
            }
        })
    })
    return isEmailSent
}
