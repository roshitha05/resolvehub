import { Navigate, Route, Routes } from 'react-router-dom'

import Header from './components/header'
import Sidebar from './components/sidebar'
import CreateIssue from './pages/createissue'
import Dashboard from './pages/dashboard'
import Issues from './pages/issues'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="page-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/new-issue" element={<CreateIssue />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App