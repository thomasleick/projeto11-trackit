import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import HabitsPage from './pages/HabitsPage/HabitsPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import HomePage from './pages/HomePage/HomePage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import TodayPage from './pages/TodayPage/TodayPage';
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  const [percentage, setPercentage] = useState(100)

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                <Route path="/habitos" element={<HabitsPage percentage={percentage} />} />
                <Route path="/hoje" element={<TodayPage percentage={percentage} setPercentage={setPercentage}/>} />
                <Route path="/historico" element={<HistoryPage percentage={percentage} />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;