import { Router } from "express";
import {
  getAllTips,
  createTip,
  updateTip,
  deleteTip,
} from "../controllers/tip.controller.js";

const router = Router();

router.route("/").get(getAllTips).post(createTip);
router.route("/:id").put(updateTip).patch(updateTip).delete(deleteTip);

export default router;
