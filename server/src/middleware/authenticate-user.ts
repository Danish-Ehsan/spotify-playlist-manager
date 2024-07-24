import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types";

const jwtSecret = process.env.JWT_SECRET as string;

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("authenticateUser firing");

  if (
    !req.cookies.access_token ||
    !req.cookies.refresh_token ||
    !req.cookies.user_profile
  ) {
    res.status(401).end();
    return;
  }

  try {
    jwt.verify(
      req.cookies.access_token,
      jwtSecret,
      undefined,
      (err, decoded) => {
        if (err) {
          console.log("error authenticating");
          if (err.name === "TokenExpiredError") {
            res.status(403).json({ message: "Token Expired" });
          }

          res.status(401);
          throw err;
        }

        console.log(decoded);

        if (decoded && typeof decoded !== "string") {
          req.accessToken = decoded.data;

          jwt.verify(
            req.cookies.user_profile,
            jwtSecret,
            undefined,
            (err, decoded) => {
              if (err) {
                res.status(401);
                throw err;
              }

              req.user = decoded as User;
            }
          );
          next();
        }
      }
    );
  } catch (err) {
    next(err);
  }
}
