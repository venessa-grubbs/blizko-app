import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/useAuth'

const pageTitles = {
  '/': 'Главная',
  '/catalog': 'Каталог льгот',
  '/dashboard': 'Личный кабинет',
  '/login': 'Войти',
  '/benefit': 'Льгота'
}

function Header() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const currentTitle =
    pageTitles[location.pathname] ||
    (location.pathname.startsWith('/benefit') ? pageTitles['/benefit'] : 'Близко')

  const subtitle =
    location.pathname === '/'
      ? 'Все социальные льготы рядом'
      : 'Прототип сервиса «Близко»'

  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1)
    }
  }

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="icon-button"
          aria-label="Назад"
          disabled={location.pathname === '/'}
          onClick={handleBack}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="m14.5 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="header-center">
        <span className="header-title">{currentTitle}</span>
        <span className="header-subtitle">{subtitle}</span>
      </div>

      <div className="header-right">
        <button type="button" className="icon-button" aria-label="Открыть уведомления">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M19 17H5l1.5-2.5V10a5.5 5.5 0 0 1 11 0v4.5z" strokeLinecap="round" />
            <path d="M10 17a2 2 0 0 0 4 0" strokeLinecap="round" />
          </svg>
        </button>
        <Link to={user ? '/dashboard' : '/login'} className="avatar-chip" aria-label="Открыть профиль">
          {user?.name ? (
            user.name.charAt(0).toUpperCase()
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 20.5c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5" />
            </svg>
          )}
        </Link>
      </div>
    </header>
  )
}

export default Header
