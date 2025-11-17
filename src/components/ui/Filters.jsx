import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Chip, Box } from '@mui/material'

function Filters({ filters, onFiltersChange }) {
  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Тип льготы</InputLabel>
        <Select
          value={filters.type}
          label="Тип льготы"
          onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
        >
          <MenuItem value="all">Все типы</MenuItem>
          <MenuItem value="federal">Федеральные</MenuItem>
          <MenuItem value="commercial">Коммерческие</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={filters.category}
          label="Категория"
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
        >
          <MenuItem value="all">Все категории</MenuItem>
          <MenuItem value="pensioner">Пенсионеры</MenuItem>
          <MenuItem value="disabled">Инвалиды</MenuItem>
          <MenuItem value="large_family">Многодетные</MenuItem>
          <MenuItem value="low_income">Малоимущие</MenuItem>
        </Select>
      </FormControl>

      {/* Чипы активных фильтров */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {filters.type !== 'all' && (
          <Chip 
            label={`Тип: ${filters.type}`} 
            onDelete={() => onFiltersChange({ ...filters, type: 'all' })}
          />
        )}
        {filters.category !== 'all' && (
          <Chip 
            label={`Категория: ${filters.category}`} 
            onDelete={() => onFiltersChange({ ...filters, category: 'all' })}
          />
        )}
      </Box>
    </Box>
  )
}

export default Filters
