import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js"; 
import ticketRoutes from "./routes/ticketRoutes.js";
import clientRoutes from "./routes/clientRoutes.js"; 

import developerRoutes from "./routes/developerRoutes.js"; 

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// routes
// api for authentication

app.use("/api/auth", authRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tickets", ticketRoutes);
app.use("/api/clients", clientRoutes);  

app.use("/api/developers", developerRoutes); 



app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});