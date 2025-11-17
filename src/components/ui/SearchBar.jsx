import React from 'react'
import { TextField, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        placeholder="Поиск по льготам: 'лекарства', 'транспорт', 'ЖКХ'..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '1.1rem',
            padding: '12px 14px',
          }
        }}
      />
    </Box>
  )
}

export default SearchBar
