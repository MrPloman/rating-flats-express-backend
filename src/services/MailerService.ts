import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

export function sendEmail(to: string, subject: string, template: string, variables: any): Promise<any> {
    const MAIL = process.env.MAIL
    const MAIL_PASSWORD = process.env.MAIL_PASSWORD
    const viewpath = path.join(__dirname, '../templates/email')

    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'smtp.gmail.com',
        auth: {
            user: MAIL,
            pass: MAIL_PASSWORD,
        },
        secure: true,
    })
    transporter.use(
        'compile',
        hbs({
            viewEngine: {
                extname: '.hbs',
                layoutsDir: viewpath,
                defaultLayout: false,
                partialsDir: viewpath,
            },
            viewPath: viewpath,
            extName: '.hbs',
        })
    )

    const mailData = {
        from: MAIL,
        to: to,
        subject: subject,
        template: template,
        context: variables,
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (_error: any, mailSent: any) => {
            if (_error) {
                console.log(_error)
                reject(undefined)
            }
            if (mailSent) {
                console.log(mailSent)
                resolve(mailSent)
            }
        })
    })
}
