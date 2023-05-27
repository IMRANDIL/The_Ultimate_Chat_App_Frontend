import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import Home from "./screens/Home";
import ForgotPasswordForm from "./screens/ForgotPassword";
import ResetPasswordForm from "./screens/ResetPassword";
import NotFound from "./screens/NotFound";

const App: React.FC = () => {
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
