import { useState, type SyntheticEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setErrorMessage('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMessage(error.message)
      return
    }

    setLoggedIn(true)
  }

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <i className="bi bi-life-preserver"></i>
          <span>ResolveHub</span>
        </div>

        <h1>Welcome back</h1>
        <p>Sign in to manage your support requests.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && (
            <p className="auth-error">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="primary-button auth-button"
          >
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login