import React, { useState, useEffect } from 'react'
import SpeechToText from './components/SpeechToText/SpeechToText'
import QuestionForm from './components/Form/QuestionForm'
import {Route, Routes} from 'react-router-dom'

function App() {
  const [data, setData] = useState([{}])

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

  return (
    <div>
      {/* {(typeof data.end === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <p>{data.end}</p>
      )} */}
      <Routes>
        <Route path="/some" element={<SpeechToText/>}/>
        <Route path="/question" element={<QuestionForm/>}/>
      </Routes>
    </div>
  )
}

export default App