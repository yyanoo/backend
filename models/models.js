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

async function getCardData(collectionName) {
  try {
    await client.connect();
    const db = client.db("card");
    const collection = db.collection(collectionName);
    const result = await collection.find({}).toArray();
    return result;
  } catch (err) {
    console.error("取得資料失敗：", err);
    return [];
  } finally {
    await client.close();
  }
}

export default getCardData;
