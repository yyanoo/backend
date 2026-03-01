import { connectToDatabase } from "../config/mongoConfig.js";

/**
 * 從資料庫獲取所有卡片資料
 * @returns {Array} 卡片資料陣列
 */
export async function getAllCardData() {
    try {
        const db = await connectToDatabase("card"); // 這裡可以指定資料庫名稱，默認為 "card"

        // 取得所有 collection 名稱
        const collections = await db.listCollections().toArray();
        const targetNames = collections
            .map((col) => col.name)
            .filter((name) => name.startsWith("os")); // 例如 os01、os02...

        // 抓資料
        const allData = await Promise.all(
            targetNames.map((name) => db.collection(name).find({}).toArray())
        );

        return allData.flat(); // 合併成一個陣列
    } catch (err) {
        console.error("取得資料失敗：", err);
        return [];
    }
}

export default getAllCardData;
