import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, scheduledDate, platforms, userId } = req.body;
    console.log("Creating post with this data = ", req.body);

    // Validate required fields
    if (
      !title ||
      !content ||
      !scheduledDate ||
      !platforms ||
      !userId ||
      platforms.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including platforms." });
    }
    console.log(userId);
    // console.log(title);
    // console.log(content);
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    const post = await Post.create({
      user: user._id, // Assuming authentication middleware adds `user` to req
      title,
      content,
      scheduledDate,
      platforms,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating post" });
  }
};

export const updatePostAPI = async (req, res) => {
  try {
    const { title, content, scheduledDate, platforms, userId, postID } =
      req.body;
    console.log("Updating Post with data = ", req.body);

    // Validate required fields
    if (
      !title ||
      !content ||
      !scheduledDate ||
      !platforms ||
      !userId ||
      platforms.length === 0 ||
      !postID
    ) {
      return res
        .status(400)
        .json({ error: "All fields are required, including platforms." });
    }
    const user = await User.findById(userId);
    const post = await Post.findById(postID);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post does not exist!" });
    }
    const updatedPost = await Post.findByIdAndUpdate(
      postID, // The ID of the post to update
      {
        title,
        content,
        scheduledDate,
        platforms,
      },
      { new: true, runValidators: true } // Return updated post & validate fields
    );

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post" });
  }
};
export const deletePostAPI = async (req, res) => {
  try {
    const { userId, postID } = req.body;
    console.log("Deleting Post with data = ", req.body);

    // Validate required fields
    if (!userId || !postID) {
      return res
        .status(400)
        .json({ error: "All fields are required, including platforms." });
    }

    // 1️⃣ Find the user and post
    const user = await User.findById(userId);
    const post = await Post.findById(postID);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post does not exist!" });
    }

    // 2️⃣ Delete the post from the database
    await Post.findByIdAndDelete(postID);

    // 3️⃣ Remove postID from the user's posts array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { posts: postID }, // ✅ Remove postID from the posts array
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post" });
  }
};

export const addPostToUserAPI = async (req, res) => {
  try {
    const { userId, postID } = req.body;
    console.log("Adding post to user = ", req.body);

    // Validate required fields
    if (!userId || !postID) {
      return res
        .status(400)
        .json({ error: "All fields are required(user ID and post ID)." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, // The ID of the user to update
      {
        $push: { posts: postID }, // ✅ Add postID to the posts array
      },
      { new: true, runValidators: true } // ✅ Return updated user & validate schema
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating post" });
  }
};

export const getPostsOfUserAPI = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("Fetching posts for user = ", req.body);

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }

    const postArray = user.posts; // Array of post IDs

    // 🔹 Fetch all posts whose `_id` is in `postArray`
    const posts = await Post.find({ _id: { $in: postArray } });

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching posts" });
  }
};
