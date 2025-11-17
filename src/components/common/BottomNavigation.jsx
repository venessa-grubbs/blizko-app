import React from 'react'
import { Box, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'

function BottomNavigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'ГЛАВНАЯ', icon: HomeIcon },
    { path: '/catalog', label: 'ПОИСК', icon: SearchIcon },
    { path: '/dashboard', label: 'ЛИЧНЫЙ КАБИНЕТ', icon: PersonIcon },
    { path: '/help', label: 'НАСТРОЙКИ', icon: SettingsIcon },
  ]

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #D9D9D9',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '8px 0',
        zIndex: 1000,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.path)
        return (
          <Box
            key={item.path}
            component={Link}
            to={item.path}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
              color: active ? '#2D2B29' : '#D9D9D9',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#2D2B29'
              }
            }}
          >
            <Icon sx={{ fontSize: 24, mb: 0.5 }} />
            <Typography
              variant="caption"
              sx={{
                fontSize: '0.7rem',
                fontWeight: active ? 'bold' : 'normal',
                textTransform: 'uppercase',
                textDecoration: active ? 'underline' : 'none'
              }}
            >
              {item.label}
            </Typography>
          </Box>
        )
      })}
    </Box>
  )
}

export default BottomNavigation

