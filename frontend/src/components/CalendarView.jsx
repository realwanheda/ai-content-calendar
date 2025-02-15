import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

const CalendarView = ({ token }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await getPosts(token);
      setPosts(res.data);
    }
    fetchPosts();
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">📅 Scheduled Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="border p-2 my-2">
          {post.content} - {new Date(post.scheduledDate).toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default CalendarView;
