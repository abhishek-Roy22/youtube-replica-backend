import { model, Schema } from 'mongoose';

const channelSchema = new Schema(
  {
    channelName: {
      type: String,
      required: true,
    },
    channelDesc: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Channel = model('Channel', channelSchema);
export default Channel;
