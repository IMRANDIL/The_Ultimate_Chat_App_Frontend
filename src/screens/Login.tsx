import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, loginAsync } from "../redux/authSlice";
import fallbackImg from "../assets/fallback.jpg";
import Loader from "../components/Loader";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const dispatch: any = useDispatch();

  const { isLoading } = useSelector((state: RootState) => state.auth.auth);

  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    try {
      const response = await dispatch(loginAsync({ email, password }));
      if (
        response &&
        response.payload &&
        response.payload.email &&
        response.payload.username
      ) {
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error(response.error.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      {isLoading && <Loader />}
      <div className="w-full sm:max-w-md bg-white p-6 rounded-md shadow">
        <div className="relative flex flex-col items-center mb-4">
          <img
            src="https://media.giphy.com/media/knC8ISmQysyOs/giphy.gif"
            alt="Logo"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300"
            draggable={false}
            onError={(e) => {
              e.currentTarget.src = fallbackImg; // Replace with the fallback image URL
            }}
          />
          <h1 className="text-2xl font-bold mt-2">Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={password && showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                onClick={handleTogglePassword}
                disabled={!password}
              >
                {password && showPassword ? (
                  <i className="fas fa-eye"></i>
                ) : (
                  <i className="fas fa-eye-slash"></i>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-4"
            disabled={!email || !password}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
