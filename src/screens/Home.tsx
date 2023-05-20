import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import ChatForm from "../components/ChatForm";
import MessageContainer from "../components/MessageContainer";

const Home: React.FC = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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

        <div ref={userListRef}>
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
        {/* create roomlist here */}
      </div>
      {/* create chat form here */}
      <div className="relative h-full w-5/6">
        <ChatForm />
      </div>
      {/* put meessge to chatArea */}
    </div>
  );
};

export default Home;
