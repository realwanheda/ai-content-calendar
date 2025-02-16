// import axios from "axios";

// export const baseURL = import.meta.env.VITE_BACKEND_URL;
// // const openai = import.meta.env.VITE_OPENAI_API_KEY;

// export const API = axios.create({
//   baseURL: baseURL,
//   // timeout: 1000 * 10,
//   withCredentials: true,
//   headers: {
//     authorization: `Bearer ${document.cookie.split(";")}`,
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });
// export const loginUser = (data) => API.post("/auth/login", data);
// export const registerUser = (data) => API.post("/auth/register", data);
// export const createPost = (postData) => API.post("/posts/create", postData); // title, content, scheduledDate, platforms, userId, imageURL
// export const updatePost = (postData) => API.post("/posts/update", postData); // userId, postID, title, content, scheduledDate, platforms, imageURL
// export const deletePost = (data) => API.post("/posts/delete", data); // postID, userId
// export const fetchPostsOfUser = (data) => API.post("/posts/get-posts", data); // userId
// export const addPostToUser = (data) =>
//   API.post("/posts/add-post-to-user", data); // postID, userId
// export const getPosts = (token) =>
//   API.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const loginUser = (data) => API.post("/auth/login", data);
export const logoutUser = () => API.post("/auth/logout");
export const registerUser = (data) => API.post("/auth/register", data);
export const getCurrentUser = () => API.post("auth/getCurrentUser");
export const createPost = (postData) => API.post("/posts/create", postData);
export const updatePost = (postData) => API.post("/posts/update", postData);
export const deletePost = (data) => API.post("/posts/delete", data);
export const fetchPostsOfUser = (data) => API.post("/posts/get-posts", data);
export const addPostToUser = (data) =>
  API.post("/posts/add-post-to-user", data); // Banao
export const getPosts = (token) =>
  API.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
