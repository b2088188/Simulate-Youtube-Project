const AppError = require('../utils/appError');

//Error Handling Middleware
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development')
        return sendErrorDev(err, res);
    if (err.code === 11000)
        return sendErrorProd(handleDuplicateFiledsDB(err), res);
    sendErrorProd(err, res);
}

function sendErrorDev(err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

function sendErrorProd(err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

function handleDuplicateFiledsDB(err) {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0].replace(/['"]+/g, '');
    return new AppError(`${value} already exist`, 400);
}