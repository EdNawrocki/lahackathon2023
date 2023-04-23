import React, { useState, useEffect } from "react";
import SpeechToText from "./components/SpeechToText/SpeechToText";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./routes/login";
import Profile from "./routes/profile";
import { db } from "./Firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const [data, setData] = useState([{}])
  const [userData, setuserData] = useState([{}])
  const [users, setUsers] = useState([])
  const [profileContext, setProfileContext] = useState("");
  const [currentDoc, setCurrentDoc] = useState("");
  const [response, setResponse] = useState("");
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  const auth = getAuth();
  const current = auth.currentUser;


  return (
    <div>
      <Routes>
        <Route path="/"></Route>
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
