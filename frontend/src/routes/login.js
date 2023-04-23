import React, { useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { signInWithGoogle } from "../Firebase";
import { useNavigate } from "react-router-dom"
import "./login.css"

export default function Login({ setCurrentDoc }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    /*const response = fetch("/fire", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    if (response.ok){
      console.log("success")
    }*/
    setEmail("");
    setPassword("");
  }

  function handleGoogleSignIn() {
    secondFunction(usersCollectionRef);
  }
  const secondFunction = async (usersCollectionRef) => {
    const result = await signInWithGoogle(usersCollectionRef)
    setCurrentDoc(result)
    navigate("/landingpage");
  }


  return (
    <div className="login">
      <div className="frame">
        <div className="flexWrapper">
          <img
            alt=""
            className="screenshot20230422At12431"
            src="https://static.overlay-tech.com/assets/d9ff1fd6-7b75-4e92-9cb7-ff38584e046c.png"
          />
        </div>
        <b className="interviewAiText">Interview AI</b>
        <button className="signIn" onClick={handleGoogleSignIn}>
          <p className="buttonMessage">Sign In with Google</p>
        </button>
      </div>
      <h1>{localStorage.getItem("name")}</h1>
      <img src={localStorage.getItem("photo")}></img>
    </div>
  );
}
