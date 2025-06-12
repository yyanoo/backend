import getCardData from "../models/models.js";

export const getCardById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await getCardData(id);

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "找不到資料" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
};
