// IMPORT
import flatRoute from './specific/flatRoute'
import userRoute from './specific/userRoute'
import express from 'express';

const app = express();

//  ROUTES
app.use('/api/flat', flatRoute);
app.use('/api/user', userRoute)

//EXPORT 
export default app;