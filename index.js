import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import cors from "cors";

const port = process.env.port || 4000;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/cards", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
