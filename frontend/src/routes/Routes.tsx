import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import { AuthContext } from '../state/AuthContext'
import RegisterPage from '../pages/RegisterPage'
import Favorites from '../pages/Favorites'
import RecipeDetails from '../pages/RecipeDetails'


const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const auth = useContext(AuthContext)
  if (!auth?.token) return <Navigate to="/" replace />
  return children
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
        <Route path="/favorites/:name" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
