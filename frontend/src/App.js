import React, { useState, useEffect } from 'react'
import SpeechToText from './components/SpeechToText/SpeechToText'
import QuestionForm from './components/Form/QuestionForm'
import {Route, Routes} from 'react-router-dom'

function App() {
  const [data, setData] = useState([{}])
  const [count, setCount] = useState(0);

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

      <Routes>
        <Route path="/some" element={<SpeechToText/>}/>
        <Route path="/question" element={<QuestionForm/>}/>
      </Routes>
    </div>
  )
}

export default App