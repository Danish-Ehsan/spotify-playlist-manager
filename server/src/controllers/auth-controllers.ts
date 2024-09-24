import { Request, Response, NextFunction } from "express";
import { getUserToken } from "../services/user-access-token";
import { getUserProfile } from "../services/spotify-api";
import { signTokenPromise } from "../utils/utils";
import jwt from "jsonwebtoken";
import { refreshUserToken } from "../services/user-access-token";

const jwtSecret = process.env.JWT_SECRET as string;

export async function getTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("request token route");
  const authCode: string = req.body.code;

  try {
    const spotifyToken = await getUserToken(authCode);

    const user = await getUserProfile(spotifyToken["access_token"]);

    console.log({ user });
    console.log(spotifyToken.access_token);

    const accessTokenPromise = signTokenPromise(
      {
        data: spotifyToken.access_token,
      },
      jwtSecret,
      { expiresIn: spotifyToken.expires_in }
      //{ expiresIn: 1 }
    );

    const refreshTokenPromise = signTokenPromise(
      spotifyToken.refresh_token,
      jwtSecret
    );

    //Create all JWTs asynchronously, then set the cookies and end the response.
    Promise.all([accessTokenPromise, refreshTokenPromise])
      .then((values) => {
        const [accessToken, refreshToken] = values;

        res.cookie("access_token", accessToken, { httpOnly: true });
        res.cookie("refresh_token", refreshToken, {
          httpOnly: true,
          path: "/refresh-token",
        });
        res.status(200).json(user);
      })
      .catch((reason) => {
        throw new Error(reason);
      });
  } catch (err) {
    next(err);
  }
}

export async function refreshTokenController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("refresh token route");
  if (!req.cookies.refresh_token) {
    res.status(401);
    return next(new Error("No refresh token available"));
  }

  jwt.verify(
    req.cookies.refresh_token,
    jwtSecret,
    undefined,
    async (err, decoded) => {
      if (err) {
        console.log("Error verifying refresh token");

        res.status(401);
        return next(err);
      }

      console.log(decoded);

      if (decoded && typeof decoded === "string") {
        const refreshToken = decoded;

        try {
          const spotifyToken = await refreshUserToken(refreshToken);

          console.log(spotifyToken.access_token);
          console.log(spotifyToken);

          jwt.sign(
            {
              data: spotifyToken.access_token,
            },
            jwtSecret,
            { expiresIn: spotifyToken.expires_in },
            //{ expiresIn: 1 },
            (err, token) => {
              if (err) {
                return next(err);
              }

              res.cookie("access_token", token, { httpOnly: true });
              res.status(200).end();
            }
          );
        } catch (err) {
          res.status(401);
          next(err);
        }
      } else {
        res.status(401);
        return next(new Error("Invalid token"));
      }
    }
  );
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.cookie("access_token", "", { maxAge: 0, httpOnly: true });
  res.cookie("refresh_token", "", { maxAge: 0, httpOnly: true });
  res.status(200).end();
}
