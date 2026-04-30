import React from 'react'
import { Routes, Route } from 'react-router-dom'

import ButtonAppBar from './components/navbar.jsx'
import Home from './components/home'
import Login from './components/SignIn'
import SignIn from './components/SignIn.jsx'
import Navbar from './components/navbar.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import SignUp from './components/SignUp.jsx'
import NotFound from './components/NotFound.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {

  return (
      <>
      
       <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
      </>
  )
}

export default App