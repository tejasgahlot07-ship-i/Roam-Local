import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "../../data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const FAVORITES_FILE = path.join(DATA_DIR, "favorites.json");

const ensureJsonFile = async (filePath, defaultContent) => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2), "utf-8");
  }
};

const readJsonFile = async (filePath, defaultContent) => {
  await ensureJsonFile(filePath, defaultContent);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return defaultContent;
  }
};

const writeJsonFile = async (filePath, data) => {
  await ensureJsonFile(filePath, data);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};

// GET /api/v1/json/messages -> fetch all contact form submissions from data/messages.json
export const getMessages = async (req, res) => {
  try {
    const messages = await readJsonFile(MESSAGES_FILE, []);
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to read messages.json", error: error.message });
  }
};

// POST /api/v1/json/messages -> save new contact form submission into data/messages.json
export const saveMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters." });
    }
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }
    if (!message || message.trim().length < 10) {
      return res.status(400).json({ message: "Message must be at least 10 characters." });
    }

    const messages = await readJsonFile(MESSAGES_FILE, []);
    const submission = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    messages.push(submission);
    await writeJsonFile(MESSAGES_FILE, messages);

    return res.status(201).json({
      message: "Saved to data/messages.json",
      submission,
      totalCount: messages.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to write to messages.json", error: error.message });
  }
};

// GET /api/v1/json/favorites -> fetch saved destination IDs from data/favorites.json
export const getFavorites = async (req, res) => {
  try {
    const favorites = await readJsonFile(FAVORITES_FILE, []);
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({ message: "Failed to read favorites.json", error: error.message });
  }
};

// POST /api/v1/json/favorites/toggle -> add/remove destination ID in data/favorites.json
export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Destination ID is required." });
    }

    let favorites = await readJsonFile(FAVORITES_FILE, []);
    if (favorites.includes(id)) {
      favorites = favorites.filter((item) => item !== id);
    } else {
      favorites.push(id);
    }

    await writeJsonFile(FAVORITES_FILE, favorites);
    return res.status(200).json({
      message: "Updated data/favorites.json",
      favorites,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update favorites.json", error: error.message });
  }
};

// DELETE /api/v1/json/favorites -> clear all saved places in data/favorites.json
export const clearFavorites = async (req, res) => {
  try {
    await writeJsonFile(FAVORITES_FILE, []);
    return res.status(200).json({ message: "Cleared data/favorites.json", favorites: [] });
  } catch (error) {
    return res.status(500).json({ message: "Failed to clear favorites.json", error: error.message });
  }
};
