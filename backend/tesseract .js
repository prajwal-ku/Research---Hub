import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// Function to perform OCR using Tesseract.js
async function extractTextFromImage(filePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(filePath, 'eng', {
      logger: (m) => console.log(m), // Log progress (optional)
    })
      .then(({ data: { text } }) => {
        if (text.trim()) {
          resolve(text); // Return the recognized text
        } else {
          reject("OCR failed to extract text");
        }
      })
      .catch(reject);
}

// File Upload Endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.join("uploads", req.file.filename);

  try {
    // First, try extracting text from PDF
    const fileBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(fileBuffer);
    let extractedText = pdfData.text.trim(); // Extracted text from PDF

    if (!extractedText) {
      console.log("No text extracted from PDF. Attempting OCR...");
      // If no text was extracted, try OCR using Tesseract.js
      extractedText = await extractTextFromImage(filePath);
    }

    if (!extractedText) {
      return res.status(500).json({ error: "Failed to extract text from PDF or image" });
    }

    console.log("Extracted Text:", extractedText);

    res.json({
      message: "File uploaded successfully",
      url: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
      extractedText,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
  }
});

export default router;
