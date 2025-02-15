import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navToAddPostPage = () => {
    navigate("/edit-page", { type: "add" });
  };

  return (
    <aside className="w-[100%] my-6">
      <ul>
        <li
          onClick={() => navToAddPostPage()}
          className="p-3 bg-white rounded-2xl my-2"
        >
          <a>➕ New Post</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
