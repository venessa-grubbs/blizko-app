import React from 'react'
import { Link } from 'react-router-dom'

function BenefitCard({ benefit }) {
  const typeLabel = benefit.type === 'federal' ? 'Федеральная' : 'Коммерческая'

  return (
    <article className="ui-benefit-card">
      <div className="ui-benefit-card__meta">
        <span className="pill pill--highlight">{typeLabel}</span>
      </div>
      <h4>{benefit.title}</h4>
      <p>{benefit.requirements}</p>
      <div className="ui-benefit-card__footer">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#2d2b29" strokeWidth="2" style={{ width: '1em', height: '1em' }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {benefit.target_groups.length} категории
        </span>
        <Link to={`/benefit/${benefit.id}`} className="ghost-button">
          Подробнее
        </Link>
      </div>
    </article>
  )
}

export default BenefitCard