import Sidebar from "../components/Sidebar";
// import CalendarView from "../components/CalendarView";
import PostsFormPage from "./PostsFormPage";

// const Dashboard = () => {
//   const token = localStorage.getItem("token");

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-grow p-4">
//         <Navbar />
//         <PostForm token={token} />
//         <CalendarView token={token} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import PostForm from "./PostForm";
// import CalendarView from "./CalendarView";
import backgroundImage from "../assets/bgimg.png"; // Adjust the path based on your folder structure
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CalendarComponent from "../components/Calender";
import SuggestionsSection from "../components/SuggestionsSection";

const Dashboard = () => {
  const navigate = useNavigate();
  //   const token = localStorage.getItem("token");
  // const redirectToAddPostPage = () => {
  //   navigate("/edit-page", { type: "add" });
  // };

  return (
    <div
      className="flex min-h-screen w-full bg-cover bg-center bg-no-repeat pb-10"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div className="w-[20%] flex-col">
        <Sidebar />
        <SuggestionsSection />
      </div> */}
      <div className="w-[100%] flex-grow px-[13%] pt-[10%] bg-opacity-70">
        {/* Optional: Add opacity for better readability */}
        {/* <Navbar /> */}
        <CalendarComponent />
        <Sidebar />
        <SuggestionsSection />
        {/* <CalendarView token={token} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
