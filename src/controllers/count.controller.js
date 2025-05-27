// controllers/song.controller.js
import Song from '../models/song.model.js';
import Like from '../models/like.model.js';

export const getSong = async (req, res) => {
  const songId = req.params.id;
  const userId = req.user._id;

  try {
    const song = await Song.findById(songId);

    const [likes, dislikes, userReaction] = await Promise.all([
      Like.countDocuments({ song: songId, liked: true }),
      Like.countDocuments({ song: songId, liked: false }),
      Like.findOne({ song: songId, user: userId })
    ]);

    res.json({
      song,
      likes,
      dislikes,
      userLiked: userReaction?.liked ?? null
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
