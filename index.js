import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.port;

app.get("/", (req, res) => {
  res.send("Hello from Express ES Module!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
