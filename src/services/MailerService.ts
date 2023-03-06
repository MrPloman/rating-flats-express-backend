import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'
import platform from 'platform'
import { generateURLToken } from './TokenService'

export async function sendAuthEmail(to: string, subject: string, template: string, variables: any, url: string): Promise<any> {
    const MAIL = process.env.MAIL
    const FRONTEND_URL = process.env.FRONTEND_URL
    const MAIL_PASSWORD = process.env.MAIL_PASSWORD
    const viewpath = path.join(__dirname, '../templates/email')
    const token = await generateURLToken()
    const variablesContext = {
        user: variables.information.username ? variables.information.username : variables.email,
        operating_system: platform.os,
        browser_name: platform.name,
        action_url: `${FRONTEND_URL}${url}/${token.secretToken}`,
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
                reject(_error)
            }
            if (mailSent) {
                resolve({
                    mail: mailSent,
                    token: {
                        token: token.hashedToken,
                        type: 'resetPassword',
                        method: 'bcrypt',
                        creationDate: new Date(),
                    },
                })
            }
        })
    })
}
