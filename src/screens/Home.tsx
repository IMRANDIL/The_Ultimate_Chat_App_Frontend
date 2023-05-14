import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Home: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate, userInfo]);

  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-2xl font-bold mb-4">Chat App</h1>
        <h2 className="text-xl font-bold mb-2">User List</h2>
        {/* Render user list here */}
      </div>
      <div className="flex-grow bg-white p-4 flex flex-col">
        <div className="flex justify-end">
          <div
            className="relative"
            onClick={toggleLogout}
            onBlur={() => setShowLogout(false)}
            tabIndex={0}
          >
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 5a5 5 0 110 10A5 5 0 015 5zm1.49 5.12a.75.75 0 010-1.49h5.26a.75.75 0 010 1.49H6.49zM10 2.75a7.25 7.25 0 110 14.5A7.25 7.25 0 0110 2.75zm0 1.5a5.75 5.75 0 100 11.5A5.75 5.75 0 0010 4.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {showLogout && (
              <div className="absolute top-full right-0 mt-2 bg-white w-36 rounded shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="overflow-y-auto flex-grow">
            <h1 className="text-2xl font-bold mb-4">
              Welcome, {userInfo && userInfo.username}
            </h1>
            <p className="mb-4">Email: {userInfo && userInfo.email}</p>
            <div className="flex flex-col">
              {/* Render chat messages here */}
              {chatMessages.map((msg, index) => (
                <p key={index} className="mb-2">
                  {msg}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-center">
              <input
                type="text"
                className="border border-gray-400 px-4 py-2 rounded w-3/4"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
