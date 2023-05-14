import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, loginAsync } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.auth.user);
  const isLoading = useSelector(
    (state: RootState) => state.auth.auth.isLoading
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo"); // Remove user info from localStorage
    navigate("/login", { replace: true });
  };

  return (
    <div>
      {user && !isLoading && (
        <div>
          <h1>Welcome, {user.username}</h1>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
