import React, { useState, useEffect } from 'react'
import SpeechToText from './components/SpeechToText/SpeechToText'

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
      {(typeof data.end === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        <p>{data.end}</p>
      )}
      <SpeechToText/>
    </div>
  )
}

export default App