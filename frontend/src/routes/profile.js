import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {db} from '../Firebase'
import {updateDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth, updateProfile } from 'firebase/auth';

import {Question} from './question'

const auth = getAuth();

export default function Profile({currentDoc}) {
const [company, setCompany] = useState("");
const [weakness, setWeakness] = useState("");
const [strength, setStrength] = useState("");


function handleSubmit() {
    Question(currentDoc, company, "company", setCompany)
    Question(currentDoc, weakness, "weakness", setWeakness)
    Question(currentDoc, strength, "strength", setStrength) 
}

    return (
        <React.Fragment>
            <h1>Set up Your Profile</h1>
            <h2>What Company are you interviewing with?</h2>
            <input placeholder="Answer Here..." onChange={(e) => setCompany(e.target.value)} value={company}>
            </input>
            <h2>What is your greatest weakness?</h2>
            <textarea placeholder="Answer Here..." onChange={(e) => setWeakness(e.target.value)} value={weakness}>
            </textarea>
            <h2>What is your greatest strength?</h2>
            <textarea placeholder="Answer Here..." onChange={(e) => setStrength(e.target.value)} value={strength}>
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