import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Chip } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getCategoryLabel = (category) => {
    const labels = {
      pensioner: 'Пенсионер',
      disabled_1: 'Инвалид I гр.',
      disabled_2: 'Инвалид II гр.',
      disabled_3: 'Инвалид III гр.',
      large_family: 'Многодетный',
      veteran: 'Ветеран',
      low_income: 'Малоимущий'
    }
    return labels[category] || category
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          🤝 Социальные льготы
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/catalog">
            Каталог льгот
          </Button>
          
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Личный кабинет
              </Button>
              <Chip 
                label={getCategoryLabel(user.category)} 
                color="secondary" 
                size="small"
              />
              <Typography variant="body2">
                {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Войти
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
