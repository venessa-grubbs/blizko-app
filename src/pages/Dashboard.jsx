import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'
import benefitsData from '../data/benefits.json'
import BenefitsList from '../components/benefits/BenefitsList'
import './Dashboard.css'

const categoryLabels = {
  pensioner: 'Пенсионер',
  disabled_1: 'Инвалид I группы',
  disabled_2: 'Инвалид II группы',
  disabled_3: 'Инвалид III группы',
  large_family: 'Многодетный родитель',
  veteran: 'Ветеран',
  low_income: 'Малоимущий'
}

const regionLabels = {
  '77': 'Москва',
  '78': 'Санкт-Петербург',
  '14': 'Республика Саха (Якутия)',
  '54': 'Новосибирская область',
  '63': 'Самарская область',
  '52': 'Нижегородская область'
}

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="page dashboard-page">
        <section className="page-card empty-dashboard">
          <div className="pill pill--warning">Только для авторизованных</div>
          <h1>Войдите в личный кабинет</h1>
          <p>Здесь появятся персональные рекомендации, когда вы авторизуетесь.</p>
          <Link to="/login" className="primary-button">
            Войти
          </Link>
        </section>
      </div>
    )
  }

  // Преобразуем категорию пользователя для поиска
  // Для disabled_1, disabled_2, disabled_3 используем базовую категорию "disabled"
  // Для остальных используем полное имя категории
  const categoryForSearch = user.category.startsWith('disabled_') 
    ? 'disabled' 
    : user.category

  const userBenefits = benefitsData.benefits.filter((benefit) => {
    // Проверяем, подходит ли льгота по категории (точное совпадение)
    const matchesCategory = benefit.target_groups.includes(categoryForSearch)
    
    // Проверяем, подходит ли льгота по региону
    const matchesRegion = benefit.region.includes('all') || 
                         (user.region && benefit.region.includes(user.region))
    
    return matchesCategory && matchesRegion
  })

  return (
    <div className="page dashboard-page">
      <section className="page-card profile-card">
        <div className="page-header">
          <div className="pill pill--highlight">Ваш профиль</div>
          <h1>{user.name}</h1>
          <p>
            {categoryLabels[user.category] || user.category} ·{' '}
            {regionLabels[user.region] || user.region}
          </p>
        </div>

        <div className="profile-grid">
          <dl>
            <dt>Email</dt>
            <dd>{user.email}</dd>
          </dl>
          {user.phone && (
            <dl>
              <dt>Телефон</dt>
              <dd>{user.phone}</dd>
            </dl>
          )}
          {user.snils && (
            <dl>
              <dt>СНИЛС</dt>
              <dd>{user.snils}</dd>
            </dl>
          )}
        </div>

        <div className="profile-status">
          {user.isVerified ? (
            <span className="pill pill--success">
              Статус подтвержден
          </span>
          ) : (
            <a 
              href="https://www.gosuslugi.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="primary-button"
            >
              Подтвердить статус
            </a>
          )}
          <div className="profile-actions">
            <Link to="/catalog" className="ghost-button">
              Все льготы
            </Link>
            <button type="button" className="ghost-button danger" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
      </section>

      <section className="page-card">
        <header className="section-heading">
          <div>
            <p className="section-eyebrow">Персональные рекомендации</p>
            <h2>Льготы для вас</h2>
          </div>
          <span>{userBenefits.length} программ найдено</span>
        </header>
        {userBenefits.length > 0 ? (
          <BenefitsList benefits={userBenefits.slice(0, 6)} />
        ) : (
          <div className="empty-state">
            Для вашей категории и региона пока нет рекомендаций. Попробуйте открыть каталог.
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
