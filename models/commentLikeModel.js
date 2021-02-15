import mongoose from 'mongoose'
 import Comment from './commentModel.js';

const commentLikeSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'A like for comment must belong to a user']
	},
	comment: {
		type: mongoose.Schema.ObjectId,
		ref: 'Comment',
		required: [true, 'A like for comment must belong to a comment']
	},
    createdAt: {
        type: Date,
        default: Date.now(),
        selected: false
    }
})

commentLikeSchema.index({user:1, comment: 1}, {unique: true});

//Statics methods: Need to call on a model
commentLikeSchema.statics.calcSumLikesForComment = async function (commentId) {
	const stats = await this.aggregate([			
	{
		//Select all commentLikes match commentId
		$match: {
			comment: commentId
		}
	}
		,{
			//Calculating for matched commentLikes
			$group: {
				_id: '$comment',
				nLikes: {$sum: 1}				
			}
		} 
	])
	if(stats.length > 0){	
	await Comment.findByIdAndUpdate(commentId, {
		likes: stats[0].nLikes
	})
	}
	else{
		await Comment.findByIdAndUpdate(commentId, {
		likes: 0
	})
	}
}

// document post middleware: Trigger only when create or save
commentLikeSchema.post('save', async function() {
	//this.constructor point to CommentLike model
	//this point to current commentLike document

	//this.constructor.calcSumLikesForComment(this.comment);
	const comment = await Comment.findById(this.comment);
	comment.likes += 1;
	await comment.save();
})

//Run before query executing
commentLikeSchema.pre(/^delete/, async function(next) {	
	this.c = await this.findOne();
	next();
})

//Run after query finishing
commentLikeSchema.post(/^delete/, async function() {
	const comment = await Comment.findById(this.c.comment);
	comment.likes -= 1;
	await comment.save();
	//this.c.constructor.calcSumLikesForComment(this.c.comment);
})


const CommentLike = mongoose.model('CommentLike', commentLikeSchema);

export default CommentLike;