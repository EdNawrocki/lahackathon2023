import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { db } from "../Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { signInWithGoogle } from "../Firebase";
import "./login.css"

export default function Login({ setCurrentDoc }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usersCollectionRef = collection(db, "users");

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
        <button className="signIn" onClick={handleGoogleSignIn}>
          <p className="buttonMessage">Sign In with Google</p>
        </button>
      </div>
      <h1>{localStorage.getItem("name")}</h1>
      <img src={localStorage.getItem("photo")}></img>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>

          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}
