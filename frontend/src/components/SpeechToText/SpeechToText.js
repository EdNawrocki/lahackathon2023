import React, { useState, useEffect } from "react";
import "./SpeechToText.css";


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continous = true;
mic.interimResults = true;
mic.lang = "en-US";

const SpeechToText = ({currentDoc}) => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [savedNotes, setSavedNotes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [response, setResponse] = useState("");

  useEffect(() => {
    handleListen();
    // eslint-disable-next-line
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      //console.log(transcript);
      setNote(transcript);
      setCurrentQuestion(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const handleSaveNote = () => { 
    setSavedNotes([note]); 
    console.log("current Question:")
    console.log(currentQuestion)
    setResponse('');
    GPT();

  };

  const GPT = async () => {
    const response = await fetch("/api", {
      method: 'POST',
      body: JSON.stringify({
      question: currentQuestion,
      context: localStorage.getItem('prompt'),
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
      setCurrentQuestion('');
    })
  }

  return (
    <>
      <div className="container">
        <div className="question_box">
          <h2>Question</h2>
          <p>{savedNotes.join()}</p>
        </div>
        <div className="answer_box">
          <h2>Answer</h2>
          <p>{response}</p>
        </div>
        <div className="controller_box">
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
      </div>
    </>
  );
};

export default SpeechToText;
