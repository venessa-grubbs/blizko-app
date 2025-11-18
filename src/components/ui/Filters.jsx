import React from 'react'

const typeOptions = [
  { value: 'all', label: 'Все типы' },
  { value: 'federal', label: 'Федеральные' },
  { value: 'commercial', label: 'Коммерческие' }
]

const categoryOptions = [
  { value: 'all', label: 'Все категории' },
  { value: 'pensioner', label: 'Пенсионеры' },
  { value: 'disabled', label: 'Инвалиды' },
  { value: 'large_family', label: 'Многодетные' },
  { value: 'low_income', label: 'Малоимущие' }
]

function Filters({ filters, onFiltersChange }) {
  const handleReset = (key) => {
    onFiltersChange({ ...filters, [key]: 'all' })
  }

  return (
    <div className="filters-group">
      <div className="filter-control">
        <label htmlFor="benefit-type">Тип льготы</label>
        <select
          id="benefit-type"
          value={filters.type}
          onChange={(event) => onFiltersChange({ ...filters, type: event.target.value })}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-control">
        <label htmlFor="benefit-category">Категория</label>
        <select
          id="benefit-category"
          value={filters.category}
          onChange={(event) => onFiltersChange({ ...filters, category: event.target.value })}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-pills">
        {filters.type !== 'all' && (
          <span className="chip">
            Тип: {typeOptions.find((item) => item.value === filters.type)?.label}
            <button type="button" aria-label="Сбросить фильтр по типу" onClick={() => handleReset('type')}>
              ×
            </button>
          </span>
        )}
        {filters.category !== 'all' && (
          <span className="chip">
            Категория: {categoryOptions.find((item) => item.value === filters.category)?.label}
            <button type="button" aria-label="Сбросить фильтр по категории" onClick={() => handleReset('category')}>
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  )
}

export default Filters