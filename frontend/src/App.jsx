// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Home from "./pages/home";
import { Routes, Route } from "react-router-dom";
import {  createContext,useState } from "react";

import ExtractedText from "./pages/ExtractedText";
export const appContext = createContext("appContext");

function App() {
  // const [count, setCount] = useState(0)
  const [data, setData] = useState();
  const [isLoading,setIsLoading]= useState(true);

  const values={data,setData,isLoading,setIsLoading}
  return (
    <div className="wrapper">
    <appContext.Provider value={values}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/extractedText" element={<ExtractedText />} />
          {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> */}
        </Routes>
    </appContext.Provider>
    </div>
  );
}

export default App;
