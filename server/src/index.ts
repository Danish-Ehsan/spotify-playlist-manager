import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Server Running on port: ${port}`);
  console.log("Request on path: /");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
