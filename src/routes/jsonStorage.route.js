import { Router } from "express";
import {
  getMessages,
  saveMessage,
  getFavorites,
  toggleFavorite,
  clearFavorites,
} from "../controllers/jsonStorage.controller.js";

const router = Router();

router.route("/messages").get(getMessages).post(saveMessage);
router.route("/favorites").get(getFavorites).delete(clearFavorites);
router.route("/favorites/toggle").post(toggleFavorite);

export default router;
