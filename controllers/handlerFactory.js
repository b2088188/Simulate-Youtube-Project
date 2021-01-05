import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

export const createOne = Model => catchAsync(async function (req, res, next) {
	const doc = await Model.create(req.body);
	   res.status(201).json({
             status: 'success',
             data: {
                data: doc
             }
        });
});

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

