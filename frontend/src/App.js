import React, { useState, useEffect } from 'react'
import SpeechToText from './components/SpeechToText/SpeechToText'
import {Route, Routes, Link} from 'react-router-dom'
import Login from "./routes/login"
import Profile from "./routes/profile"
import {db} from './Firebase'
import {QuerySnapshot, getDocs, collection, query, where} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

function App() {
  const [data, setData] = useState([{}])
  const [userData, setuserData] = useState([{}])
  const [users, setUsers] = useState([])
  const [currentDoc, setCurrentDoc] = useState("");
  const [response, setResponse] = useState("");
  const usersCollectionRef = collection(db, "users");
  const [profileContext, setProfileContext] = useState("");

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

function testPrompt() {
  console.log(profileContext)
}



  return (
    <div>
      {current ? 
      (<div><h1>Signed in as: {current.displayName}</h1><button onClick={signOutUser}>Sign Out</button>  </div>) 
      :<Link to='/login'>Login/Signup</Link> }
           <br/>
      <Link to='/profile'>Set up Profile</Link><br/>
      <Link to='/some'>SpeechToText</Link>
      <button onClick={() => {testPrompt()}}>TEST BACKEND</button>
    <Routes>
      <Route path="/"></Route>
      <Route path="/login" element={<Login setCurrentDoc={setCurrentDoc} currentDoc={currentDoc}/>}></Route>
      <Route path="/profile" element={<Profile currentDoc={currentDoc} setContext={(profileContext) => {setProfileContext(profileContext)}}/>}></Route>
      <Route path="/some" element={<SpeechToText currentDoc={currentDoc}/>}/>
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
