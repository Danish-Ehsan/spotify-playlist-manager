import express from "express";
import { getArtist } from "../services/spotify-api";

const router = express.Router();

router.get("/:artistId", async (req, res, next) => {
  const artistId = req.params.artistId;

  try {
    const artist = await getArtist(artistId);
    res.send(artist);
  } catch (err) {
    console.log("caught error");
    next(err);
  }
});

export default router;
