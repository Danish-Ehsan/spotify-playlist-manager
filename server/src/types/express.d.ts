import { Request } from "express";
import { User, TokenInfo } from ".";

declare module "express-serve-static-core" {
  interface Request {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  }
}
