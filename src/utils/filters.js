export function filterBenefits(benefits, searchTerm, filters) {
  return benefits.filter(benefit => {
    // Поиск по названию и описанию
    const matchesSearch = !searchTerm || 
      benefit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      benefit.requirements.toLowerCase().includes(searchTerm.toLowerCase())

    // Фильтр по типу
    const matchesType = filters.type === 'all' || benefit.type === filters.type

    // Фильтр по категории
    const matchesCategory = filters.category === 'all' || 
      benefit.target_groups.includes(filters.category)

    return matchesSearch && matchesType && matchesCategory
  })
}
