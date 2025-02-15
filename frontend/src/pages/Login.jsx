import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bgimg.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });

      if (res.status === 200) {
        localStorage.setItem("userData", res.data.user._id);
        navigate("/dashboard", { replace: true });
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-gray-50 p-8 rounded-2xl shadow-2xl w-[28rem] border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Welcome Back
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-600 transition font-semibold mt-3"
        >
          Login
        </button>

        {/* Register Redirect */}
        <p className="text-center text-gray-600 mt-4">
          New User?{" "}
          <span
            className="text-blue-500 cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/register")}
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
