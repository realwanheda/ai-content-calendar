import React, { useState, useEffect } from "react";
import CalendarIconComp from "../svgComponents/CalendarIcon";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { logoutUser } from "../services/api";

export default function TopBar({
  heading = "Social Media Calendar",
  log = "in",
}) {
  const [bigScreen, setBigScreen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setBigScreen(window.innerWidth >= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  const [hoverOn, setHoverOn] = useState(false);
  const navToAddPostPage = () => {
    navigate("/edit-page", { type: "add" });
  };
  const navToHomePage = () => {
    navigate("/dashboard", { replace: true });
  };

  const logout = async () => {
    const res = await logoutUser();
    if (res.status === 200) {
      navigate("/login", { replace: true });
    } else console.error(res.message);
  };

  return (
    <div className="h-20 w-full flex justify-between items-center bg-white px-5 shadow-2xl shadow-gray-400 ">
      <div
        onClick={navToHomePage}
        className="flex flex-row justify-start items-center cursor-pointer"
      >
        <CalendarIconComp
          height={bigScreen ? 55 : 40}
          width={bigScreen ? 55 : 40}
        />
        <h1
          className={`font-semibold ${
            bigScreen ? "text-[1.6rem] ml-2" : "text-[1.2rem] ml-1"
          }`}
        >
          {heading}
        </h1>
      </div>

      {log == "in" && (
        <div className="flex flex-row justify-start items-center">
          {location.pathname != "/edit-page" && bigScreen && (
            <div
              onClick={navToAddPostPage}
              onMouseEnter={() => setHoverOn(true)}
              onMouseLeave={() => setHoverOn(false)}
              className={`flex flex-row justify-start items-center ${
                hoverOn ? "bg-yellow-400" : "bg-white"
              } py-2 px-5 rounded-full cursor-pointer`}
            >
              <FaPlus size={26} color={hoverOn ? "white" : "gold"} />
              <p className="font-semibold text-[1.2rem] ml-3">New Post</p>
            </div>
          )}
          {location.pathname != "/edit-page" && !bigScreen && (
            <div
              onClick={navToAddPostPage}
              data-tooltip-id="add-post-tooltip"
              onMouseEnter={() => setHoverOn(true)}
              onMouseLeave={() => setHoverOn(false)}
              className={`flex flex-row justify-start items-center bg-yellow-400 py-2 px-2 rounded-full cursor-pointer`}
            >
              <FaPlus size={20} color={"white"} />
              <Tooltip
                id="add-post-tooltip"
                place="bottom"
                content="Add Post"
              />
            </div>
          )}
          <div
            onClick={logout}
            className="p-3 bg-red-500 rounded-full ml-2 cursor-pointer"
            data-tooltip-id="logout-tooltip"
          >
            <FaSignOutAlt size={bigScreen ? 20 : 15} color="white" />
            <Tooltip id="logout-tooltip" place="bottom" content="Log Out" />
          </div>
        </div>
      )}
    </div>
  );
}
