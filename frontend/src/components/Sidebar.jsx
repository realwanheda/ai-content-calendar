import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const navToAddPostPage = () => {
    navigate("/edit-page", { type: "add" });
  };
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/login", { replace: true });
  };
  return (
    <aside className="w-[100%] my-6">
      <ul>
        <li
          onClick={() => navToAddPostPage()}
          className="p-3 bg-white rounded-2xl my-2 text-center"
        >
          <a>➕ New Post</a>
        </li>
        <li
          onClick={() => logout()}
          className="p-3 bg-red-400 rounded-2xl my-2 text-center font-semibold text-white"
        >
          <a>Logout</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
