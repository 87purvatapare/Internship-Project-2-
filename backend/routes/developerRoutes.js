import express from "express";
import {
  createDeveloper,
  getDevelopers,
  updateDeveloper,
  toggleDeveloperStatus,
  deleteDeveloper
} from "../controllers/developerController.js";

const router = express.Router();

router.post("/", createDeveloper);        // Create
router.get("/", getDevelopers);           // Read
router.put("/:id", updateDeveloper);      // Update
router.put("/:id/status", toggleDeveloperStatus); // Active/Inactive
router.delete("/:id", deleteDeveloper);   // Delete

export default router;