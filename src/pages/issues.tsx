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

function Issues() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchIssues = async () => {
      const { data, error } = await supabase
        .from('issues')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching issues:', error)
        setErrorMessage('Unable to load issues.')
        setLoading(false)
        return
      }

      setIssues(data ?? [])
      setLoading(false)
    }

    fetchIssues()
  }, [])

  const filteredIssues = issues.filter((issue) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      issue.title.toLowerCase().includes(search) ||
      issue.description.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'all' ||
      issue.status === statusFilter

    const matchesPriority =
      priorityFilter === 'all' ||
      issue.priority === priorityFilter

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    )
  })

  return (
    <section className="all-issues-section">
      <div className="issues-page-header">
        <div>
          <h2>All Issues</h2>
          <p>
            View, search and manage your support requests.
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

      <div className="issues-filters">
        <div className="search-box">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >
          <option value="all">
            All Statuses
          </option>
          <option value="open">
            Open
          </option>
          <option value="in_progress">
            In Progress
          </option>
          <option value="resolved">
            Resolved
          </option>
        </select>

        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.target.value)
          }
        >
          <option value="all">
            All Priorities
          </option>
          <option value="low">
            Low
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="high">
            High
          </option>
        </select>
      </div>

      {errorMessage && (
        <p className="auth-error">
          {errorMessage}
        </p>
      )}

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
            {loading && (
              <tr>
                <td colSpan={5}>
                  Loading issues...
                </td>
              </tr>
            )}

            {!loading &&
              !errorMessage &&
              filteredIssues.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    No issues found.
                  </td>
                </tr>
              )}

            {!loading &&
              filteredIssues.map((issue) => (
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

                  <td>
                    {new Date(
                      issue.created_at,
                    ).toLocaleDateString('en-SG')}
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