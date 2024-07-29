import express from "express";
import { authenticateUser } from "../middleware/authenticate-user";
import {
  userPlaylistController,
  userPlaylistsController,
} from "../controllers/user-controller";

const router = express.Router();

router.use(authenticateUser);

router.get("/", (req, res) => {
  res.end();
});

router.get("/playlists", userPlaylistsController);
router.get("/playlist/:playlistId", userPlaylistController);

export default router;
