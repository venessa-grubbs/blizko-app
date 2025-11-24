import React from 'react'
import './Home.css'

// Импортируем картинки для акций и партнеров
import childrenWorld from '../children_world.jpeg'
import eapteka from '../eapteka.jpeg'
import foodMarket from '../foodmareket.jpeg'

// Импортируем картинки для федеральных льгот
import federalKids from '../federal_kids.jpeg'
import federalVacation from '../federal_vacation.jpeg'
import motherhoodFederal from '../motherhood_federal.jpeg'
import zhkhFederal from '../zhkh_federal.jpeg'

// Импортируем картинки для региональных льгот
import aebCardRegional from '../aeb_card_regional.jpeg'
import centrumKidsRegional from '../centrum_kids_regional.jpeg'
import freeLandRegional from '../free_land_regional.jpeg'

const sections = [
  {
    id: 'partners',
    title: 'Акции и скидки от партнеров',
    viewAll: true,
    cards: 3,
    variant: 'square',
    images: [childrenWorld, eapteka, foodMarket]
  },
  {
    id: 'regional',
    title: 'Региональные льготы',
    viewAll: true,
    cards: 3,
    variant: 'wide',
    images: [aebCardRegional, centrumKidsRegional, freeLandRegional]
  },
  {
    id: 'federal',
    title: 'Федеральные льготы',
    viewAll: true,
    cards: 4,
    variant: 'square',
    images: [federalKids, federalVacation, motherhoodFederal, zhkhFederal]
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
          <span>Якутск · сегодня</span>
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
          <h2>193 льготы доступны в Якутске</h2>
          <p>Проверьте региональные программы и скидки от крупных партнеров.</p>
        </div>
        <button type="button" className="banner-button">
          Смотреть обновления
        </button>
      </section>

      {sections.map((section) => {
        // Получаем картинки для текущей секции из массива images секции
        const sectionImages = Array.from({ length: section.cards }).map((_, index) => {
          // Используем картинки из массива images секции, циклически повторяя если карточек больше
          return section.images[index % section.images.length]
        })

        return (
          <section key={section.id} className="benefits-section">
            <header>
              <h3>{section.title}</h3>
              {section.viewAll && <button type="button">посмотреть все</button>}
            </header>

            <div className={`benefits-grid benefits-grid--${section.variant}`}>
              {sectionImages.map((imageSrc, index) => (
                <article key={index} className="benefit-card">
                  <img src={imageSrc} alt={`${section.title} - карточка ${index + 1}`} className="card-image" />
                </article>
              ))}
            </div>
          </section>
        )
      })}

      <section className="home-footnote">
        <p>Прототип «Близко» · версии для мобильных устройств и десктопа.</p>
        <p>Данные обновляются автоматически и синхронизируются с ЕПГУ.</p>
      </section>
    </div>
  )
}

export default Home
