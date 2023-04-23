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
  const [data, setData] = useState([{}]);
  const [count, setCount] = useState(0);
  const [userData, setuserData] = useState([{}]);
  const [users, setUsers] = useState([]);
  const [currentDoc, setCurrentDoc] = useState("");
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    fetch("/fire")
      .then((res) => res.json())
      .then((userData) => {
        setuserData(userData);
        console.log(userData);
      });
  }, []);
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
    <div>
      <Routes>
        <Route path="/"></Route>
        <Route
          path="/login"
          element={<Login setCurrentDoc={setCurrentDoc} />}
        />
        <Route path="/profile" element={<Profile currentDoc={currentDoc} />} />
        <Route path="/some" element={<SpeechToText />} />
        <Route path="/landingpage" element={<LandingPage/>} />
      </Routes>
    </div>
  );
}

export default App;
