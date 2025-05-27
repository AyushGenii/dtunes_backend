import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import playlistRouter from "./routes/playlistRoutes.routes.js"
const app = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use('/api/v1/playlists', playlistRouter);
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter )
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("\n server failed ");
});
export default app;
