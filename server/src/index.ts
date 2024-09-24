import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import artistRoutes from "./routes/artist-routes";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import errorHandler from "./middleware/error-handler";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log("\n req url: " + req.url + "\n");
  console.log(`Access Token: ${req.cookies.access_token}\n`);
  console.log(`Refresh Token: ${req.cookies.refresh_token}`);
  next();
});

app.get("/", (req, res) => {
  res.send(`Server Running on port: ${port}`);
  console.log("Request on path: /");
});

app.use("/api/artist", artistRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
