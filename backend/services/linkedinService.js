import axios from "axios";
const LINKEDIN_API_URL = "https://api.linkedin.com/v2/ugcPosts";

// Function to post text to LinkedIn
const postToLinkedIn = async (message) => {
  if (!process.env.ACCESS_TOKEN) {
    throw new Error("Access Token is missing! Please authenticate first.");
  }

  const postData = {
    author: process.env.PERSON_URN,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: { text: message },
        shareMediaCategory: "NONE",
      },
    },
    visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
  };

  try {
    const response = await axios.post(LINKEDIN_API_URL, postData, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
      },
    });

    const postURN = response.data.id;
    console.log(postURN);

    const postId = postURN.split(":").pop();

    const postURL = `https://www.linkedin.com/feed/update/${postURN}`;
    console.log("✅ Post successful:", postURL);
    return { success: true, url: postURL };
    console.log("✅ Post successful:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error posting to LinkedIn:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default postToLinkedIn;
