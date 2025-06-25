import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.mongoKey;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getAllCard() {
  try {
    await client.connect();
    const db = client.db("card");

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
  } finally {
    await client.close();
  }
}

export default getAllCard;
