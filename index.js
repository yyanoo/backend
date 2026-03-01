import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";

const port = process.env.port || 4000;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function check_data() {
  const countms = 24 * 60 * 60 * 1000; // One month in milliseconds
  while (true) {
    await new Promise(resolve => setTimeout(resolve, countms));
    console.log("Checking data...");
  }
}

check_data();