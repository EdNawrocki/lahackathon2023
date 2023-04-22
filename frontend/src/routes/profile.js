import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {db} from '../Firebase'
import {updateDoc, doc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';

export default function Profile() {
const [company, setCompany] = useState("");
const auth = getAuth()
const current = auth.currentUser;
const handleSubmit = async () => {
    const id = current.id;
    company = company ? company : current.company;
    console.log(current.company)
    console.log(company)
    const userDoc = doc(db, "users", current.email);
    const newFields = {company: company};
    await updateDoc(userDoc, newFields);
    setCompany('')
}

    return (
        <React.Fragment>
            <button onClick={() => {console.log(current.uid)}}>Click Me</button>
            <h1>Set up Your Profile</h1>
            <Form onSubmit={handleSubmit}>
            <h2>What Company are you interviewing with?</h2>
            <input placeholder="Answer Here..." onChange={(e) => setCompany(e.target.value)}>
            </input>
            <h2>What is your greatest weakness?</h2>
            <textarea placeholder="Answer Here...">
            </textarea>
            <Button block size="lg" type="submit">
            SUBMIT
            </Button>
            </Form>

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