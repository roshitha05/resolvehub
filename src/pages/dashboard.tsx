import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

type Issue = {
  id: number
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in_progress' | 'resolved'
  created_at: string
  user_id: string
}

function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching dashboard issues:', error)
        setErrorMessage('Unable to load dashboard data.')
        setLoading(false)
        return
      }

      setIssues(data ?? [])
      setLoading(false)
    }

    fetchIssues()
  }, [])

  const openIssues = issues.filter(
    (issue) => issue.status === 'open',
  ).length

  const inProgressIssues = issues.filter(
    (issue) => issue.status === 'in_progress',
  ).length

  const resolvedIssues = issues.filter(
    (issue) => issue.status === 'resolved',
  ).length

  const recentIssues = issues.slice(0, 3)

  return (
    <>
      <section className="dashboard-intro">
        <h2>Welcome back</h2>
        <p>Here's an overview of your support issues.</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card total-card">
          <span className="stat-label">Total Issues</span>
          <strong className="stat-value">
            {issues.length}
          </strong>
        </div>

        <div className="stat-card open-card">
          <span className="stat-label">Open</span>
          <strong className="stat-value">
            {openIssues}
          </strong>
        </div>

        <div className="stat-card progress-card">
          <span className="stat-label">In Progress</span>
          <strong className="stat-value">
            {inProgressIssues}
          </strong>
        </div>

        <div className="stat-card resolved-card">
          <span className="stat-label">Resolved</span>
          <strong className="stat-value">
            {resolvedIssues}
          </strong>
        </div>
      </section>

      <section className="issues-section">
        <div className="section-header">
          <div>
            <h2>Recent Issues</h2>
            <p>
              Latest support requests submitted to ResolveHub.
            </p>
          </div>

          <Link
            to="/new-issue"
            className="primary-button"
          >
            <i className="bi bi-plus-lg"></i>
            Create Issue
          </Link>
        </div>

        {errorMessage && (
          <p className="auth-error">
            {errorMessage}
          </p>
        )}

        <div className="issues-table-wrapper">
          <table className="issues-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Issue</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4}>
                    Loading issues...
                  </td>
                </tr>
              )}

              {!loading &&
                !errorMessage &&
                recentIssues.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      No recent issues.
                    </td>
                  </tr>
                )}

              {!loading &&
                recentIssues.map((issue) => (
                  <tr key={issue.id}>
                    <td>#{issue.id}</td>

                    <td>
                      <Link to={`/issues/${issue.id}`}>
                        {issue.title}
                      </Link>
                    </td>

                    <td>
                      <span
                        className={`badge priority-${issue.priority}`}
                      >
                        {issue.priority
                          .charAt(0)
                          .toUpperCase() +
                          issue.priority.slice(1)}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          issue.status === 'in_progress'
                            ? 'status-progress'
                            : `status-${issue.status}`
                        }`}
                      >
                        {issue.status === 'in_progress'
                          ? 'In Progress'
                          : issue.status
                              .charAt(0)
                              .toUpperCase() +
                            issue.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard