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

// VARIABLES SECTION
const app = express()
const PORT = process.env.PORT || 80

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

// Url string required to connect to DDBB
const URI: string | undefined = process.env.MONGODB_URI
// const URI: string | undefined = process.env.MONGODB_URI_LOCAL;

// Setting strict queries
mongoose.set('strictQuery', true)

// Running server if URI is defines
if (URI) {
    mongoose
        .connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        .then(() => {
            console.log('Connection Succesfull')
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
        })
        .catch(error => console.log(`Something went wrong: ${error}`))
} else {
    console.log('Cannot load URI to set mongodb')
}
