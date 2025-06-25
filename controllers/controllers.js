import getAllCard from "../models/allCard.js";

export async function allCard(req, res) {
  try {
    const { id, title, color, lvl } = req.query; // 從 URL query 拿 id 和 title

    const data = await getAllCard(); // 取得全部資料（陣列）

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "找不到資料" });
    }

    let result = data;

    if (title) {
      result = result.filter((item) => item.title?.includes(title));
    }

    if (id) {
      result = result.filter((item) => item.id.includes(id));
    }

    if (color) {
      result = result.filter((item) => item.color.includes(color));
    }

    if (lvl) {
      result = result.filter((item) => item.lvl.includes(lvl));
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "找不到符合條件的資料" });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}
