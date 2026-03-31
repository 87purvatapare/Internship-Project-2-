import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 3. generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. send response (MATCH FRONTEND)
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};