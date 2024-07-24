import express from "express";
import { artistController } from "../controllers/artists-controller";

const router = express.Router();

router.get("/:artistId", artistController);

export default router;
