import express from "express";
import dotenv from "dotenv";
dotenv.config();
import conn from "./conn/conn.js";
conn(process.env.MONGO_URL);
import auth from "./routes/auth.js";
import images from "./routes/image.js";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 1000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/v1", auth);
app.use("/api/v2", images);

app.get("/", (req, res) => {
  res.send("PicShare");
});

app.listen(port, () => {
  console.log("Server started");
});
