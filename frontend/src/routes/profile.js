import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {db} from '../Firebase'
import {updateDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from "react-router-dom";
import {Question} from './question'
import './profile.css'

const auth = getAuth();

export default function Profile({currentDoc, setContext}) {
const usersCollectionRef = collection(db, "users");
const [company, setCompany] = useState("");
const [weakness, setWeakness] = useState("");
const [strength, setStrength] = useState("");
const [experience, setExperience] = useState("");
const [values, setValues] = useState("");
const navigate = useNavigate();
const current = auth.currentUser;

const establishProfileContext = async () => {
    console.log(currentDoc)
    console.log("Searching for this id in database")
    const q = query(usersCollectionRef, where("id", "==", currentDoc))
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    console.log("Current User: ", data);
    return data;
    // Users with > 1 book:  [ { id: 'user-1', count: 1 } ] 
};


const handleSubmit = async () => {
    await Question(currentDoc, company, "company", setCompany)
    await Question(currentDoc, weakness, "weakness", setWeakness)
    await Question(currentDoc, strength, "strength", setStrength) 
    await Question(currentDoc, experience, "experiences", setExperience) 
    await Question(currentDoc, values, "values", setValues) 
    await establishProfileContext().then((data) => {
        const company = data[0]['company']
        const strength = data[0]['strength']
        const weakness = data[0]['weakness']
        const experiences = data[0]['experiences']
        const value = data[0]['values']
        const prompt = `
        You are an ai assistant to help me prepare for my interview. The next few questions will
        be my responses to various interview questions. Here is additional context: 
        I am applying to ` + company + `. My greatest strength is ` + strength + `. 
        My greatest weakness is ` + weakness + `. Here is a brief list of my accomplishments
        and experience: ` + experiences + `. Lastly here are some company values.` 
        + value + `Please use this information to help give feedback
        on my responses.`
        console.log(prompt)
        setContext(prompt);
        localStorage.setItem('prompt', prompt);
    }
    )
    
}

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
              <div className="buttonDiv">
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
            <h1>Set up Your Profile</h1>
            <h2>What Company are you interviewing with?</h2>
            <input rows="10" cols="40" placeholder="Answer Here..." onChange={(e) => setCompany(e.target.value)} value={company}>
            </input>
            <h2>What is your greatest weakness?</h2>
            <textarea rows="5" cols="100" placeholder="Answer Here..." onChange={(e) => setWeakness(e.target.value)} value={weakness}>
            </textarea>
            <h2>What is your greatest strength?</h2>
            <textarea rows="5" cols="100" placeholder="Answer Here..." onChange={(e) => setStrength(e.target.value)} value={strength}>
            </textarea>
            <h2>Please list some accomplishments and experience relevant to the position.</h2>
            <textarea rows="5" cols="100" placeholder="Answer Here..." onChange={(e) => setExperience(e.target.value)} value={experience}>
            </textarea>
            <h2>Please share some company values.</h2>
            <textarea rows="5" cols="100" placeholder="Answer Here..." onChange={(e) => setValues(e.target.value)} value={values}>
            </textarea>
            <Button className="submit" block size="lg" onClick={() => {handleSubmit()}}>
            SUBMIT
            </Button>

        </React.Fragment>
    )
}