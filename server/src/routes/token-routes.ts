import express from "express";
import { tokenController } from "../controllers/token-controller";

const router = express.Router();

router.post("/", tokenController);

export default router;
