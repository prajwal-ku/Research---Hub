import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;  // Load API key from .env

// Summarization endpoint
router.post("/summarize", async (req, res) => {
    const { paperContent } = req.body; // The paper content sent from the frontend

    if (!paperContent) {
        return res.status(400).json({ error: "No paper content provided" });
    }

    try {
        // Request to Gemini API for summarization
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: `Summarize this research paper in 3-4 sentences:\n\n${paperContent}` }]
                }]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        // Extract and return the summary from the response
        const summary = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (summary) {
            return res.json({ summary });
        } else {
            return res.status(500).json({ error: "Summary not available in response" });
        }
    } catch (error) {
        console.error("Error generating summary:", error);
        return res.status(500).json({ error: "Failed to generate summary" });
    }
});

export default router;
