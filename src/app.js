import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import tipRouter from "./routes/tip.route.js";
import jsonStorageRouter from "./routes/jsonStorage.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, "../public");

const app = express();

// Parse incoming JSON request bodies
app.use(express.json());

// Allow cross-origin requests if frontend is opened via Live Server
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Serve static HTML, CSS, and client-side JS files
app.use(express.static(PUBLIC_DIR));

// REST API Routes
app.use("/api/v1/tips", tipRouter);       // MongoDB CRUD (Community Tips)
app.use("/api/v1/json", jsonStorageRouter); // Local JSON file persistence (Contact & Favorites)

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok", app: "Roam Local API" });
});

export default app;
