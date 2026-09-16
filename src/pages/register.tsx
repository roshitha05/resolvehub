import { useState, type SyntheticEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { supabase } from '../supabase'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [registered, setRegistered] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleRegister = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setErrorMessage('')
    setSubmitting(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    if (error) {
      setErrorMessage(error.message)
      setSubmitting(false)
      return
    }

    setRegistered(true)
  }

  if (registered) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <i className="bi bi-life-preserver"></i>
          <span>ResolveHub</span>
        </div>

        <h1>Create account</h1>
        <p>Register to start managing support requests.</p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="register-email">
              Email
            </label>

            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Create a password"
              minLength={6}
              required
            />
          </div>

          {errorMessage && (
            <p className="auth-error">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="primary-button auth-button"
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Register