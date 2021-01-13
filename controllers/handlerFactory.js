import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import APIFeatures from '../utils/apiFeatures.js';

export const createOne = Model => catchAsync(async function (req, res, next) {
	const doc = await Model.create(req.body);
	   res.status(201).json({
             status: 'success',
             data: {
                data: doc
             }
        });
});

export const getAll = (Model, popOptions) => catchAsync(async function (req, res, next) {
   const features = new APIFeatures(Model.find(), req.query).filter().paginate();
   if(popOptions)
      features.query = features.query.populate(popOptions);
   const doc = await features.query;
   res.status(200).json({
        status: 'success',
        resutls: doc.length,
        data: {
            data: doc
        }
    })
})

export const getOne = (Model, popOptions) => catchAsync(async function (req, res, next) {           
       let query = Model.findById(req.params.id);
       if(popOptions)
        query = query.populate(popOptions);
      const doc = await query;
      
       if(!doc)
          return next(new AppError('No document found with that ID', 404))
          res.status(200).json({
              status: 'success',
              data: {
                 doc
              }       
         })
})

export const deleteOne = Model => catchAsync(async function (req, res, next) {   
       const doc = await Model.findByIdAndDelete(req.params.id);
        if(!doc)
          return next(new AppError('No document found with that ID', 404))
       res.status(204).json({
         status: 'success',
         data: null
       });
});

export const updateOne = Model => catchAsync(async function (req, res, next) {
         const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            //return new document
            new: true,
            runValidators:true
         });
          if(!doc)
          return next(new AppError('No document found with that ID', 404))
       res.status(200).json({
          status: 'success',
           data: {
              doc
           }
       })
})
