import { Link } from 'react-router-dom'

function Dashboard() {
  return (
    <>
      <section className="dashboard-intro">
        <h2>Welcome back</h2>
        <p>Here's an overview of your support issues.</p>
      </section>

      <section className="stats-grid">
        <div className="stat-card total-card">
          <span className="stat-label">Total Issues</span>
          <strong className="stat-value">24</strong>
        </div>

        <div className="stat-card open-card">
          <span className="stat-label">Open</span>
          <strong className="stat-value">8</strong>
        </div>

        <div className="stat-card progress-card">
          <span className="stat-label">In Progress</span>
          <strong className="stat-value">6</strong>
        </div>

        <div className="stat-card resolved-card">
          <span className="stat-label">Resolved</span>
          <strong className="stat-value">10</strong>
        </div>
      </section>

      <section className="issues-section">
        <div className="section-header">
          <div>
            <h2>Recent Issues</h2>
            <p>Latest support requests submitted to ResolveHub.</p>
          </div>

          <Link to="/new-issue" className="primary-button">
            <i className="bi bi-plus-lg"></i>
            Create Issue
          </Link>
        </div>

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
              <tr>
                <td>#104</td>
                <td>Login session timeout</td>
                <td>
                  <span className="badge priority-high">High</span>
                </td>
                <td>
                  <span className="badge status-open">Open</span>
                </td>
              </tr>

              <tr>
                <td>#103</td>
                <td>Broken image on profile page</td>
                <td>
                  <span className="badge priority-low">Low</span>
                </td>
                <td>
                  <span className="badge status-resolved">Resolved</span>
                </td>
              </tr>

              <tr>
                <td>#102</td>
                <td>Search filter not updating</td>
                <td>
                  <span className="badge priority-medium">Medium</span>
                </td>
                <td>
                  <span className="badge status-progress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default Dashboard