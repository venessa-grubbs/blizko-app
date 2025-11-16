import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          🤝 Социальные льготы
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/catalog">
            Каталог льгот
          </Button>
          <Button color="inherit" component={Link} to="/dashboard">
            Личный кабинет
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
