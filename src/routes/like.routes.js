// routes/song.routes.js
import express from 'express';
import { getSong } from '../controllers/song.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'; 

const router = express.Router();


router.get('/songs/:id', verifyJWT, getSong);

export default router;
