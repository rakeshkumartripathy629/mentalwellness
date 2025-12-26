const axios = require("axios");

// ENV VARIABLES
const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini";

if (!AI_API_URL || !AI_API_KEY) {
  console.warn(
    "⚠️ AI env vars not set properly. Please configure AI_API_URL and AI_API_KEY."
  );
}

const getMoodPromptPrefix = (mood) => {
  if (!mood)
    return "You are a kind, empathetic mental wellness assistant. Avoid any diagnosis or medication advice.";

  const { score } = mood;

  if (score <= 3) {
    return "You are a very gentle, supportive mental wellness assistant. The user feels very low. Respond with empathy, validation, and simple grounding steps. Avoid medical diagnosis or medication advice.";
  }

  if (score <= 6) {
    return "You are a calm, supportive mental wellness assistant. The user is moderately stressed. Suggest coping strategies, breathing exercises, and grounding techniques. Avoid medical diagnosis or medication advice.";
  }

  return "You are a positive, encouraging mental wellness assistant. The user is doing okay and wants personal growth. Provide constructive tips, habits, and mindset advice. Avoid medical diagnosis or medication advice.";
};

const getAIResponse = async ({ mood, messages }) => {
  if (!AI_API_URL || !AI_API_KEY) {
    return "AI service is not configured properly.";
  }

  const systemContent = getMoodPromptPrefix(mood);

  const payload = {
    model: AI_MODEL,
    messages: [
      { role: "system", content: systemContent },
      ...messages,
    ],
    max_tokens: 300,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(AI_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
    });

    return (
      response.data?.choices?.[0]?.message?.content ||
      "I'm here for you."
    );
  } catch (error) {
    console.error("AI API ERROR:", error?.response?.data || error.message);
    return "Sorry, I couldn't process your request right now.";
  }
};

module.exports = { getAIResponse };
