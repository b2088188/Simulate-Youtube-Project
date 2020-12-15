const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {getOne} = require('./handlerFactory');

function filterObj(obj, ...allowedFields) {
	return Object.keys(obj).reduce((acc, cur) => {
        if(allowedFields.includes(cur))
        	acc[cur] = obj[cur];
        return acc;
	}, {})	
}

exports.updateMe = catchAsync(async (req, res, next) => {
   if(req.body.password || req.body.passwordConfirm)
   	return next(new AppError('This route is not for password updates, pleaseuse /updateMyPassword', 400));
   let filteredBody = filterObj(req.body, 'name', 'email');
   let user = await User.findByIdAndUpdate(req.user._id, filteredBody, {new: true, runValidators: true});
   res.status(200).json({
   	status: 'success',
   	data: {
   		user
   	}
   })
});

exports.getMe = catchAsync(async (req, res, next) => {
   req.params.id = req.user._id;
   next();
})

exports.getUser = getOne(User);