import express from "express";
import {
  getTokenController,
  refreshTokenController,
  logoutController,
} from "../controllers/auth-controllers";

const router = express.Router();

router.post("/get-token", getTokenController);
router.get("/refresh-token", refreshTokenController);
router.get("/logout", logoutController);

export default router;
