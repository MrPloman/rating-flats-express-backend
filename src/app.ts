// IMPORTS SECTION
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import "dotenv/config";
import router from './routes/routes';

// VARIABLES SECTION
const app = express();
const PORT = process.env.PORT || 80;
// Url string required to connect to DDBB
const URI: string | undefined = process.env.MONGODB_URI;
// const URI: string | undefined = process.env.MONGODB_URI_LOCAL;


// CONNECTION TO DB AND RUN SERVER
// Setting strict queries
mongoose.set('strictQuery', true);
// Running server if URI is defines
if (URI) {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
        .then(() => {
            console.log('Connection Succesfull')
            app.use(express.json({ strict: false }));
            app.use(express.urlencoded({ extended: true }));
            app.use(router);
            app.listen(PORT, () => {
                console.log(`Server running on: ${PORT}`)
            })
        }
        ).catch((error) => console.log(`Something went wrong: ${error}`))
}
else {
    console.log("Cannot load URI to set mongodb")
}


