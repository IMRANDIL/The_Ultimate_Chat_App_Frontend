import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import Home from "./screens/Home";
import ForgotPasswordForm from "./screens/ForgotPassword";
import ResetPasswordForm from "./screens/ResetPassword";
import NotFound from "./screens/NotFound";
import InternetConnectionNotAvailable from "./screens/InternetConnectionNotAvailable";
import { useDispatch, useSelector } from "react-redux";
import { RootState, getAccessTokenAsync, logout } from "./redux/authSlice";
import { toast } from "react-toastify";
import { clearStore } from "./redux/chatSlice";

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div>
        <InternetConnectionNotAvailable />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicHandler>
              <LoginScreen />
            </PublicHandler>
          }
        />
        <Route
          path="/register"
          element={
            <PublicHandler>
              <RegisterScreen />
            </PublicHandler>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicHandler>
              <ForgotPasswordForm />
            </PublicHandler>
          }
        />
        <Route
          path="/reset-password/:resetToken"
          element={
            <PublicHandler>
              <ResetPasswordForm />
            </PublicHandler>
          }
        />
        <Route
          path="/"
          element={
            <PrivateHandler>
              <Home />
            </PrivateHandler>
          }
        />
        <Route path="*" element={<NotFound />} /> // Added route for NotFound
        component
      </Routes>
    </Router>
  );
};

const PrivateHandler: React.FC = (props: any) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await dispatch(getAccessTokenAsync());
        if (response && response.payload) {
          // Access token refreshed successfully
        } else if (response.error.message === "Refresh token is required") {
          dispatch(logout());
          dispatch(clearStore());
        } else {
          toast.error(response.error.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
    const loggedInAt = new Date(userInfo.loggedInAt).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - loggedInAt;
    const initialDelay = Math.max(0, 55 * 60 * 1000 - timeDiff);

    const interval = setInterval(refreshAccessToken, 55 * 60 * 1000);

    // Call the function immediately to refresh access token after initial delay
    setTimeout(refreshAccessToken, initialDelay);

    // Clean up the interval when the component unmounts or when the `userInfo.loggedInAt` changes.
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  if (userInfo && userInfo.email) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

const PublicHandler: React.FC = (props: any) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  if (userInfo && userInfo.email) {
    return <Navigate to="/" />;
  } else {
    return props.children;
  }
};

export default App;
