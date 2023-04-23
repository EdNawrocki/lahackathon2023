import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { db } from "../Firebase";
import {
  updateDoc,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { Question } from "./question";

const auth = getAuth();

export default function Profile({ currentDoc }) {
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    //const data = db.collection('users').doc(currentDoc).get()
    //const snapshot =  getDocs(data);
    Question(currentDoc, company, "company", setCompany);
    //waitUpdate();
    //console.log(company);
  }

  const waitUpdate = async () => {
    console.log(currentDoc);
    await updateDoc(doc(db, "users", currentDoc), {
      company: company,
    });
  };

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
    <React.Fragment>
      {current ? (
        <div className="button">
          <button className="button" onClick={signOutUser}>
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/login"></Link>
      )}
      <h1>Set up Your Profile</h1>
      <h2>What Company are you interviewing with?</h2>
      <input
        placeholder="Answer Here..."
        onChange={(e) => setCompany(e.target.value)}
      ></input>
      <h2>What is your greatest weakness?</h2>
      <textarea placeholder="Answer Here..."></textarea>
      <Button
        block
        size="lg"
        onClick={() => {
          handleSubmit();
        }}
      >
        SUBMIT
      </Button>
    </React.Fragment>
  );
}

/*
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
*/
