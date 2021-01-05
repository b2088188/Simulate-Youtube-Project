import multer from 'multer'
import sharp from 'sharp'
import User from '../models/userModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import {getOne} from './handlerFactory.js'

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

export const uploadUserPhoto = upload.single('photo');

export const resizeUserPhoto = (req, res, next) => {
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

export const updateMe = catchAsync(async (req, res, next) => {
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

export const getMe = catchAsync(async (req, res, next) => {
   req.params.id = req.user._id;
   next();
})

export const getUser = getOne(User);