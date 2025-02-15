import { useState } from "react";
import { getAISuggestions } from "../services/api";

const AiSuggestions = () => {
  const [inputText, setInputText] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleAISuggestion = async () => {
    if (!inputText) return;

    try {
      const res = await getAISuggestions({ content: inputText });
      setSuggestion(res.data.suggestion);
    } catch (error) {
      console.error("Error fetching AI suggestion:", error);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      {/* Input Field */}
      <textarea
        className="w-full p-2 border rounded-lg"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type something to get AI suggestions..."
        rows="3"
      />

      {/* Fetch AI Suggestion Button */}
      <button
        onClick={handleAISuggestion}
        className="bg-blue-500 text-white p-2 my-2 rounded-md w-full"
      >
        Get AI Suggestion
      </button>

      {/* Display AI Suggestion */}
      {suggestion && (
        <p className="italic text-gray-600 border p-2">{suggestion}</p>
      )}
    </div>
  );
};

export default AiSuggestions;
