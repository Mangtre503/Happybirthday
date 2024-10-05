import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Happy from './Happy';
import CanvasAnimation from './HappyBirthday';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/happy" element={<Happy />} />  
    <Route path="/happyBirthday" element={<CanvasAnimation />} /> 
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
