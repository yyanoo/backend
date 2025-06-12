import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes.js";

const port = process.env.port;
dotenv.config();

const app = express();
app.use(express.json());

app.use("/cards", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
