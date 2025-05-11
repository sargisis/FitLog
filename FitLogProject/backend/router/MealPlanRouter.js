import express from "express";
import { GoogleGenAI } from "@google/genai";

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: "AIzaSyCbZKmSN9JrMNUdUOGcNsXPxTjayVn_mi8" });

router.post("/", async (req, res) => {
  const { height, weight, age, gender } = req.body;

  if (!height || !weight || !age || !gender) {
    return res.status(400).json({ message: "Missing fields in request body" });
  }

  const prompt = `
You are a professional nutritionist. Based on the following:
- Gender: ${gender}
- Age: ${age}
- Height: ${height} cm
- Weight: ${weight} kg

Provide:
- Estimated daily calorie needs
- Macronutrient breakdown (protein, fat, carbs)
- Example meal plan (breakfast, lunch, dinner).
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    res.json({ message: result.text });
  } catch (err) {
    console.error("Gemini API error:", err.message);
    res.status(500).json({ message: "Gemini API error", error: err.message });
  }
});

export default router;
