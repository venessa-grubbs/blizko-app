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
        <span>👥 {benefit.target_groups.length} категории</span>
        <Link to={`/benefit/${benefit.id}`} className="ghost-button">
          Подробнее
        </Link>
      </div>
    </article>
  )
}

export default BenefitCard