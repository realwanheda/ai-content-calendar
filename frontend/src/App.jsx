import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PostsFormPage from "./pages/PostsFormPage";
import Register from "./pages/Register";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import UnProtectedRoute from "./protectedRoute/UnProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnProtectedRoute element={<Login />} />} />
        <Route
          path="/register"
          element={<UnProtectedRoute element={<Register />} />}
        />
        <Route
          path="/login"
          element={<UnProtectedRoute element={<Login />} />}
        />

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
