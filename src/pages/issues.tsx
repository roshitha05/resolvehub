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
}

function Issues() {
  const [issues, setIssues] = useState<Issue[]>([])
  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
      .from('issues')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Error fetching issues:', error)
      return
    }
    setIssues(data)
    }
    fetchIssues()
  }, [])

  return (
    <section className="all-issues-section">
      <div className="issues-page-header">
        <div>
          <h2>All Issues</h2>
          <p>View, search and manage support requests.</p>
        </div>

        <Link to="/new-issue" className="primary-button">
          <i className="bi bi-plus-lg"></i>
          Create Issue
        </Link>
      </div>

      <div className="issues-filters">
        <div className="search-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search issues..."
          />
        </div>

        <select defaultValue="all">
          <option value="all">All Statuses</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <select defaultValue="all">
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="issues-table-wrapper all-issues-table">
        <table className="issues-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>

          <tbody>
            {issues.length === 0 && (
              <tr>
                <td colSpan={5}>No issues found.</td>
              </tr>
            )}
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>#{issue.id}</td>
                <td>{issue.title}</td>
                <td>
                  <span className={`badge priority-${issue.priority}`}>
                    {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
                  </span>
                </td>
                <td>
                  <span className={`badge status-${issue.status}`}>
                    {issue.status === 'in_progress'
                    ? 'In Progress'
                    :issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                  </span>
                </td>
                <td>
                  {new Date(issue.created_at).toLocaleDateString('en-SG')}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Issues