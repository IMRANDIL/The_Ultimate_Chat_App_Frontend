import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full sm:max-w-md bg-white p-6 rounded-md shadow">
        <div className="relative flex flex-col items-center mb-4">
          <img
            src="https://media.giphy.com/media/knC8ISmQysyOs/giphy.gif"
            alt="Logo"
            className="w-32 h-32 rounded-full mx-auto border-4 border-gray-300"
            draggable={false}
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
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mt-4"
          >
            Login
          </button>
        </form>
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
