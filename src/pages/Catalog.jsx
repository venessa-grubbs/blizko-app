import React, { useMemo, useState } from 'react'
import BenefitsList from '../components/benefits/BenefitsList'
import SearchBar from '../components/ui/SearchBar'
import Filters from '../components/ui/Filters'
import { filterBenefits } from '../utils/filters'
import benefitsData from '../data/benefits.json'
import './Catalog.css'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all'
  })

  const filteredBenefits = useMemo(
    () => filterBenefits(benefitsData.benefits, searchTerm, filters),
    [filters, searchTerm]
  )

  return (
    <div className="page catalog-page">
      <section className="page-card page-header">
        <h1>Льготы и субсидии</h1>
        <p>Поиск по федеральным, региональным и коммерческим программам</p>
      </section>

      <section className="page-card catalog-controls">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Filters filters={filters} onFiltersChange={setFilters} />

        <div className="catalog-meta">
          <span>Найдено льгот: {filteredBenefits.length}</span>
          <span>Обновлено сегодня в 09:15</span>
        </div>
      </section>

      <BenefitsList benefits={filteredBenefits} />
    </div>
  )
}

export default Catalog