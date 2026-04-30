import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, profile, loading } = useAuth()

  if (loading) return null // or a loader component

  if (!user) return <Navigate to="/signin" replace />

  if (requireAdmin) {
    const isAdmin = profile && profile.role === 'admin'
    if (!isAdmin) return <Navigate to="/" replace />
  }

  return children
}