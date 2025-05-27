import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
  liked: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

likeSchema.index({ user: 1, song: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);
export default Like;
