import React from "react";
import { useNavigate, Link } from "react-router-dom";
import './LandingPage.css';
import { getAuth } from "firebase/auth";

const LandingPage = () => {
  const navigate = useNavigate();

  function navigateToProfile(){
    navigate('/profile')
  }

  function navigateToSTT(){
    navigate('/some')
  }

  const auth = getAuth();
  const current = auth.currentUser;

  const signOutUser = () => {
    navigate('/login')
    auth.signOut().then(
      function () {
        console.log("Signed Out");
        localStorage.setItem("name", "");
        localStorage.setItem("email", "");
        localStorage.setItem("photo", "");
      },
      function (error) {
        console.error("Sign Out Error", error);
      },
    );
  };

  return (
    <div className="login">
      {current ? (
        <div className="button">
          <button className="button" onClick={signOutUser}>Sign Out</button>
        </div>
      ) : (
        <Link to="/login"></Link>
      )}
      <ul>
        <li><Link to="/landingpage">Home</Link></li>
        <li><Link to="/some">Training</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="frame">
        <div className="flexWrapperOne">
          <img
            alt=""
            className="screenshot20230422At12431"
            src="https://static.overlay-tech.com/assets/d9ff1fd6-7b75-4e92-9cb7-ff38584e046c.png"
          />
        </div>
        <b className="interviewAi">Interview AI</b>
        <button className="profileButton" onClick={navigateToProfile}>
          <p className="buttonMessage">Building my profile</p>
        </button>
        <button className="prepButton" onClick={navigateToSTT}>
          <p className="buttonMessage">Preparing for an interview</p>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
