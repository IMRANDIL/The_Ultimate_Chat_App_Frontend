import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Home: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showLogout, setShowLogout] = useState(false);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const userListRef = useRef(null);

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

  // const toggleLogout = () => {
  //   setShowLogout((prevState) => !prevState);
  // };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setChatMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userListRef.current && !userListRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/6 bg-gray-200 p-4 relative">
        <div
          className="w-20 h-20 bg-gray-500 rounded-full cursor-pointer absolute left-1/2 transform -translate-x-1/2  flex items-center justify-center"
          onClick={() => setShowLogout((showLogout) => !showLogout)}
        >
          <img
            src="https://media.giphy.com/media/UrzZ4TmQK17yJpYPIL/giphy.gif"
            alt="Logout"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* <h1 className="text-2xl font-bold mb-4">Chat App</h1>
        <h2 className="text-xl font-bold mb-2">User List</h2> */}
        {/* Render user list here */}
        <div className="relative" ref={userListRef}>
          {showLogout && (
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-md shadow-lg">
              <button
                className="block w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white p-4 relative">
        {/* Chat window */}
        <div className="chat-window h-full border rounded-lg overflow-y-auto">
          {/* Render chat messages here */}
          {chatMessages.map((message, index) => (
            <div key={index} className="p-5 m-5 border flex-1">
              <p className="text-gray-800">{message}</p>
            </div>
          ))}
        </div>
        {/* Input field */}
        <div className="absolute inset-x-0 mx-auto bottom-10  w-4/5">
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              className="ml-2 bg-blue-500 text-white px-9 py-3 rounded-md"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
