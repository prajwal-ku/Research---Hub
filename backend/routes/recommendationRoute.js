import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Load API key from .env

router.post("/recommend", async (req, res) => {
    const { userInterest } = req.body;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Suggest 5 research papers related to ${userInterest}. Provide title and a brief description.`
                            }
                        ]
                    }
                ]
            },
            { headers: { "Content-Type": "application/json" } }
        );

        // ✅ Safely Extract Recommendations
        const recommendations = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No recommendations found.";

        res.json({ recommendations });
    } catch (error) {
        console.error("❌ Error fetching recommendations:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch research paper recommendations" });
    }
});

export default router;
