import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicketStatus,
  assignTicket,
  deleteTicket
} from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);

router.put("/:id/status", updateTicketStatus);
router.put("/:id/assign", assignTicket);

router.delete("/:id", deleteTicket);

export default router;