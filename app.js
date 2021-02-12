import express from 'express'
import morgan from 'morgan'
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser'
//import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
// app.enable('trust proxy');
// app.use(
//     cors({
//         origin: 'https://app0529-7b508.web.app',
//         credentials: true
//     })
// );
// app.options('*', cors());
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'https://app0529-7b508.web.app');
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//     next();
// });
// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });

// Set Secure HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// Allow 100 requests from same IP in one hour
// const limiter = rateLimit({
//     max: 5,
//     windowMs: 60 * 60 * 1000,
//     message: 'Too many requests from this IP, please try again in an hour.'
// })
// app.use('/api', limiter);

//Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());
app.use(compression());
//Serving Static files
app.use(express.static(join(__dirname, 'public')));

import videoRouter from './routes/videoRoutes.js';
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import likeRouter from './routes/likeRoutes.js'
import commentRouter from './routes/commentRoutes.js'
import subscriptionRouter from './routes/subscriptionRoutes.js'
import channelRouter from './routes/channelRoutes.js';
import globalErrorHandler from './controllers/errorController.js'
import AppError from './utils/appError.js';
//Mounting
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/channels', channelRouter)
app.use('/api/v1/videos', videoRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler);
export default app;