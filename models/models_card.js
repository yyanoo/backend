import { connectToDatabase } from "../config/mongoConfig.js";

export async function getAllCardData() {
    try {
        const db = await connectToDatabase("card");
        const collections = await db.listCollections().toArray();
        const targetNames = collections
            .map((col) => col.name)
            .filter((name) => name.startsWith("os"));

        const allData = await Promise.all(
            targetNames.map((name) => db.collection(name).find({}).toArray())
        );

        return allData.flat();
    } catch (err) {
        console.error("取得資料失敗：", err);
        return [];
    }
}