// import axios from "axios";
// const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;

// export const getAISuggestions = async (inputText) => {
//   console.log(inputText);
//   console.log(AI_API_KEY);
//   try {
//     const response = await axios.post(
//       "https://api.groq.com/openai/v1/chat/completions",
//       {
//         model: "llama-3.3-70b-versatile",
//         messages: [
//           {
//             role: "user",
//             content: `Here is a post: "${inputText}".
//                       Improve it, analyze its tone dont make it agressing make it more authentic, and add hashtags. and keep it under 40 words only give me the content nothing else`,
//           },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${AI_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(response);
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error("Error fetching AI response:", error);
//     return "Failed to get AI response.";
//   }
// };
import axios from "axios";
import openai from "openai";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getAISuggestions = async (inputText) => {
  console.log(inputText);
  console.log(OPENAI_API_KEY);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Here is a post: "${inputText}".
//                       Improve it, analyze its tone dont make it agressing make it more authentic, and add hashtags. and keep it under 40 words only give me the content nothing else`,
          },
        ],
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
