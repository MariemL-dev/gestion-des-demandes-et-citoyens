import { Router } from "express";
import {
  createDemande,
  getDemandes,
  getDemande,
  updateDemande,
  deleteDemande,
} from "../controllers/demande.controller";

const router = Router();

router.post("/", createDemande);
router.get("/", getDemandes);
router.get("/:id", getDemande);
router.put("/:id", updateDemande);
router.delete("/:id", deleteDemande);

export default router;
