import Comment from '../model/commentSchema.js';

export const createComment = async (req, res) => {
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  try {
    const userComment = await Comment.create({ comment });
    return res
      .status(201)
      .json({ message: 'Comment created', comment: userComment });
  } catch (err) {
    console.error('Error creating comment:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Not found' });
    }
    return res.status(200).json({ message: 'deleted successful' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
