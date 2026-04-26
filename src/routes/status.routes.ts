import { Router } from "express";
import {
  getStatuses,
  createStatus,
  updateStatus,
  deleteStatus,
} from "../controllers/status.controller";

const router = Router();

router.get("/", getStatuses);
router.post("/", createStatus);
router.put("/:id", updateStatus);
router.delete("/:id", deleteStatus);

export default router;
