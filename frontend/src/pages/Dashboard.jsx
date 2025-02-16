import backgroundImage from "../svgComponents/bgimg2.png";
import CalendarComponent from "../components/Calender";
import TopBar from "../components/Topbar.jsx";
import { useState, useEffect } from "react";
const Dashboard = () => {
  const [bigScreen, setBigScreen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setBigScreen(window.innerWidth >= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <TopBar />
      <div
        className="flex min-h-screen w-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`w-[100%] flex-grow ${
            bigScreen ? "px-[13%]" : "px-[5%]"
          } pt-[5%] bg-opacity-70`}
        >
          <CalendarComponent />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
