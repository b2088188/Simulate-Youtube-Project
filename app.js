const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));
//Body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const likeRouter = require('./routes/likeRoutes');
const commentRouter = require('./routes/commentRoutes');
const homeRouter = require('./routes/homeRoutes');
const subscriptionRouter = require('./routes/subscriptionRoutes');
const globalErrorHandler = require('./controllers/errorController');
//Mounting
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/home', homeRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(globalErrorHandler);
module.exports = app;