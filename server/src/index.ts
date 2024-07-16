import express from "express";
import dotenv from "dotenv";

dotenv.config();

import artistRoutes from "./routes/artist-routes";
import errorHandler from "./middleware/error-handler";

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Server Running on port: ${port}`);
  console.log("Request on path: /");
});

app.use("/api/artist", artistRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
