import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import platform from 'platform'
import { generateResetPasswordToken } from './TokenService'

export function sendEmail(to: string, subject: string, template: string, variables: any): Promise<any> {
    const MAIL = process.env.MAIL
    const MAIL_PASSWORD = process.env.MAIL_PASSWORD
    const viewpath = path.join(__dirname, '../templates/email')
    let token
    generateResetPasswordToken().then(t => {
        return t
    })
    const variablesContext = {
        user: variables.information.username,
        token: token,
        operating_system: platform.os,
        browser_name: platform.name,
        action_url: 'http://localhost:3500/recovery/' + token,
    }

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
        context: variablesContext,
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (_error: any, mailSent: any) => {
            if (_error) {
                reject(undefined)
            }
            if (mailSent) {
                resolve(mailSent)
            }
        })
    })
}
