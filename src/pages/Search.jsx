import React, { useMemo, useState } from 'react'
import benefitsData from '../data/benefits.json'
import BenefitsList from '../components/benefits/BenefitsList'
import SearchBar from '../components/ui/SearchBar'
import { filterBenefits } from '../utils/filters'
import './Search.css'

const quickQueries = ['лекарства', 'транспорт', 'ЖКХ', 'налоги', 'пенсионеры']

function Search() {
  const [query, setQuery] = useState('')
  const filteredBenefits = useMemo(
    () => filterBenefits(benefitsData.benefits, query, { type: 'all', category: 'all' }),
    [query]
  )

  return (
    <div className="page search-page">
      <section className="page-card page-header">
        <div className="pill pill--highlight">Поиск</div>
        <h1>Найдите нужную льготу</h1>
        <p>Введите ключевое слово — мы покажем подходящие федеральные и региональные программы.</p>
      </section>

      <section className="page-card search-panel-card">
        <SearchBar searchTerm={query} onSearchChange={setQuery} />
        <div className="search-suggestions">
          {quickQueries.map((item) => (
            <button key={item} type="button" onClick={() => setQuery(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="search-meta">
          <span>Результатов: {filteredBenefits.length}</span>
          <span>Источник: база «Близко»</span>
        </div>
      </section>

      <BenefitsList benefits={filteredBenefits} />
    </div>
  )
}

export default Search

