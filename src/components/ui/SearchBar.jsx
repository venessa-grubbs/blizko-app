import React from 'react'

function SearchBar({ searchTerm, onSearchChange }) {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <form className="search-panel" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Поиск: «лекарства», «транспорт», «ЖКХ»..."
        aria-label="Введите ключевое слово"
      />
      <button type="submit">Найти</button>
    </form>
  )
}

export default SearchBar
