import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types";

const jwtSecret = process.env.JWT_SECRET as string;

//If the required cookies are not set or the JWT token can't be verified the status code is 401 Unauthorized
//If the token is expired the status code is 403 Forbidden
export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("authenticateUser firing");

  if (!req.cookies.access_token) {
    res.status(401);
    return next(new Error("No access token available"));
  }

  jwt.verify(req.cookies.access_token, jwtSecret, undefined, (err, decoded) => {
    if (err && err.name === "TokenExpiredError") {
      res.status(403);
      return next(new Error("Token Expired"));
    } else if (err) {
      console.log("Error authenticating");

      res.status(401);
      return next(err);
    }

    console.log(decoded);

    if (decoded && typeof decoded !== "string") {
      req.accessToken = decoded.data;
      next();
    } else {
      res.status(401);
      return next(new Error("Invalid token"));
    }
  });
}
