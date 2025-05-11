import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigator from './components/NavBar';
import RegisterForm from './components/Register';
import LoginForm from './components/LogIn';
import MealPlan from './components/MealPlan';
import CalculatorCalories from './components/CalculatorCalories';
import { useState } from 'react';
import Home from './components/Home';
import GeminiChat from './components/GeminiChat';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <BrowserRouter>
      <Navigator isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/meal-plan" element={isAuthenticated ? 
          (<MealPlan /> ) 
          :  (<Navigate to="/register" replace / >
            
          )} />
        <Route
          path="/calculator"
          element={
            isAuthenticated ? (
              <CalculatorCalories />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />
        <Route
          path="/gemini-chat"
          element={
            isAuthenticated ? (
              <GeminiChat />
            ) : (
              <Navigate to="/register" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
