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

    // 排序: 先按 title 排序，再按 id 排序（數字降序排列，再按字母排列）
    result.sort((a, b) => {
      // 先按 title 排序
      if (a.title !== b.title) {
        return a.title.localeCompare(b.title);
      }

      // 相同 title，區分數字和字母類型的 id
      const aSuffix = a.id.split("-").pop();
      const bSuffix = b.id.split("-").pop();

      const aNum = parseInt(aSuffix);
      const bNum = parseInt(bSuffix);

      const aIsNum = !isNaN(aNum);
      const bIsNum = !isNaN(bNum);

      // 數字型排在前面（升序），字母型排在後面
      if (aIsNum && bIsNum) {
        // 都是數字，升序排列（001, 002, ... 100）
        return aNum - bNum;
      } else if (aIsNum) {
        // a 是數字，b 是字母，a 排前面
        return -1;
      } else if (bIsNum) {
        // b 是數字，a 是字母，b 排前面
        return 1;
      } else {
        // 都是字母，按字母順序排（-T01, -T02, ...）
        return aSuffix.localeCompare(bSuffix);
      }
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("取得卡片資料錯誤：", err);
    res.status(500).json({ message: "伺服器錯誤" });
  }
}
