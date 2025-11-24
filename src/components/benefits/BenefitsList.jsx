import React from 'react'
import BenefitCard from './BenefitCard'

function BenefitsList({ benefits }) {
  if (benefits.length === 0) {
    return (
      <div className="empty-state">
        Льготы не найдены. Попробуйте изменить параметры поиска.
      </div>
    )
  }

  return (
    <div className="ui-benefits-grid">
      {benefits.map((benefit) => (
        <BenefitCard key={benefit.id} benefit={benefit} />
      ))}
    </div>
  )
}

export default BenefitsList