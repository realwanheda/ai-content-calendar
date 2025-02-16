import axios from "axios";

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

export const getAISuggestions = async (inputText) => {
  console.log(inputText);
  console.log(AI_API_KEY);
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Here is a post: "${inputText}".
                      Refine this to sound more natural and authentic—keep it under 40 words. Avoid an aggressive tone and make it more engaging. Add relevant hashtags for better reach. Keep it concise yet impactful.`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "Failed to get AI response.";
  }
};
