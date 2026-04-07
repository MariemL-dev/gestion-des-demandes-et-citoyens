import { Router } from "express";
import {
  createCitizen,
  getCitizens,
  getCitizen,
  deleteCitizen,
  updateCitizen
} from "../controllers/citizen.controller";

const router = Router();


router.post("/", createCitizen);


router.get("/", getCitizens);


router.get("/:id", getCitizen);

router.put("/:id", updateCitizen);


router.delete("/:id", deleteCitizen);

export default router;