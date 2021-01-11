import  User from '../models/userModel.js'
import  catchAsync from '../utils/catchAsync.js'
import  AppError from '../utils/appError.js'
import  jwt from 'jsonwebtoken'
import  { promisify } from 'util'

export const signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
})

function createSendToken(user, statusCode, res) {
    const token = signToken(user._id);
    const cookieOptions = {
        //Cookie expired time
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        //Send in HTTPS 

        //Cookie cannot be accessed or modified by browser
        httpOnly: true
    }
    // if(process.env.NODE_ENV === 'production')
    // 	cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        data: {
            token,
            user
        }
    })
}

function signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError('Please provide email and password', 400));
    const user = await User.findOne({ email }).select('+password');
    if (!user || !await user.correctPassword(password, user.password))
        return next(new AppError('Incorrect email or password', 401));
    createSendToken(user, 200, res);
})

export const protect = catchAsync(async (req, res, next) => {
    let token;
    // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    // 	token = req.headers.authorization.split(' ')[1];
    // }
    if (req.cookies.jwt)
        token = req.cookies.jwt;

    if (!token)
        return next(new AppError('You\'re not logged in. Please log in to get access', 401));;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
        return next(new AppError('The user belonging to this token does no longer exist', 401))
    req.user = currentUser;
    next();
})

export const isLoggedIn = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies.jwt)
        token = req.cookies.jwt;
    if (!token)
        return next(new AppError('You\'re not logged in. Please log in to get access', 401));
    const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
        return next(new AppError('The user belonging to this token does no longer exist', 401));
    res.status(200).json({
        status: 'success',
        data: {
            user: currentUser
        }
    })
})

export const logout = (req, res) => {
    res.cookie('jwt', 'Logged Out', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({
        status: 'success'
    })
}
