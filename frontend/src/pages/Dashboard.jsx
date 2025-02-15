import Sidebar from "../components/Sidebar";
import backgroundImage from "../assets/bgimg.png";
import CalendarComponent from "../components/Calender";
const Dashboard = () => {
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
      <div className="w-[100%] flex-grow px-[13%] pt-[10%] bg-opacity-70">
        <CalendarComponent />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
