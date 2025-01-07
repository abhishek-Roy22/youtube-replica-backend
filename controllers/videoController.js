import Video from '../model/videoSchema.js';

export const createVideo = async (req, res) => {
  try {
    const { videoTitle, thumbnailUrl, description } = req.body;
    if (!videoTitle || !thumbnailUrl || !description) {
      return res.status(401).json({ message: 'All fields are mendatory.' });
    }

    const newVideo = await Video.create({
      videoTitle,
      thumbnailUrl,
      description,
    });

    return res
      .status(201)
      .json({ message: 'Video Created Successful', video: newVideo });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    if (!videos) {
      return res.status(404).json({ message: 'Not found.' });
    }
    return res.status(200).json(videos);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const updateVideo = async (req, res) => {
  const videoId = req.params;
  const updatedFields = req.body;
  try {
    const updateVideo = await Video.findByIdAndUpdate(
      videoId,
      { $set: { ...updatedFields } },
      { new: true }
    );

    if (!updateVideo) {
      return res.status(404).json({ message: 'Video not found!' });
    }

    return res
      .status(200)
      .json({ message: 'video updated successful', video: updateVideo });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server Error' });
  }
};

export const deleteVideo = async (req, res) => {
  const videoId = req.params;
  try {
    const deleteVideo = await Video.findByIdAndDelete(videoId);
    if (!deleteVideo) {
      return res.status(404).json({ message: 'Video not found.' });
    }
    return res.status(200).json({ message: 'Video deleted successful.' });
  } catch (error) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server Error' });
  }
};
