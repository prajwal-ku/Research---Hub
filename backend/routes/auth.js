import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ensure this is the correct path

const router = express.Router();

// 🔹 Register API
router.post("/register", async (req, res) => {
  console.log("⚡ Register API hit", req.body);

  const { name, mobile, email, address, password } = req.body;

  try {
    if (!name || !mobile || !email || !address || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, mobile, email, address, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "🎉 Registration successful" });
  } catch (error) {
    console.error(" Error during registration:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

// 🔹 Login API
router.post("/login", async (req, res) => {
  console.log("⚡ Login API hit", req.body);

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.json({ message: " Login successful" });
  } catch (error) {
    console.error(" Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

export default router;
