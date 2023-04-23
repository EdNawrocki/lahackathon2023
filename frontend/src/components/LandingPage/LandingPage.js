import React from "react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css'

const LandingPage = () => {
  const navigate = useNavigate();

  function navigateToProfile(){
    navigate('/profile')
  }

  function navigateToSTT(){
    navigate('/some')
  }

  return (
    <div className="login">
      <div className="frame">
        <div className="flexWrapperOne">
          <img
            alt=""
            className="screenshot20230422At12431"
            src="https://static.overlay-tech.com/assets/d9ff1fd6-7b75-4e92-9cb7-ff38584e046c.png"
          />
        </div>
        <b className="interviewAi">Interview AI</b>
        <button className="signIn" onClick={navigateToProfile}>
          <p className="buttonMessage">Prepping for interview</p>
        </button>
        <button className="signIn" onClick={navigateToSTT}>
          <p className="buttonMessage">I have an interview</p>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
