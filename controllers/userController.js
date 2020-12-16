const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {getOne} = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
   if(file.mimetype.startsWith('image'))
      return cb(null, true)
   cb(new AppError('Not an image, please upload only images', 400), false);
}

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = (req, res, next) => {
   if(!req.file)
      return next();
   req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
   sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({quality: 90}).toFile(`public/assets/users/${req.file.filename}`);
   next();
}
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
   if(req.file)
      filteredBody.photo = req.file.filename;
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