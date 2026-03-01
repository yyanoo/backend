import { getAllCardData } from "../models/models_card.js";
import { processCardData } from "../services/service_card.js";

export async function cards(req, res) {
  try {
    const data = await getAllCardData();

    const filters = {
      id: req.query.id,
      title: req.query.title,
      color: req.query.color,
      lvl: req.query.lvl,
    };

    const hasFilters = Object.values(filters).some(val => val);
    let result;
    if (hasFilters) {
      result = processCardData(data, filters);
    } else {
      result = { success: true, data: data, message: "成功" };
    }
    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result.data);
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}