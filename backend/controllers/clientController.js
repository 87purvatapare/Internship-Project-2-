import Ticket from "../models/Ticket.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createClient = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const client = await User.create({
      name,
      email,
      password: hashed,
      phone,
      role: "client",
      active: true,
    });

    res.status(201).json({
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      active: client.active,
      role: client.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: "client" });

    const formatted = clients.map((client) => ({
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      active: client.active,
      role: client.role,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClientById = async (req, res) => {
  try {
    const client = await User.findOne({ _id: req.params.id, role: "client" });

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json({
      id: client._id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      active: client.active,
      role: client.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClientDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // 🔥 Get client tickets
    const tickets = await Ticket.find({ createdBy: userId })
      .populate("projectId", "name clientId")
      .populate("assignedTo", "name email");

    // 🔥 Get client projects
    const projects = await Project.find({ clientId: userId });

    // 🔥 Get all users (for mapping)
    const users = await User.find();

    // 🎯 FORMAT DATA (VERY IMPORTANT)
    const formattedTickets = tickets.map(t => ({
      id: t._id,
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      createdBy: t.createdBy,

      projectId: t.projectId?._id,
      project: {
        name: t.projectId?.name
      },

      assignedTo: t.assignedTo?._id,
      assignedToUser: {
        name: t.assignedTo?.name
      }
    }));

    const formattedProjects = projects.map(p => ({
      id: p._id,
      name: p.name,
      clientId: p.clientId
    }));

    const formattedUsers = users.map(u => ({
      id: u._id,
      name: u.name,
      email: u.email
    }));

    // 📊 STATS (for dashboard cards)
    const stats = {
      total: formattedTickets.length,
      open: formattedTickets.filter(t => t.status === "open").length,
      inProgress: formattedTickets.filter(t => t.status === "in-progress").length,
      resolved: formattedTickets.filter(t => t.status === "resolved").length,
      closed: formattedTickets.filter(t => t.status === "closed").length
    };

    res.json({
      tickets: formattedTickets,
      projects: formattedProjects,
      users: formattedUsers,
      stats
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};