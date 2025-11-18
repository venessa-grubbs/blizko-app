import React from 'react'
import './Home.css'

const sections = [
  {
    id: 'partners',
    title: 'Акции и скидки от партнеров',
    viewAll: true,
    cards: 3,
    variant: 'square'
  },
  {
    id: 'regional',
    title: 'Региональные льготы',
    viewAll: true,
    cards: 3,
    variant: 'wide'
  },
  {
    id: 'federal',
    title: 'Федеральные льготы',
    viewAll: true,
    cards: 4,
    variant: 'square'
  }
]

function Home() {
  const handleSearchSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-meta">
          <span>Москва · сегодня</span>
        </div>
        <h1 className="home-title">Подберём льготы под вашу ситуацию</h1>
        <p className="home-description">
          Используйте поиск, чтобы найти конкретную услугу или организацию. Все результаты обновляются ежедневно.
        </p>

        <form className="home-search" role="search" onSubmit={handleSearchSubmit}>
          <input type="search" placeholder="Поиск по ключевому слову" aria-label="Поиск по льготам" />
          <button type="submit" aria-label="Найти">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>
          </button>
        </form>

        <div className="home-shortcuts">
          {['Пенсионеры', 'Инвалиды', 'Многодетные', 'Малоимущие'].map((item) => (
            <button key={item} type="button" className="shortcut-chip">
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="home-banner">
        <div>
          <p className="banner-eyebrow">Новые данные</p>
          <h2>193 льготы доступны в Москве</h2>
          <p>Проверьте региональные программы и скидки от крупных партнеров.</p>
        </div>
        <button type="button" className="banner-button">
          Смотреть обновления
        </button>
      </section>

      {sections.map((section) => (
        <section key={section.id} className="benefits-section">
          <header>
            <h3>{section.title}</h3>
            {section.viewAll && <button type="button">посмотреть все</button>}
          </header>

          <div className={`benefits-grid benefits-grid--${section.variant}`}>
            {Array.from({ length: section.cards }).map((_, index) => (
              <article key={index} className="benefit-card">
                <div className="card-placeholder" />
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="home-footnote">
        <p>Прототип «Близко» · версии для мобильных устройств и десктопа.</p>
        <p>Данные обновляются автоматически и синхронизируются с ЕПГУ.</p>
      </section>
    </div>
  )
}

export default Home
