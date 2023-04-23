import React, { useState, useEffect } from 'react'
import SpeechToText from './components/SpeechToText/SpeechToText'
import {Route, Routes, Link} from 'react-router-dom'
import Login from "./routes/login"
import Profile from "./routes/profile"
import {db} from './Firebase'
import {collection, getDocs} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

function App() {
  const [data, setData] = useState([{}])
  const [count, setCount] = useState(0);
  const [userData, setuserData] = useState([{}])
  const [users, setUsers] = useState([])
  const [currentDoc, setCurrentDoc] = useState("");
  const [response, setResponse] = useState("");
  const usersCollectionRef = collection(db, "users");

  useEffect(()=> {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }
    getUsers();
  }, []);


  useEffect(() => {
    fetch("/api").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  useEffect(() => {
    fetch("/fire").then(
      res => res.json()
    ).then(
      userData => {
        setuserData(userData)
        console.log(userData)
      }
    )
  }, [])
  const auth = getAuth()
  const current = auth.currentUser;

  const signOutUser = () => {
    auth.signOut().then(function() {
      console.log('Signed Out');
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      localStorage.setItem("photo", "");
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

const testBackend = async () => {
  const response = await fetch("/api", {
    method: 'POST',
    body: JSON.stringify({
    question: "How confident are you in your job?",
    }),
    headers: {
    'Content-type': 'application/json; charset=UTF-8',
  }
  }).then(function(response){ 
    return response.json()
  }).then(function(data){
    console.log(data['result'])
    const ans = JSON.stringify(data['result'])
    setResponse(JSON.stringify(data['result']))
  })
}

  return (
    <div>
      {current ? 
      (<div><h1>Signed in as: {current.displayName}</h1><button onClick={signOutUser}>Sign Out</button>  </div>) 
      :<Link to='/login'>Login/Signup</Link> }
           <br/>
      <Link to='/profile'>Set up Profile</Link><br/>
      <Link to='/some'>SpeechToText</Link>
      <button onClick={testBackend}>TEST BACKEND</button>
      <h1>{response}</h1>
    <Routes>
      <Route path="/"></Route>
      <Route path="/login" element={<Login setCurrentDoc={setCurrentDoc}/>}></Route>
      <Route path="/profile" element={<Profile currentDoc={currentDoc}/>}></Route>
      <Route path="/some" element={<SpeechToText/>}/>
    </Routes>
    </div>
  )
} 

export default App

      /*
      {(typeof data.end === 'undefined') ? (
        <p>Loading...</p>
      ): (
        <p>{data.end}</p>
      )}
      <button onClick={async () => {
        setCount(count + 1);
        const response = await fetch("/api", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(count)
        })
        if (response.ok){
          console.log("success")
        }
      }}>BUTTON</button>
      {(typeof userData === 'undefined') ? (
        <p>Loading...</p>
      ): (
        <p>{userData[count]["username"]}</p>
      )}
      
           
      */
