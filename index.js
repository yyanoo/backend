import express from "express";
import dotenv from "dotenv";
import { getCardData } from "./models/models.js";

dotenv.config();

const app = express();
const port = process.env.port;

app.get("/cards/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getCardData(id);
    res.json(data);
  } catch (error) {
    console.error("抓資料出錯：", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
