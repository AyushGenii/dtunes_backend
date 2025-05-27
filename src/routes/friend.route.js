import express from "express";
import { sendFriendRequest, acceptFriendRequest, cancelFriendRequest, rejectFriendRequest } from "../controllers/friend.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/send/:recipientId", verifyJWT, sendFriendRequest);
router.post("/accept/:senderId", verifyJWT, acceptFriendRequest);

router.post("/cancel/:recipientId", verifyJWT, cancelFriendRequest);
router.post("/reject/:senderId", verifyJWT, rejectFriendRequest);


export default router;
