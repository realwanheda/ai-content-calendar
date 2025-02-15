import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import CalenderPage from "./pages/CalenderPage";
import PostsFormPage from "./pages/PostsFormPage";
// import openai from "openai";
import ProtectedRoute from "./protectedRoute/protectedRoute";
function App() {
  // const openai = new OpenAIApi({
  //   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  // });
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route
          path="/edit-page"
          element={<ProtectedRoute element={<PostsFormPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
