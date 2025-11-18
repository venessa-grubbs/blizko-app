import React from 'react'
import { useParams, Link } from 'react-router-dom'
import benefitsData from '../data/benefits.json'
import './BenefitDetail.css'

const targetGroupLabels = {
  pensioner: 'Пенсионеры',
  disabled: 'Инвалиды',
  large_family: 'Многодетные семьи',
  low_income: 'Малоимущие',
  veteran: 'Ветераны'
}

function BenefitDetail() {
  const { id } = useParams()
  const benefit = benefitsData.benefits.find((item) => item.id === id)

  if (!benefit) {
    return (
      <div className="page benefit-page">
        <section className="page-card">
          <div className="info-banner warning">Льгота не найдена</div>
          <Link to="/catalog" className="ghost-button">
            Вернуться в каталог
          </Link>
        </section>
      </div>
    )
  }

  const typeLabel = benefit.type === 'federal' ? 'Федеральная' : 'Коммерческая'

  return (
    <div className="page benefit-page">
      <Link to="/catalog" className="ghost-button back-link">
        ← Назад в каталог
      </Link>

      <section className="page-card">
        <div className="page-header">
          <div className="pill pill--highlight">{typeLabel}</div>
          <h1>{benefit.title}</h1>
        </div>

        <div className="benefit-meta">
          {benefit.partner && <span className="chip">Партнер: {benefit.partner}</span>}
          <span className="chip">Регион: {benefit.region.join(', ')}</span>
        </div>
      </section>

      <section className="page-card two-column">
        <div className="benefit-column">
          <h3>📋 Требования</h3>
          <p>{benefit.requirements}</p>

          <h3>👥 Для кого</h3>
          <div className="tag-list">
            {benefit.target_groups.map((group) => (
              <span key={group} className="chip">
                {targetGroupLabels[group] || group}
              </span>
            ))}
          </div>
        </div>

        <div className="benefit-column">
          <h3>🚀 Как получить</h3>
          <p>{benefit.how_to_get}</p>

          {benefit.source_url && (
            <a className="primary-button" href={benefit.source_url} target="_blank" rel="noreferrer">
              Открыть официальную информацию
            </a>
          )}

          <button type="button" className="ghost-button" onClick={() => window.print()}>
            Распечатать или сохранить в PDF
          </button>
        </div>
      </section>
    </div>
  )
}

export default BenefitDetail
