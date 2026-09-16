import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function CreateIssue() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setSubmitting(true)
    setErrorMessage('')

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      setErrorMessage('You must be signed in to create an issue.')
      setSubmitting(false)
      return
    }

    const { error } = await supabase
      .from('issues')
      .insert({
        title,
        description,
        priority,
        user_id: user.id,
      })

    if (error) {
      console.error('Error creating issue:', error)
      setErrorMessage('Unable to create issue. Please try again.')
      setSubmitting(false)
      return
    }

    navigate('/issues')
  }

  return (
    <section className="create-issue-section">
      <div className="create-issue-header">
        <div>
          <h2>Create New Issue</h2>
          <p>Submit a support request for the team to review.</p>
        </div>
      </div>

      <form className="issue-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Issue Title</label>

          <input
            id="title"
            type="text"
            placeholder="Enter a short issue title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            rows={6}
            placeholder="Describe the issue in detail"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>

          <select
            id="priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            required
          >
            <option value="" disabled>
              Select priority
            </option>

            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {errorMessage && (
          <p className="auth-error">{errorMessage}</p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/issues')}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
            disabled={submitting}
          >
            <i className="bi bi-plus-lg"></i>
            {submitting ? 'Creating...' : 'Create Issue'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateIssue