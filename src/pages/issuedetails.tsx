import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

type Issue = {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in_progress' | 'resolved'
  created_at: string
}

function IssueDetails() {
  const { id } = useParams()
  const [issue, setIssue] = useState<Issue | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchIssue = async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching issue:', error)
        setLoading(false)
        return
      }

      setIssue(data)
      setLoading(false)
    }

    fetchIssue()
  }, [id])

  const updateStatus = async (
    newStatus: 'open' | 'in_progress' | 'resolved',
  ) => {
    const { error } = await supabase
      .from('issues')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Error updating status:', error)
      return
    }

    setIssue((currentIssue) =>
      currentIssue
        ? {
            ...currentIssue,
            status: newStatus,
          }
        : null,
    )
  }

  if (loading) {
    return <p>Loading issue...</p>
  }

  if (!issue) {
    return <p>Issue not found.</p>
  }

  return (
    <section className="issue-details-section">
      <div className="issue-details-header">
        <div>
          <span className="issue-id">Issue #{issue.id}</span>
          <h2>{issue.title}</h2>
          <p>View and manage this support request.</p>
        </div>

        <Link to="/issues" className="secondary-button">
          <i className="bi bi-arrow-left"></i>
          Back to Issues
        </Link>
      </div>

      <div className="issue-details-card">
        <div className="issue-details-row">
          <span className="detail-label">Description</span>
          <p className="issue-description">{issue.description}</p>
        </div>

        <div className="issue-meta-grid">
          <div className="issue-meta-item">
            <span className="detail-label">Priority</span>

            <span className={`badge priority-${issue.priority}`}>
              {issue.priority.charAt(0).toUpperCase() +
                issue.priority.slice(1)}
            </span>
          </div>

          <div className="issue-meta-item">
            <span className="detail-label">Status</span>

            <span
              className={`badge ${
                issue.status === 'in_progress'
                  ? 'status-progress'
                  : `status-${issue.status}`
              }`}
            >
              {issue.status === 'in_progress'
                ? 'In Progress'
                : issue.status.charAt(0).toUpperCase() +
                  issue.status.slice(1)}
            </span>

            <select
              className="status-select"
              value={issue.status}
              onChange={(event) =>
                updateStatus(
                  event.target.value as
                    | 'open'
                    | 'in_progress'
                    | 'resolved',
                )
              }
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="issue-meta-item">
            <span className="detail-label">Created</span>

            <span>
              {new Date(issue.created_at).toLocaleDateString('en-SG')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IssueDetails