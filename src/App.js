import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from "styled-components"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/cadastro" element={<></>} />
          <Route path="/habitos" element={<></>} />
          <Route path="/hoje" element={<></>} />
          <Route path="/historico" element={<></>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;