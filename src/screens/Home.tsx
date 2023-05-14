import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
// import Loader from "../components/Loader";

const Home: React.FC = () => {
  //   const user = useSelector((state: RootState) => state.auth.auth.user);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [userInfo]);

  return (
    <div>
      {userInfo && (
        <div>
          <h1>Welcome, {userInfo.username}</h1>
          <p>Email: {userInfo.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Home;
