import Channel from '../model/channelSchema.js';

export const createChannel = async (req, res) => {
  //   const userId = req.user.id;
  const { channelName, channelDesc, createdBy } = req.body;

  try {
    const existingUser = await Channel.findOne({ createdBy });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'You have already created a channel.' });
    }

    const newChannel = await Channel.create({
      channelName,
      channelDesc,
      createdBy,
    });

    return res
      .status(201)
      .json({ message: 'Channel Created Successful', channel: newChannel });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 'Server error. Please try again later' });
  }
};
