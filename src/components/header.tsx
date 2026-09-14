import { useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  const pageContent = {
    '/dashboard': {
      title: 'Dashboard',
      subtitle: 'Overview of your support requests',
    },
    '/issues': {
      title: 'Issues',
      subtitle: 'View and manage all support issues',
    },
    '/new-issue': {
      title: 'New Issue',
      subtitle: 'Create a new support request',
    },
  }

  const currentPage =
    pageContent[location.pathname as keyof typeof pageContent] ??
    pageContent['/dashboard']

  return (
    <header className="top-header">
      <div>
        <h1>{currentPage.title}</h1>
        <p>{currentPage.subtitle}</p>
      </div>

      <div className="header-actions">
        <button className="icon-button" aria-label="Notifications">
          <i className="bi bi-bell"></i>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            <i className="bi bi-person"></i>
          </div>

          <div className="user-details">
            <span className="user-name">Support User</span>
            <span className="user-role">Team Member</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header