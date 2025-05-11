import express from "express";
import { GoogleGenAI } from "@google/genai";

const geminiRouter = express.Router();

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCbZKmSN9JrMNUdUOGcNsXPxTjayVn_mi8",
});

geminiRouter.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "No message provided" });
  }

  const prompt = `
You are a professional AI assistant specializing in:
- Fitness and training
- Nutrition and meal planning
- Muscle building, fat loss, supplements
- Sleep, hydration, and healthy lifestyle habits

Answer user questions clearly, helpfully, and in a friendly tone.

User: "${message}"
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    res.json({ reply: result.text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ reply: "Gemini error: " + err.message });
  }
});

export default geminiRouter;
