const fs = require("fs");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

const RESPONSES_PATH = path.join(__dirname, "../responses.json");

function findLocalReply(message) {
  const responses = JSON.parse(fs.readFileSync(RESPONSES_PATH, "utf-8"));
  const lower = message.toLowerCase();
  for (const key of Object.keys(responses)) {
    if (lower.includes(key)) {
      return responses[key];
    }
  }
  return "Sorry, I don't have an answer for that. Try asking about soil, pest, compost, or crop rotation.";
}

async function getGeminiReply(message) {
  const apiKey = process.env.GEMINI_API_KEY;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const body = JSON.stringify({
    contents: [{ role: "user", parts: [{ text: message }] }],
    systemInstruction: {
      parts: [
        {
          text: "You are a helpful assistant for organic farming and Your name is OrganicAI. Answer simply and easy to understand.",
        },
      ],
    },
    generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
  });

  try {
    if (!apiKey) {
      console.error(
        "API key is missing. Make sure VITE_GEMINI_API_KEY is set in your .env file."
      );
      return "Configuration error: API key is missing.";
    }
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const data = await response.json();
    let cleanResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Something went wrong!";

    // Clean the response by removing asterisks and other markdown formatting
    cleanResponse = cleanResponse
      .replace(/\*\*/g, "") // Remove bold markdown
      .replace(/\*/g, "") // Remove single asterisks
      .replace(/_/g, "") // Remove underscores
      .replace(/`/g, "") // Remove backticks
      .replace(/#{1,6}\s/g, "") // Remove markdown headers
      .trim(); // Remove extra whitespace

    return cleanResponse;
  } catch (err) {
    return "Sorry, couldn't connect to the AI." + err.message;
  }
}

exports.handleChat = async (req, res) => {
  const { message, useGemini } = req.body;
  if (!message) return res.status(400).json({ reply: "No message provided." });
  if (useGemini) {
    const reply = await getGeminiReply(message);
    return res.json({ reply });
  } else {
    const reply = findLocalReply(message);
    return res.json({ reply });
  }
};
