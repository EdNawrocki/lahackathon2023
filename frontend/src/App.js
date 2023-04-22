import React, { useState, useEffect } from 'react'
import {Routes, Route, Link} from "react-router-dom"
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



  return (
    <div>
      {current ? 
      (<div><h1>Signed in as: {current.displayName}</h1><button onClick={signOutUser}>Sign Out</button>  </div>) 
      :<Link to='/login'>Login/Signup</Link> }
           <br/>
      <Link to='/profile'>Set up Profile</Link> 
    <Routes>
      <Route path="/"></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
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