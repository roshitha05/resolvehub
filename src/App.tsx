import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'

import Header from './components/header'
import Sidebar from './components/sidebar'
import CreateIssue from './pages/createissue'
import Dashboard from './pages/dashboard'
import IssueDetails from './pages/issuedetails'
import Issues from './pages/issues'
import Login from './pages/login'
import Register from './pages/register'
import { supabase } from './supabase'

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="page-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/issues/:id" element={<IssueDetails />} />
            <Route path="/new-issue" element={<CreateIssue />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (loading) {
    return <div className="auth-page">Loading ResolveHub...</div>
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          session
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      <Route
        path="/register"
        element={
          session
            ? <Navigate to="/dashboard" replace />
            : <Register />
        }
      />

      <Route
        path="/*"
        element={
          session
            ? <AppLayout />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}

export default App