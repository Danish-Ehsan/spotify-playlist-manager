import { Request, Response, NextFunction } from "express";
import { getAllPlaylists, getPlaylist } from "../services/spotify-api";

export async function userPlaylistsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("userPlaylistsController firing");
  const token = req.accessToken as string;

  try {
    const playlists = await getAllPlaylists(token);
    console.log(res.statusCode);
    res.json(playlists);
  } catch (err) {
    next(err);
  }
}

export async function userPlaylistController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("userPlaylistController firing");
  const token = req.accessToken as string;
  const playlistId = req.params.playlistId;

  try {
    const playlist = await getPlaylist(token, playlistId);
    res.json(playlist);
  } catch (err) {
    next(err);
  }
}
