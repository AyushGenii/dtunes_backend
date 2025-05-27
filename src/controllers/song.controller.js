import Song from "../models/song.model.js";
import { ApiError, ApiResponse,asyncHandler } from "../lib/utils.js";


// Upload a new song by artist
// TODO: Add cloudinary
const uploadSong = asyncHandler(async (req, res) => {
  const { title, audioUrl, thumbnailUrl } = req.body;
  const artistId = req.user._id;

  if (!title || !audioUrl) {
    throw new ApiError(400, "Title and audio URL are required");
  }

  const newSong = await Song.create({
    title,
    audioUrl,
    thumbnailUrl: thumbnailUrl || null,
    artist: artistId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newSong, "Song uploaded successfully"));
});

// Delete a song by id (only if artist owns it)
const deleteSong = asyncHandler(async (req, res) => {
  const songId = req.params.id;
  const artistId = req.user._id;

  const song = await Song.findById(songId);

  if (!song) {
    throw new ApiError(404, "Song not found");
  }

  if (song.artist.toString() !== artistId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this song");
  }

  await song.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Song deleted successfully"));
});

export { uploadSong, deleteSong };
