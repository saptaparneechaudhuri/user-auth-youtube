import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import SignUp from "../../components/sign-up/SignUp";
import SignIn from "../../components/sign-in/SignIn";

import "./Home.css";

const Home = () => {
  const location = useLocation();
  // console.log(location);
  return (
    <section className="home-container">
      <div className="content-container">
        <header className="content-header">
          <div className="logo">CodeBrew</div>
          {location.pathname === "/" ? (
            <p>
              Don't have an account?{" "}
              <Link className="link" to="/sign-up">
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link className="link" to="/">
                Sign In
              </Link>
            </p>
          )}
        </header>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>

      <div className="image-container"></div>
    </section>
  );
};

export default Home;
