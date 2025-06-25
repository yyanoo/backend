import getCardData from "../models/models.js";
import getAllCard from "../models/allCard.js";

export async function getCardById(req, res) {
  const id = req.params.id;
  try {
    const data = await getCardData(id);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "找不到資料" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}

export async function allCard(req, res) {
  try {
    const data = await getAllCard();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "找不到資料" });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}
