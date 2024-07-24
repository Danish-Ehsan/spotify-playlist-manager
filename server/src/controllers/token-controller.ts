import { Request, Response, NextFunction } from "express";
import { getUserToken } from "../services/user-access-token";
import { getUserProfile } from "../services/spotify-api";
import { User } from "../types";
import jwt, { SignCallback } from "jsonwebtoken";
import { signTokenPromise } from "../utils/utils";

const jwtSecret = process.env.JWT_SECRET as string;

export async function tokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("request token route");
  const authCode: string = req.body.code;

  try {
    const spotifyToken = await getUserToken(authCode);

    const user = await getUserProfile(spotifyToken["access_token"]);

    console.log(user);

    const accessTokenPromise = signTokenPromise(
      {
        data: spotifyToken.access_token,
      },
      jwtSecret,
      { expiresIn: spotifyToken.expires_in }
    );

    const userTokenPromise = signTokenPromise(
      {
        ...user,
      },
      jwtSecret
    );

    const refreshTokenPromise = signTokenPromise(
      spotifyToken.refresh_token,
      jwtSecret
    );

    //Create all JWTs asynchronously then set the cookies and end the response.
    Promise.all([accessTokenPromise, userTokenPromise, refreshTokenPromise])
      .then((values) => {
        const [accessToken, user, refreshToken] = values;

        res.cookie("access_token", accessToken, { httpOnly: true });
        res.cookie("user_profile", user, { httpOnly: true });
        res.cookie("refresh_token", refreshToken, { httpOnly: true });
        res.status(200).end();
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  } catch (err) {
    next(err);
  }
}
