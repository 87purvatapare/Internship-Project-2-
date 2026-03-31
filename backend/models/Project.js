import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,

  startDate: Date,
  endDate: Date,

  status: {
    type: String,
    enum: ["active", "on hold", "completed", "cancelled"],
    default: "active"
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  assignedDevelopers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);