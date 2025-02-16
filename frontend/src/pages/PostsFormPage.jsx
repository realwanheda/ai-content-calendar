import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { createPost, updatePost, deletePost } from "../services/api";
import { getAISuggestions } from "../services/fetchOpenAIResponse.js";
import { addPostToUser } from "../services/api";
import backgroundImage from "../svgComponents/bgimg2.png";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import TopBar from "../components/Topbar.jsx";

export default function PostsFormPage() {
  const [showModal, setShowModal] = useState(false); // ✅ Modal state
  const [bigScreen, setBigScreen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setBigScreen(window.innerWidth >= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const formatDateForInput = (isoString) => {
    if (!isoString) return ""; // Handle empty case
    return isoString.slice(0, 16); // Extract YYYY-MM-DDTHH:MM
  };
  const [scheduledDate, setScheduledDate] = useState(null);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [errorOn, setErrorOn] = useState(false);
  const [pastPost, setPastPost] = useState(false);

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
      const formattedDate = new Date(event?.scheduledDate).toLocaleString();
      if (new Date(event?.scheduledDate) < new Date()) setPastPost(true);
      setScheduledDate(formatDateForInput(formattedDate) || "");
      setPlatforms(event?.platforms || []);
    }
  }, []);

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
      return;
    }
    e.preventDefault();
    const response = await createPost({
      title,
      content,
      scheduledDate,
      platforms,
    });

    await addPostToUser({ postID: response.data._id });
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
      return;
    }
    e.preventDefault();
    await updatePost({
      postID: searchParams.get("postID"),
      title,
      content,
      scheduledDate,
      platforms,
    });
    navigate(-1);
  };
  const handleDeletePost = async (e) => {
    e.preventDefault();
    await deletePost({
      postID: searchParams.get("postID"),
    });
    navigate(-1);
  };
  const handleAISuggestion = () => {
    getAISuggestions(content).then((res) => {
      setAiSuggestion(res);
      setShowModal(true);
    });
  };
  const acceptAISuggestion = () => {
    setContent(aiSuggestion);
    setShowModal(false);
  };
  const rejectAISuggestion = () => {
    setShowModal(false);
  };
  const handlePlatformChange = (platform) => {
    setPlatforms((prev) => {
      let updatedPlatforms = [...prev]; // Copy the existing array

      if (updatedPlatforms.includes(platform)) {
        updatedPlatforms = updatedPlatforms.filter((p) => p !== platform); // Remove if already selected
      } else {
        updatedPlatforms.push(platform); // Add if not selected
      }

      return updatedPlatforms; // Update the state with the new array
    });
  };
  const handleTitleChange = (e) => {
    if (e.target.value.length < 100) {
      setTitle(e.target.value);
    }
  };
  const handleContentChange = (e) => {
    if (e.target.value.length < 1000) {
      setContent(e.target.value);
    }
  };
  if (pastPost) {
    return (
      <div
        className="flex justify-center items-center w-full h-screen bg-cover bg-top bg-no-repeat py-[40px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="p-6 rounded-2xl shadow-lg bg-white max-w-2xl mx-auto w-[60%]">
          <h2 className="block my-2 text-[1.4rem] font-semibold w-full text-center">
            The post is already Posted !
          </h2>
          {type == "edit" && (
            <button
              onClick={handleDeletePost}
              className="bg-red-500 text-white p-3 mt-4 w-full rounded-md"
            >
              Delete Schedule
            </button>
          )}
        </div>
      </div>
    );
  } else
    return (
      <>
        <TopBar />
        <div
          className="flex justify-center w-full bg-cover bg-top bg-no-repeat py-[40px]"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div
            className={`p-6 rounded-2xl shadow-lg bg-white ${
              bigScreen ? "max-w-2xl w-[60%]" : "w-[90%]"
            } mx-auto`}
          >
            <h2 className="block my-2 text-[1.4rem] font-semibold w-full text-center">
              {type == "edit" ? "Edit Your Scheduled Post" : "Schedule a Post"}
            </h2>
            {/* Title Input */}
            <label className="block mt-4 mb-1 font-medium">
              Title of your schedule
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-2xl mb-2"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter post title..."
            />

            {/* Content Textarea */}
            <label className="block mt-4 mb-1 font-medium">
              Post Description
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-2xl mb-2 "
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
            {/* ✅ Show Modal When AI Generates Suggestions */}
            {showModal && (
              <Modal
                text={aiSuggestion}
                onAccept={acceptAISuggestion}
                onReject={rejectAISuggestion}
              />
            )}

            <label className="block mt-4 font-medium">
              Schedule Date & Time:
            </label>
            <input
              type="datetime-local"
              className="w-full p-3 border border-gray-300 rounded-2xl mb-2"
              value={scheduledDate}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setScheduledDate(e.target.value)}
            />

            {/* Social Media Selection (Checkboxes) */}
            {!pastPost && (
              <div className="mt-4">
                <label className="block font-medium">Post to:</label>
                <div className="flex-col gap-5 mt-2">
                  {["LinkedIn", "X", "Instagram"].map((platform) => (
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
            )}
            {errorOn && (
              <p className="text-red-500 font-medium">
                All fields are required !
              </p>
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
                Delete Schedule
              </button>
            )}
          </div>
        </div>
      </>
    );
}
