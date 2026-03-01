import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.mongoKey;

export const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase(dbName = "card") {
  try {
    // 檢查連線是否已存在，避免重複連接
    if (!mongoClient.topology || !mongoClient.topology.isConnected()) {
      await mongoClient.connect();
    }
    return mongoClient.db(dbName);
  } catch (err) {
    console.error("資料庫連接失敗：", err);
    throw err;
  }
}

export async function closeDatabase() {
  try {
    await mongoClient.close();
  } catch (err) {
    console.error("關閉資料庫連接失敗：", err);
  }
}
