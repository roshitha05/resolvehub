import { useLocation } from 'react-router-dom'
import { supabase } from '../supabase'

function Header() {
  const location = useLocation()

  const pageContent = {
    '/dashboard': {
      title: 'Dashboard',
      subtitle: 'Overview of your support requests',
    },
    '/issues': {
      title: 'Issues',
      subtitle: 'View and manage your support issues',
    },
    '/new-issue': {
      title: 'New Issue',
      subtitle: 'Create a new support request',
    },
  }

  const getCurrentPage = () => {
    if (location.pathname.startsWith('/issues/')) {
      return {
        title: 'Issue Details',
        subtitle: 'View and manage this support request',
      }
    }

    return (
      pageContent[
        location.pathname as keyof typeof pageContent
      ] ?? pageContent['/dashboard']
    )
  }

  const currentPage = getCurrentPage()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="top-header">
      <div>
        <h1>{currentPage.title}</h1>
        <p>{currentPage.subtitle}</p>
      </div>

      <div className="header-actions">
        <div className="user-profile">
          <div className="user-avatar">
            <i className="bi bi-person"></i>
          </div>

          <div className="user-details">
            <span className="user-name">
              Support User
            </span>

            <span className="user-role">
              Team Member
            </span>
          </div>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header