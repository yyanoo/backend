import { getAndProcessCardData } from "../services/service_card.js";

/**
 * 獲取所有卡片（支援過濾和排序）
 * Query 參數: id, title, color, lvl
 */
export async function allCard(req, res) {
  try {
    const filters = {
      id: req.query.id,
      title: req.query.title,
      color: req.query.color,
      lvl: req.query.lvl,
    };

    const result = await getAndProcessCardData(filters);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result.data);
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}
