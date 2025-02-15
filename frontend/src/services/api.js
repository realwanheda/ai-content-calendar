import axios from "axios";

export const baseURL = import.meta.env.VITE_BACKEND_URL;
const openai = import.meta.env.VITE_OPENAI_API_KEY;

export const API = axios.create({
  baseURL: baseURL,
  // timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${openai}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export const openaiapi = axios.create({
  baseURL: baseURL,
  // timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    authorization: `Bearer ${document.cookie.split(";")}`,
  },
});
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const createPost = (postData) => API.post("/posts/create", postData);
export const updatePost = (postData) => API.post("/posts/update", postData); // Banao
export const deletePost = (data) => API.post("/posts/delete", data); // Banao
export const fetchPostsOfUser = (data) => API.post("/posts/get-posts", data); // Banao
export const addPostToUser = (data) =>
  API.post("/posts/add-post-to-user", data); // Banao
export const getPosts = (token) =>
  API.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
