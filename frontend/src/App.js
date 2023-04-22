import React, { useState, useEffect } from 'react'

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
      ): (
        <p>{data.end}</p>
      )}
    </div>
  )
}

export default App