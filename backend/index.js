import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import summarizationRoute from "./routes/summarizationRoute.js";
import recommendationRoute from "./routes/recommendationRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS Middleware (Allow only frontend URL)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Ensure "uploads" folder exists
const UPLOADS_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: { type: String, unique: true },
  address: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized access" });
    req.user = decoded;
    next();
  });
};

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, mobile, email, address, password } = req.body;
    if (!name || !mobile || !email || !address || !password) 
      return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await new User({ name, mobile, email, address, password: hashedPassword }).save();
    res.status(201).json({ message: "🎉 Registration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "✅ Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload File (Protected)
app.post("/api/upload", verifyToken, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

// Serve Uploaded Files
app.use("/uploads", express.static(UPLOADS_DIR));

// AI APIs (Summarization and Recommendations)
app.use("/api", summarizationRoute);
app.use("/api", recommendationRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
