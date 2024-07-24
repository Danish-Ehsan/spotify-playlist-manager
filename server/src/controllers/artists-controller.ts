import { Request, Response, NextFunction } from "express";
import { getArtist } from "../services/spotify-api";

export async function artistController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const artistId = req.params.artistId;

  try {
    const artist = await getArtist(artistId);
    res.send(artist);
  } catch (err) {
    console.log("caught error");
    next(err);
  }
}
