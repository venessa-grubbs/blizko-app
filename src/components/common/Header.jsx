import React from 'react'
import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from './Logo'

function Header() {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
        <Typography 
          component={Link} 
          to="/"
          sx={{ 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Logo size={40} showText={true} />
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Header
