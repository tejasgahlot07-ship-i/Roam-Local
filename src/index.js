import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import { seedInitialTips } from "./controllers/tip.controller.js";

dotenv.config({
  path: "./.env",
});

const startServer = async () => {
  try {
    await connectDB();
    await seedInitialTips();

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Roam Local server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
