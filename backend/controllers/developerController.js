import User from "../models/User.js";
import bcrypt from "bcryptjs";


// ✅ CREATE DEVELOPER
export const createDeveloper = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const dev = await User.create({
      name,
      email,
      password: hashed,
      phone,
      role: "developer",
      active: true,
    });

    res.status(201).json({
      id: dev._id,
      name: dev.name,
      email: dev.email,
      phone: dev.phone,
      active: dev.active,
      role: dev.role,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ GET ALL DEVELOPERS
export const getDevelopers = async (req, res) => {
  try {
    const devs = await User.find({ role: "developer" });

    const formatted = devs.map(d => ({
      id: d._id,
      name: d.name,
      email: d.email,
      phone: d.phone,
      active: d.active,
      role: d.role,
    }));

    res.json(formatted);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ UPDATE DEVELOPER
export const updateDeveloper = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const dev = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    res.json({
      id: dev._id,
      name: dev.name,
      email: dev.email,
      phone: dev.phone,
      active: dev.active,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ ACTIVATE / DEACTIVATE (toggle)
export const toggleDeveloperStatus = async (req, res) => {
  try {
    const dev = await User.findById(req.params.id);

    dev.active = !dev.active;
    await dev.save();

    res.json({
      message: "Status updated",
      active: dev.active,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ DELETE DEVELOPER
export const deleteDeveloper = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Developer deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};