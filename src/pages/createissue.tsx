import { useState, type SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

function CreateIssue() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { error } = await supabase
      .from('issues')
      .insert({
      title,
      description,
      priority,
    })

    if (error) {
      console.error('Error creating issue:', error)
      return

    }

    console.log('Issue created successfully')
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
          ></textarea>
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

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/issues')}
          >
            Cancel
          </button>

          <button type="submit" className="primary-button">
            <i className="bi bi-plus-lg"></i>
            Create Issue
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreateIssue