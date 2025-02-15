import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createPost, updatePost, deletePost } from "../services/api";
import { getAISuggestions } from "../services/fetchOpenAIResponse.js";
import PropTypes from "prop-types";
import { addPostToUser } from "../services/api";
import backgroundImage from "../assets/bgimg.png";
import { useNavigate } from "react-router-dom";

export default function PostsFormPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "add";
  const event = {
    title: type == "edit" ? searchParams.get("title") || "" : "",
    content: type == "edit" ? searchParams.get("content") || "" : "",
    scheduledDate:
      type == "edit" ? searchParams.get("scheduledDate") || "" : "",
    platforms: type == "edit" ? searchParams.get("platforms") || [] : [],
  };

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [content, setContent] = useState(searchParams.get("content") || "");

  const formatDateForInput = (isoString) => {
    if (!isoString) return ""; // Handle empty case
    return isoString.slice(0, 16); // Extract YYYY-MM-DDTHH:MM
  };

  const [scheduledDate, setScheduledDate] = useState(
    formatDateForInput(searchParams.get("scheduledDate"))
  );

  const [aiSuggestion, setAiSuggestion] = useState("");
  const [platforms, setPlatforms] = useState(
    searchParams.get("platforms") || []
  );
  const [errorOn, setErrorOn] = useState(false);

  useEffect(() => {
    if (
      type == "edit" &&
      (title == "" ||
        content == "" ||
        scheduledDate == "" ||
        platforms == "") &&
      event
    ) {
      setTitle(event?.title || "");
      setContent(event?.content || "");
      setScheduledDate(event?.scheduledDate || "");
      setPlatforms(event?.platforms || []);
    }
  }, [event]);

  useEffect(() => {
    if (errorOn) setErrorOn(false);
  }, [title, content, scheduledDate, platforms]);

  //Handle Submit
  const handleSubmit = async (e) => {
    if (
      title == "" ||
      content == "" ||
      scheduledDate == "" ||
      platforms == [] ||
      platforms.length == 0
    ) {
      e.preventDefault();
      setErrorOn(true);
      console.log("Fill all fields to continue");
      return;
    }
    e.preventDefault();
    const userID = localStorage.getItem("userData");
    const response = await createPost({
      title,
      content,
      scheduledDate,
      platforms,
      userId: userID,
    });
    console.log(response.data);
    await addPostToUser({ userId: userID, postID: response.data._id });
    setTitle("");
    setContent("");
    setScheduledDate("");
    setPlatforms([]);
    navigate(-1);
  };

  const handleEdit = async (e) => {
    if (
      title == "" ||
      content == "" ||
      scheduledDate == "" ||
      platforms == [] ||
      platforms.length == 0
    ) {
      e.preventDefault();
      setErrorOn(true);
      console.log("Fill all fields to continue");
      return;
    }
    e.preventDefault();
    const userID = localStorage.getItem("userData");
    await updatePost({
      userId: userID,
      postID: searchParams.get("postID"),
      title,
      content,
      scheduledDate,
      platforms,
    });
    setTitle("");
    setContent("");
    setScheduledDate("");
    setPlatforms([]);
    navigate(-1);
  };
  const handleDeletePost = async (e) => {
    e.preventDefault();
    const userID = localStorage.getItem("userData");
    await deletePost({
      userId: userID,
      postID: searchParams.get("postID"),
    });
    navigate(-1);
  };

  // const handleAISuggestion = async () => {
  //   const res = await getAISuggestions({ content });
  //   setAiSuggestion(res.data.suggestion);
  // };
  const handleAISuggestion = () => {
    getAISuggestions(content).then((res) => {
      console.log(res);
      setAiSuggestion(res);
    });
  };
  const handlePlatformChange = (platform) => {
    setPlatforms(
      (prev) =>
        prev.includes(platform)
          ? prev.filter((p) => p !== platform) // Remove if already selected
          : [...prev, platform] // Add if not selected
    );
  };
  const handleTitleChange = (e) => {
    if (e.target.value.length < 100) {
      setTitle(e.target.value);
    }
  };
  const handleContentChange = (e) => {
    if (e.target.value.length < 500) {
      setContent(e.target.value);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center w-full bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="p-6 rounded-2xl shadow-lg bg-white max-w-2xl mx-auto">
        <h2 className="block my-2 font-large w-full text-center">
          {type == "edit" ? "Edit Your Event" : "Add an Event"}
        </h2>
        {/* Title Input */}
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-2xl mb-2"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter post title..."
        />

        {/* Content Textarea */}
        <textarea
          className="w-full p-3 border border-gray-300 rounded-2xl mb-2"
          value={content}
          onChange={handleContentChange}
          placeholder="Write your post..."
          rows="4"
        />

        {/* AI Suggestion Button */}
        <button
          onClick={() => handleAISuggestion(content)}
          className="bg-blue-500 text-white p-2 my-2 rounded-md w-full"
        >
          Get AI Suggestions
        </button>
        {aiSuggestion && <p className="italic text-gray-600">{aiSuggestion}</p>}

        {/* Date & Time Picker */}
        <label className="block mt-4 font-medium">{aiSuggestion}</label>
        <label className="block mt-4 font-medium">Schedule Date & Time:</label>
        <input
          type="datetime-local"
          className="w-full p-3 border border-gray-300 rounded-2xl mb-2"
          value={scheduledDate}
          min={new Date().toISOString().slice(0, 16)}
          onChange={(e) => setScheduledDate(e.target.value)}
        />

        {/* Social Media Selection (Checkboxes) */}
        <div className="mt-4">
          <label className="block font-medium">Post to:</label>
          <div className="flex-col gap-5 mt-2">
            {["Facebook", "X", "Instagram"].map((platform) => (
              <label key={platform} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={platforms.includes(platform)}
                  onChange={() => handlePlatformChange(platform)}
                />
                {platform}
              </label>
            ))}
          </div>
        </div>
        {errorOn && (
          <p className="text-red-500 font-medium">All fields are required !</p>
        )}
        {/* Submit Button */}
        <button
          onClick={type == "edit" ? handleEdit : handleSubmit}
          className="bg-green-500 text-white p-3 mt-4 w-full rounded-md"
        >
          Schedule Post
        </button>
        {type == "edit" && (
          <button
            onClick={handleDeletePost}
            className="bg-red-500 text-white p-3 mt-4 w-full rounded-md"
          >
            Delete Post
          </button>
        )}
      </div>
    </div>
  );
}

PostsFormPage.propTypes = {
  taskType: PropTypes.string, // Expect `taskType` to be a string
};
