import { Router } from "express";
import {
  getAdminProfile,
  updateAdminProfile,
} from "../controllers/adminProfile.controller";

const router = Router();

router.get("/", getAdminProfile);
router.put("/", updateAdminProfile);

export default router;
