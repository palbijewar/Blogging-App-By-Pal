import comments from '../models/Comment.model.js';

export const createComment = async (req,res,next) => {
    try {
        const {content, post_id, user_id} = req.body;
        if(user_id !== req.user.id){
            return next(errorHandler(403, 'You are not allowed to comment'))
        }
        const newComment = new comments({
            content,
            post_id,
            user_id,
        })
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error)
    }
};

export const getComments = async (req, res, next) => {
    try {
      const allComments = await comments.find({ post_id: req.params.postId }).sort({
        createdAt: -1,
      });
      res.status(200).json(allComments);
    } catch (error) {
      next(error);
    }
  };