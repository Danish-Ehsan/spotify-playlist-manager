import express from "express";
import { authenticateUser } from "../middleware/authenticate-user";
import {
  userPlaylistController,
  userPlaylistsController,
} from "../controllers/user-controllers";

const router = express.Router();

router.use(authenticateUser);

router.get("/playlists", userPlaylistsController);
router.get("/playlist/:playlistId", userPlaylistController);

export default router;
