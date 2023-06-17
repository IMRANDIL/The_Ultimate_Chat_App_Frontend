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
import { RootState, getAccessTokenAsync } from "./redux/authSlice";
import { toast } from "react-toastify";

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
  // const { error } = useSelector((state: RootState) => state.auth.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setAccessToken = async () => {
      try {
        const response = await dispatch(getAccessTokenAsync());
        if (response && response.payload) {
          // toast.success("set accessToken successful");
        } else {
          // toast.error(response.error.message);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    // Function to fetch access token immediately and then every 55 minutes
    const fetchAccessToken = async () => {
      // await setAccessToken();
      const interval = setInterval(setAccessToken, 55 * 60 * 1000);
      return interval;
    };

    // Call the function to start fetching the access token
    const startFetchingAccessToken = async () => {
      const interval = await fetchAccessToken();

      // Clean up the timer when the component unmounts
      return () => {
        clearInterval(interval);
      };
    };

    startFetchingAccessToken();
  }, []);

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
