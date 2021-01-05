import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
//Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

import videoRouter from './routes/videoRoutes.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import likeRouter from './routes/likeRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import homeRouter from './routes/homeRoutes.js'
import subscriptionRouter from './routes/subscriptionRoutes.js'
import channelRouter from './routes/channelRoutes.js';
import globalErrorHandler from './controllers/errorController.js'
//Mounting
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/home', homeRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/channels', channelRouter)
app.use('/api/v1/videos', videoRouter);

app.use(globalErrorHandler);
export default app;