import React, { useEffect } from "react";
import "./welcome.css";
import { useNavigate } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice";

// Google
import { GoogleLogout } from "react-google-login";

const WelcomePage = () => {
  const { user, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    if (!user) {
      navigate("/");
    }

    return () => {
      dispatch(reset());
    };
  }, [error, user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const username = user ? (user.name ? user.name : user.data.user.name) : null;
  return (
    <section className="welcome-container">
      <h1 className="welcome-header">
        Welcome <span>{username}!</span>
      </h1>
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </section>
  );
};

export default WelcomePage;
