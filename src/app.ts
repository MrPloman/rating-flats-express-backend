// IMPORTS SECTION
import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { engine } from 'express-handlebars'
import 'dotenv/config'
import router from './routes/routes'
import i18next from 'i18next'
import Backend from 'i18next-fs-backend'
import i18nextMiddleware from 'i18next-http-middleware'
import * as HandlebarsI18n from 'handlebars-i18n'
import cors from 'cors'

// VARIABLES SECTION
const app = express()
const corsOptions = {
    origin: 'http://localhost:3500',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const PORT = process.env.PORT || 80
const URIMONGO: string | undefined = process.env.MONGODB_URI

// Running server if URI is defines

function init() {
    switch (process.env.DDBB) {
        case 'mongo':
            // Setting strict queries
            mongoose.set('strictQuery', true)
            if (URIMONGO) {
                mongoose
                    .connect(URIMONGO, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    } as ConnectOptions)
                    .then(() => {
                        console.log('Connection Succesfull')
                    })
                    .catch(error => console.log(`Something went wrong: ${error}`))
            } else {
                console.log('Cannot load URI to set mongodb')
            }
            break
    }
    // Initialize i18n to translate messages
    i18next
        .use(Backend)
        .use(i18nextMiddleware.LanguageDetector)
        .init({
            backend: {
                loadPath: __dirname + '/resources/locales/{{lng}}.json',
            },
            fallbackLng: 'en',
            preload: ['en', 'es', 'ca'],
        })
    // Setting cors
    app.use(cors(corsOptions))
    // Using handlebars engine
    app.engine('handlebars', engine())
    // Using json parser
    app.use(express.json({ strict: false }))
    app.use(express.urlencoded({ extended: true }))
    // Using router
    app.use(router)
    // Using i18n to translate messages internally, in response
    app.use(i18nextMiddleware.handle(i18next))
    // Using i18n to translate handlebars, emails and views in handlebars
    HandlebarsI18n.init()
    // Initialized app on PORT
    app.listen(PORT, () => {
        console.log(`Server running on: ${PORT}`)
    })
}
init()
