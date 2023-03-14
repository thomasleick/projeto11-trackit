import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from "styled-components"
import { AuthProvider } from './context/AuthProvider';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TodayPage from './pages/TodayPage/TodayPage';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/habitos" element={<HabitsPage />} />
            <Route path="/hoje" element={<TodayPage />} />
            <Route path="/historico" element={<HistoryPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;