import express from 'express';
import {
  createPlaylist,
  getMyPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} from '../controllers/playlist.controller.js';
import {verifyJWT} from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', verifyJWT, createPlaylist);
router.get('/my', verifyJWT, getMyPlaylists);
router.put('/:id/add', verifyJWT, addSongToPlaylist);
router.put('/:id/remove', verifyJWT, removeSongFromPlaylist);
router.delete('/:id', verifyJWT, deletePlaylist);

export default router;
