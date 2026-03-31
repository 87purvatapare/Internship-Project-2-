import express from "express";
import {
  createClient,
  getClients,
  getClientById,
  getClientDashboard,
} from "../controllers/clientController.js";

const router = express.Router();

router.post("/", createClient);
router.get("/", getClients);
router.get("/:id", getClientById);
router.get("/dashboard/:userId", getClientDashboard); 


export default router;