import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider } from './utils/AuthContext'
import { AccessibilityProvider } from './utils/AccessibilityContext'
import Header from './components/common/Header'
import ProtectedRoute from './components/common/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import BenefitDetail from './pages/BenefitDetail'
import Assistant from './pages/Assistant'
import { useAuth } from './utils/useAuth'
import './App.css'

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M4 9.5 12 4l8 5.5v9.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19V9.5Z" />
    <path d="M9 21V12h6v9" />
  </svg>
)

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
  </svg>
)

const IconAssistant = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <rect x="4" y="9" width="16" height="9" rx="2" />
    <path d="M8 9V5a4 4 0 0 1 8 0v4" />
    <circle cx="9.5" cy="13.5" r="1" />
    <circle cx="14.5" cy="13.5" r="1" />
    <path d="M8 18v2.5M16 18v2.5" strokeLinecap="round" />
  </svg>
)


const IconProfile = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21.5c.7-3.5 3.7-5.5 7-5.5s6.3 2 7 5.5" />
  </svg>
)

function BottomNav() {
  const { user } = useAuth()
  const profilePath = user ? '/dashboard' : '/login'
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY
    const handleScroll = () => {
      const current = window.scrollY
      if (current < lastScrollY - 4) {
        setHidden(true)
      } else if (current > lastScrollY + 4) {
        setHidden(false)
      }
      lastScrollY = current
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/home', label: 'Главная', icon: IconHome, end: true },
    { path: '/catalog', label: 'Поиск', icon: IconGrid },
    { path: '/assistant', label: 'ИИ ассистент', icon: IconAssistant },
    { path: profilePath, label: 'Профиль', icon: IconProfile }
  ]

  return (
    <nav className={`bottom-nav ${hidden ? 'nav-hidden' : ''}`}>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={`${item.label}-${item.path}`}
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            end={item.end}
          >
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

function AppContent() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isOnboardingPage = location.pathname === '/onboarding'

  return (
    <div className="app-shell">
      {!isLoginPage && !isOnboardingPage && <Header />}
      <main className="app-main">
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<Navigate to="/onboarding" replace />}
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/catalog"
            element={
              <ProtectedRoute>
                <Catalog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assistant"
            element={
              <ProtectedRoute>
                <Assistant />
              </ProtectedRoute>
            }
          />
          <Route
            path="/benefit/:id"
            element={
              <ProtectedRoute>
                <BenefitDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isLoginPage && !isOnboardingPage && <BottomNav />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <Router>
          <AppContent />
        </Router>
      </AccessibilityProvider>
    </AuthProvider>
  )
}

export default App
