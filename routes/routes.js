import express from "express";
import getCardData from "../models/models.js";

const routes = express.Router();

routes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await getCardData(id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: "伺服器錯誤" });
  }
});

export default routes;
