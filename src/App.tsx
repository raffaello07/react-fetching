import React, { useState } from 'react'
import './App.css'
import Fetch from './Fetch'
import Post from './Post'

function App() {
  const [currentUrl, setCurrentUrl] = useState("https://jsonplaceholder.typicode.com/comments");
  const handleUrlChange = (newurl: string) => {
    console.log(newurl);
    setCurrentUrl(newurl);
  };
  return (
    <div className="app">
     <h1>hello v2</h1>
     <p>Current url: {currentUrl}</p>
     <div>
      <Post handleChange={handleUrlChange}/>
     </div>
     <Fetch apiUrl={currentUrl}/>
    </div>
  )
}

export default App
