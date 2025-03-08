import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

const router = express.Router();

// Ensure the 'uploads' folder exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR); // Store files in "uploads" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type. Only PDF and image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

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
      .catch((error) => reject(`OCR error: ${error}`));
  });
}

// File Upload Endpoint
router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.join(UPLOADS_DIR, req.file.filename);

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
