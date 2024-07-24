import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import artistRoutes from "./routes/artist-routes";
import tokenRoutes from "./routes/token-routes";
import userRoutes from "./routes/user-routes";
import errorHandler from "./middleware/error-handler";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Server Running on port: ${port}`);
  console.log("Request on path: /");
});

app.use("/api/artist", artistRoutes);
app.use("/api/user", userRoutes);
app.use("/api/token", tokenRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
