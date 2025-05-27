import Like from '../models/like.model.js';

export const likeOrDislikeSong = async (req, res) => {
  const { songId, liked } = req.body;
  const userId = req.user._id;

  try {
    const existing = await Like.findOne({ user: userId, song: songId });

    if (existing) {
      existing.liked = liked;
      await existing.save();
    } else {
      await Like.create({ user: userId, song: songId, liked });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
