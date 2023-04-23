import React, { useState } from "react";
import SpeechToText from "./components/SpeechToText/SpeechToText";
import { Route, Routes, useNavigate, Link, Navigate } from "react-router-dom";
import Login from "./routes/login";
import Profile from "./routes/profile";
import { db } from "./Firebase";
import { collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import LandingPage from "./components/LandingPage/LandingPage";
import './navbar.css'

function App() {
  const [profileContext, setProfileContext] = useState("");
  const [currentDoc, setCurrentDoc] = useState("");

  const auth = getAuth();

  return (
    <div>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<Login setCurrentDoc={setCurrentDoc} />}
        />
        <Route path="/profile" element={<Profile currentDoc={currentDoc} setContext={setProfileContext} />} />
        <Route path="/some" element={<SpeechToText currentDoc={currentDoc} />} />
        <Route path="/landingpage" element={<LandingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
