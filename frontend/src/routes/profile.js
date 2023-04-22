import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {db} from '../Firebase'
import {updateDoc, doc} from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth';
const auth = getAuth();

export default function Profile({currentDoc}) {
const [company, setCompany] = useState("");


function handleSubmit() {
    waitUpdate();   
    console.log(company);
    setCompany('')
}

    const waitUpdate =  async () => { 
        console.log(currentDoc)
        await updateDoc(doc(db, "users", currentDoc), {
        company: company
         });
    }

    return (
        <React.Fragment>
            <button onClick={() => {console.log(currentDoc)}}>Click Me</button>
            <h1>Set up Your Profile</h1>
            <h2>What Company are you interviewing with?</h2>
            <input placeholder="Answer Here..." onChange={(e) => setCompany(e.target.value)}>
            </input>
            <h2>What is your greatest weakness?</h2>
            <textarea placeholder="Answer Here...">
            </textarea>
            <Button block size="lg" onClick={() => {handleSubmit()}}>
            SUBMIT
            </Button>

        </React.Fragment>
    )
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