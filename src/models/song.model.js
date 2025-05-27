import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artistName: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  likes: { type: Number},
  lyrics: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Song = mongoose.model("Song", songSchema);
export default Song;
