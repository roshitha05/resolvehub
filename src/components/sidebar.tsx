import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <i className="bi bi-life-preserver"></i>
        <span>ResolveHub</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item">
          <i className="bi bi-grid"></i>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/issues" className="nav-item">
          <i className="bi bi-ticket-perforated"></i>
          <span>Issues</span>
        </NavLink>

        <NavLink to="/new-issue" className="nav-item">
          <i className="bi bi-plus-circle"></i>
          <span>New Issue</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar