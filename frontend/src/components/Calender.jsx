import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostsOfUser } from "../services/api";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const navigate = useNavigate();
  const [postsList, setPostsList] = useState(null);

  useEffect(() => {
    if (!postsList) handleFetchPostData();
  });

  const handleFetchPostData = async () => {
    const res = await fetchPostsOfUser();
    console.log("fetchPostsOfUser = res.data => ", res.data);
    var tempArr = res.data.posts;
    console.log(tempArr);
    var newArr = [];
    for (var i = 0; i < tempArr?.length; i++) {
      const scheduledDate = new Date(tempArr[i].scheduledDate);
      const startOfDay = new Date(scheduledDate);
      const endOfDay = new Date(scheduledDate);
      endOfDay.setHours(endOfDay.getHours() + 1);

      const obj = {
        title: tempArr[i].title,
        content: tempArr[i].content,
        scheduledDate: tempArr[i].scheduledDate,
        platforms: tempArr[i].platforms,
        _id: tempArr[i]._id,
        id: i + 1,
        start: startOfDay,
        end: endOfDay,
      };
      newArr.push(obj);
    }
    console.log("Final Array => ", newArr);
    setPostsList(newArr);
  };

  const handleSelectEvent = (event) => {
    const queryParams = new URLSearchParams({
      postID: event._id,
      title: event.title,
      content: event.content,
      scheduledDate: event.scheduledDate,
      platforms: event.platforms,
      type: "edit",
    }).toString();

    navigate(`/edit-page?${queryParams}`);
  };

  // 🔹 Define Colors for Different Platforms
  const eventColors = {
    Facebook: "#0077B5",
    X: "222222",
    Instagram: "#E1306C",
    LinkedIn: "#0077B5",
    Default: "#fc107b", // Green for other platforms
  };

  // 🔹 Apply Custom Colors to Events
  const eventPropGetter = (event) => {
    const platform = event.platforms?.[0] || "Default"; // Pick first platform if multiple
    const backgroundColor = eventColors[platform] || eventColors.Default;

    return {
      style: {
        backgroundColor,
        color: "#fff", // White text for readability
        borderRadius: "5px",
        padding: "5px",
        border: "none",
      },
    };
  };

  return (
    <div className="bg-white p-3 rounded-xl">
      {postsList && (
        <Calendar
          localizer={localizer}
          events={postsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventPropGetter} // ✅ Apply Custom Styling
        />
      )}
    </div>
  );
};

export default CalendarComponent;
