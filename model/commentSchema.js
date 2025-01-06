import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
  },
  { timestamps: true }
);

const Comment = model('Comment', commentSchema);
export default Comment;
