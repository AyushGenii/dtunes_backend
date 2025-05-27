import { Router } from "express";
import {
  changeCurrentPassword,
  followUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  unfollowUser,
  updateAccountDetails,
  updateProfileDetails,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { artist } from "../middlewares/artist.middleware.js";
import { deleteSong, uploadSong } from "../controllers/song.controller.js";
import { cancelFriendRequest, rejectFriendRequest } from "../controllers/friend.controller.js";


const router = Router();
//artist routes
router.post("/songs", verifyJWT, artist, uploadSong);
router.delete("/songs/:id", verifyJWT, artist, deleteSong);



router.route("/register").post(upload.none(), registerUser);

router.route("/login").post(upload.none(), loginUser);
router.route("/refresh-token").post(refreshAccessToken);

// SECURED ROUTES
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-profile").patch(verifyJWT, updateProfileDetails)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/follow/:userId").post(verifyJWT, followUser);
router.route("/unfollow/:userId").post(verifyJWT, unfollowUser);
export default router