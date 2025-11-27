import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import benefitsData from '../data/benefits.json'
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
import heatingRegional from '../aeb_card_regional.jpg'
import centrumKidsRegional from '../hospital.jpg'
import freeLandRegional from '../card.png'

// Получаем региональные и федеральные льготы
const regionalBenefits = benefitsData.benefits.filter(b => b.type === 'regional').slice(0, 3)
const federalBenefits = benefitsData.benefits.filter(b => b.type === 'federal').slice(0, 4)

// Кастомные тексты для федеральных льгот на главной странице
const federalCustomTitles = [
  'Гибкий график отпусков',
  'Льготы на ЖКХ многодетным',
  'Налоговый вычет на детей',
  'Материнский капитал'
]

const sections = [
  {
    id: 'partners',
    title: 'Акции и скидки от партнеров',
    viewAll: true,
    cards: 3,
    variant: 'square',
    images: [childrenWorld, eapteka, foodMarket],
    benefits: []
  },
  {
    id: 'regional',
    title: 'Региональные льготы',
    viewAll: true,
    cards: 3,
    variant: 'wide',
    // Компенсация на отопление, Транспорт, Медицина
    images: [freeLandRegional, heatingRegional, centrumKidsRegional],
    benefits: regionalBenefits
  },
  {
    id: 'federal',
    title: 'Федеральные льготы',
    viewAll: true,
    cards: 4,
    variant: 'wide',
    // Транспорт, ЖКХ, Лекарства, Налоги
    images: [federalVacation, zhkhFederal, federalKids, motherhoodFederal],
    benefits: federalBenefits
  }
]

function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/catalog')
    }
  }

  const handleBannerClick = () => {
    navigate('/catalog')
  }

  const handleViewAllClick = (sectionId) => {
    navigate(`/catalog?section=${sectionId}`)
  }

  const handleCardClick = (sectionId) => {
    navigate(`/catalog?section=${sectionId}`)
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
          <input 
            type="search" 
            placeholder="Поиск по ключевому слову" 
            aria-label="Поиск по льготам"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Найти">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="9" cy="9" r="5.5" />
              <path d="m13 13 4 4" />
            </svg>
          </button>
        </form>
      </section>

      <section className="home-banner">
        <div>
          <p className="banner-eyebrow">Новые данные</p>
          <h2>21 льгота доступна в Якутске</h2>
          <p>Проверьте региональные программы и скидки от крупных партнеров.</p>
        </div>
        <button type="button" className="banner-button" onClick={handleBannerClick}>
          Смотреть обновления
        </button>
      </section>

      {sections.map((section) => {
        // Получаем картинки и льготы для текущей секции
        // Для региональных и федеральных льгот сопоставляем картинки с текстами
        const sectionData = Array.from({ length: section.cards }).map((_, index) => {
          const benefit = section.benefits[index] || null
          let imageSrc = section.images[index % section.images.length]
          
          // Сопоставляем картинки с текстами льгот для лучшего соответствия
          if (section.id === 'regional' && benefit) {
            // Региональные: отопление -> heating (радиатор), транспорт -> freeLand, медицина -> centrumKids
            if (benefit.title.includes('отопление') || benefit.title.includes('отопл')) {
              imageSrc = heatingRegional
            } else if (benefit.title.includes('транспорт') || benefit.title.includes('проезд')) {
              imageSrc = freeLandRegional
            } else if (benefit.title.includes('медицин') || benefit.title.includes('медицинск')) {
              imageSrc = centrumKidsRegional
            }
          } else if (section.id === 'federal' && benefit) {
            // Федеральные: транспорт -> federalVacation, ЖКХ -> zhkhFederal, лекарства -> federalKids, налоги -> motherhoodFederal
            if (benefit.title.includes('транспорт') || benefit.title.includes('проезд')) {
              imageSrc = federalVacation
            } else if (benefit.title.includes('ЖКХ') || benefit.title.includes('коммунальн')) {
              imageSrc = zhkhFederal
            } else if (benefit.title.includes('лекарств') || benefit.title.includes('лекарственн')) {
              imageSrc = federalKids
            } else if (benefit.title.includes('налог') || benefit.title.includes('Налоговые')) {
              imageSrc = motherhoodFederal
            }
          }
          
          return { imageSrc, benefit }
        })

        return (
        <section key={section.id} className="benefits-section">
          <header>
            <h3>{section.title}</h3>
            {section.viewAll && (
              <button 
                type="button" 
                onClick={() => handleViewAllClick(section.id)}
              >
                посмотреть все
              </button>
            )}
          </header>

          <div className={`benefits-grid benefits-grid--${section.variant}`}>
              {sectionData.map((item, index) => (
              <article 
                key={index} 
                className="benefit-card"
                onClick={() => handleCardClick(section.id)}
                style={{ cursor: 'pointer' }}
              >
                  <img src={item.imageSrc} alt={item.benefit?.title || `${section.title} - карточка ${index + 1}`} className="card-image" />
                  {(section.id === 'regional' || section.id === 'federal') && item.benefit && (
                    <div className="benefit-card-text">
                      <p>
                        {section.id === 'federal' && federalCustomTitles[index] 
                          ? federalCustomTitles[index] 
                          : item.benefit.title}
                      </p>
                    </div>
                  )}
              </article>
            ))}
          </div>
        </section>
        )
      })}

    </div>
  )
}

export default Home
