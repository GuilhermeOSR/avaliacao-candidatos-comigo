//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
import Dashboard from './pages/Dashboard';
import PrivateRoute from "./components/PrivateRoute";
import Users from './pages/Users'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
       <Routes>
        {/* Login sempre aberto */}
        <Route path="/login" element={<Login />} />

        {/* Rota protegida: qualquer usuário logado */}
        <Route
          path="/"
          element={
            <PrivateRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rota protegida: só ADMIN */}
        <Route
          path="/users"
          element={
            <PrivateRoute allowedRoles={["ADMIN"]}>
              <Users />
            </PrivateRoute>
          }
        />

        {/* Catch-all → qualquer rota inválida */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
