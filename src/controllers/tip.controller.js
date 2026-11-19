import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Tip } from "../models/tip.model.js";
import { isDBConnected } from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FALLBACK_TIPS_PATH = path.join(__dirname, "../../data/tips-fallback.json");

const DEFAULT_TIPS = [
  {
    author: "Rahul S., Daily Commuter",
    category: "METRO TRANSIT",
    title: "Metro Travel",
    text: "Use the Yellow Line to travel seamlessly between Delhi and Gurugram during rush hour to avoid heavy traffic jams. Switch at Sikanderpur for Rapid Metro into Cyber City.",
    upvotes: 184,
  },
  {
    author: "Pooja M., Travel Photographer",
    category: "WEATHER & TIMING",
    title: "Best Time to Visit",
    text: "Early mornings or late evenings are ideal for visiting open-air historical monuments like Qutub Minar. Beat the midday heat and capture golden hour photography.",
    upvotes: 242,
  },
];

// Fallback JSON helpers if MongoDB Atlas is unreachable on restricted networks
const readFallbackTips = async () => {
  try {
    const raw = await fs.readFile(FALLBACK_TIPS_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    const seeded = DEFAULT_TIPS.map((t, idx) => ({
      _id: `local-tip-${idx + 1}`,
      ...t,
      createdAt: new Date(Date.now() - (idx + 1) * 86400000).toISOString(),
    }));
    await fs.writeFile(FALLBACK_TIPS_PATH, JSON.stringify(seeded, null, 2), "utf-8");
    return seeded;
  }
};

const writeFallbackTips = async (tips) => {
  await fs.writeFile(FALLBACK_TIPS_PATH, JSON.stringify(tips, null, 2), "utf-8");
};

// Seed default community tips into MongoDB on first startup
export const seedInitialTips = async () => {
  try {
    if (!isDBConnected()) return;
    const count = await Tip.countDocuments();
    if (count === 0) {
      await Tip.insertMany(DEFAULT_TIPS);
      console.log("Seeded initial community tips into MongoDB.");
    }
  } catch (error) {
    console.warn("Could not seed initial tips:", error.message);
  }
};

// 1. READ all community tips (GET /api/v1/tips)
export const getAllTips = async (req, res) => {
  try {
    if (isDBConnected()) {
      const tips = await Tip.find().sort({ createdAt: -1 });
      return res.status(200).json(tips);
    }
    const tips = await readFallbackTips();
    return res.status(200).json(tips);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch tips", error: error.message });
  }
};

// 2. CREATE a new community tip (POST /api/v1/tips)
export const createTip = async (req, res) => {
  try {
    const { author, category, title, text } = req.body;

    if (!author || author.trim().length < 2) {
      return res.status(400).json({ message: "Author name must be at least 2 characters." });
    }
    if (!title || title.trim().length < 3) {
      return res.status(400).json({ message: "Title must be at least 3 characters." });
    }
    if (!text || text.trim().length < 10) {
      return res.status(400).json({ message: "Advice must be at least 10 characters." });
    }

    const payload = {
      author: author.trim(),
      category: (category && category.trim()) ? category.trim().toUpperCase() : "LOCAL TIP",
      title: title.trim(),
      text: text.trim(),
      upvotes: 0,
    };

    if (isDBConnected()) {
      const tip = await Tip.create(payload);
      return res.status(201).json({ message: "Tip saved to MongoDB", tip });
    }

    const tips = await readFallbackTips();
    const newTip = { _id: `tip-${Date.now()}`, ...payload, createdAt: new Date().toISOString() };
    tips.unshift(newTip);
    await writeFallbackTips(tips);
    return res.status(201).json({ message: "Tip saved", tip: newTip });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create tip", error: error.message });
  }
};

// 3. UPDATE a community tip or upvote count (PUT /api/v1/tips/:id)
export const updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, text, upvotes } = req.body;

    const updates = {};
    if (typeof title === "string" && title.trim().length >= 3) updates.title = title.trim();
    if (typeof category === "string" && category.trim().length > 0) updates.category = category.trim().toUpperCase();
    if (typeof text === "string" && text.trim().length >= 10) updates.text = text.trim();
    if (typeof upvotes === "number" && upvotes >= 0) updates.upvotes = upvotes;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }

    if (isDBConnected()) {
      const updated = await Tip.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!updated) {
        return res.status(404).json({ message: "Tip not found" });
      }
      return res.status(200).json({ message: "Tip updated in MongoDB", tip: updated });
    }

    const tips = await readFallbackTips();
    const idx = tips.findIndex((t) => String(t._id) === String(id));
    if (idx === -1) {
      return res.status(404).json({ message: "Tip not found" });
    }
    tips[idx] = { ...tips[idx], ...updates };
    await writeFallbackTips(tips);
    return res.status(200).json({ message: "Tip updated", tip: tips[idx] });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update tip", error: error.message });
  }
};

// 4. DELETE a community tip (DELETE /api/v1/tips/:id)
export const deleteTip = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const deleted = await Tip.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Tip not found" });
      }
      return res.status(200).json({ message: "Tip deleted from MongoDB" });
    }

    const tips = await readFallbackTips();
    const filtered = tips.filter((t) => String(t._id) !== String(id));
    if (filtered.length === tips.length) {
      return res.status(404).json({ message: "Tip not found" });
    }
    await writeFallbackTips(filtered);
    return res.status(200).json({ message: "Tip deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete tip", error: error.message });
  }
};
