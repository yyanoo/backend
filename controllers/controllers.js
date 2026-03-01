import { getAllCardData } from "../models/allCard.js";
import { processCardData } from "../services/cardService.js";

/**
 * 獲取所有卡片（支援過濾和排序）
 * Query 參數: id, title, color, lvl
 */
export async function allCard(req, res) {
  try {
    // 第一步：先從 models 取得資料
    const data = await getAllCardData();

    // 第二步：準備過濾條件
    const filters = {
      id: req.query.id,
      title: req.query.title,
      color: req.query.color,
      lvl: req.query.lvl,
    };

    // 第三步：如果有過濾條件或需要排序，進入 services 進行處理
    const hasFilters = Object.values(filters).some(val => val);
    const result = hasFilters
      ? processCardData(data, filters)
      : processCardData(data, {});

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    return res.status(200).json(result.data);
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}
