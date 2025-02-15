import axios from "axios";
// import openai from "openai";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getAISuggestions = async (inputText) => {
  console.log(inputText);
  console.log(OPENAI_API_KEY);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: inputText }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
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

// export const getAISuggestions = async (input) => {
//   const response = await openai.chat.create({
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: input },
//     ],
//   });
//   return response;
// };
