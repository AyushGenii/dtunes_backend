import { asyncHandler } from '../lib/utils.js';
import Like from '../models/like.model.js';

const likeOrDislikeSong = async (req, res) => {
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

const likeOrDislikeUser = asyncHandler(async (req, res) => {
  const { userId, liked } = req.body;
  const currentUserId = req.user._id;

  try {
    const existing = await Like.findOne({ user: currentUserId, userLiked: userId });

    if (existing) {
      existing.liked = liked;
      await existing.save();
    } else {
      await Like.create({ user: currentUserId, userLiked: userId, liked });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


export { likeOrDislikeSong, likeOrDislikeUser };