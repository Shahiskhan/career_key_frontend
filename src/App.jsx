import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/Auth/LoginPage'
import SignupPage from './pages/Auth/SignupPage'
import VerifierPortal from './pages/VerifierPortal'
import StudentPortal from './pages/StudentPortal'
import UniversityPortal from './pages/UniversityPortal'
import HecPortalPage from './pages/HecPortalPage'
import UniversityRegister from './pages/hec/UniversityRegister'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Student Routes */}
          <Route
            path="/student-portal"
            element={
              <ProtectedRoute allowedRoles={['ROLE_STUDENT']}>
                <StudentPortal />
              </ProtectedRoute>
            }
          />

          {/* Protected University Routes */}
          <Route
            path="/university-portal"
            element={
              <ProtectedRoute allowedRoles={['ROLE_UNIVERSITY']}>
                <UniversityPortal />
              </ProtectedRoute>
            }
          />

          {/* Protected HEC Routes */}
          <Route
            path="/hec-portal"
            element={
              <ProtectedRoute allowedRoles={['ROLE_HEC']}>
                <HecPortalPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hec/register-university"
            element={
              <ProtectedRoute allowedRoles={['ROLE_HEC']}>
                <UniversityRegister />
              </ProtectedRoute>
            }
          />

          {/* Verifier Portal - assuming it might need protection too, 
              but role not specified in prompt. Keeping it open or 
              assigning to a hypothetical role if needed. */}
          <Route path="/verifier-portal" element={<VerifierPortal />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

