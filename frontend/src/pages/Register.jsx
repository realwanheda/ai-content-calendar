import { useState, useContext } from "react";
import { registerUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bgimg.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await registerUser({ email, password });
      console.log(res);
      setUser({ token: res.data.token });
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      console.error("Error registering user:", error);
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
          Create an Account
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full my-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        />

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="bg-green-500 text-white p-3 w-full rounded-lg hover:bg-green-600 transition font-semibold mt-3"
        >
          Register
        </button>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-green-500 cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/login")}
          >
            Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
