import React from "react";
import LoginForm from "./LoginForm";
import "./LoginPage.css"

const LoginPage = () => {


  return (
    <div>
      <div className="login-page-container">
        <div className="left-image">

          <img
            src={
              "https://cdn.robinhood.com/assets/generated_assets/webapp/632fcb3e7ed928b2a960f3e003d10b44.jpg"
            }
            alt="login"
          />
        </div>
        <div className="right-login-container">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
