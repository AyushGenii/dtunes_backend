import Playlist from '../models/playlist.model.js';

export const createPlaylist = async (req, res) => {
  try {
    const { name, thumbnail } = req.body;
    const owner = req.user._id;

    const playlist = await Playlist.create({ name, thumbnail, owner });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.user._id }).populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSongToPlaylist = async (req, res) => {
  const { songId } = req.body;
  const playlistId = req.params.id;

  try {
    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user._id });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeSongFromPlaylist = async (req, res) => {
  const { songId } = req.body;
  const playlistId = req.params.id;

  try {
    const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user._id });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found or unauthorized' });
    }

    res.json({ message: 'Playlist deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
