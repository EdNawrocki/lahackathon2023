import React, { useState, useEffect } from 'react'

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
    </div>
  )
}

export default App