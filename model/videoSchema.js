import { Schema, model } from 'mongoose';

const videoSchema = new Schema(
  {
    videoTitle: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnailUrl: {
      type: String,
      requird: true,
    },
    description: {
      type: String,
      required: true,
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true }
);

const Video = model('Video', videoSchema);
export default Video;
