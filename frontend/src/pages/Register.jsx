import { useState, useContext, useEffect } from "react";
import { registerUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../svgComponents/bgimg2.png";
import TopBar from "../components/Topbar.jsx";

const Register = () => {
  const [bigScreen, setBigScreen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setBigScreen(window.innerWidth >= 600);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const [errorOn, setErrorOn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (email == "" || password == "") {
      setErrorOn(true);
      setErrorMessage("All fields are required");
      return;
    } else if (password.length < 8) {
      setErrorOn(true);
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    try {
      const res = await registerUser({ email, password });
      if (res.status === 200) {
        setUser({ token: res.data.token });
        navigate("/dashboard", { replace: true }); // Redirect to dashboard after successful registration
      } else {
        setErrorOn(true);
        setErrorMessage("Invalid Email or Password !");
        throw new Error(res.message);
      }
    } catch (error) {
      setErrorOn(true);
      setErrorMessage("Failed to register user !");
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    if (errorOn) setErrorOn(false);
  }, [email, password]);

  return (
    <>
      <TopBar log={"out"} />
      <div
        className="h-screen flex justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "repeat",
          minHeight: "600px",
        }}
      >
        <div
          className={`flex items-center justify-center flex-col bg-gray-50 p-8 my-30 rounded-2xl shadow-2xl w-[500px] w-min-[400px] ${
            bigScreen ? "" : " mx-5"
          } h-[400px] h-min-[300px] border border-gray-200`}
        >
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

          {errorOn && (
            <p className="text-red-500 text-left w-full">{errorMessage}</p>
          )}

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="bg-[#6556b8] text-white p-3 w-full rounded-lg hover:bg-[#4a3e8e] transition font-semibold mt-3"
          >
            Register
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-[#6556b8] cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
