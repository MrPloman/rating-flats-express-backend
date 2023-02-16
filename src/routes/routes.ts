// IMPORT
import express from 'express';
import flatRoute from './specific/flatRoute'
import userRoute from './specific/userRoute'
import ratingRoute from './specific/ratingRoute';

const app = express();

//  ROUTES
app.use('/api/flat', flatRoute);
app.use('/api/rating', ratingRoute);
app.use('/api/user', userRoute)

//EXPORT 
export default app;