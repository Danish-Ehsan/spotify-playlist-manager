import { Request, Response, NextFunction } from "express";
import { getPlaylists } from "../services/spotify-api";

export async function userPlaylistsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("userPlaylistsController firing");
  const token = req.accessToken as string;
  const userId = req.user?.id as string;

  console.log(`userId: ${userId}`);

  try {
    const playlists = await getPlaylists(token);
    console.log(res.statusCode);
    res.json(playlists);
  } catch (err) {
    next(err);
  }
}
