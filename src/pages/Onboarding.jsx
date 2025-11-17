import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/common/Logo'

function Onboarding() {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        backgroundColor: '#ffffff',
        gap: 4
      }}
    >
      {/* Large Black Circle */}
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: '#2D2B29',
          mb: 4
        }}
      />

      {/* Logo */}
      <Logo size={80} showText={true} />

      {/* Tagline */}
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          color: '#2D2B29',
          fontWeight: 'normal',
          lineHeight: 1.5,
          maxWidth: 300
        }}
      >
        Более 100 льгот и<br />
        выгодных предложений<br />
        ждут вас
      </Typography>

      {/* Start Button */}
      <Button
        variant="contained"
        onClick={() => navigate('/login')}
        sx={{
          backgroundColor: '#2D2B29',
          color: '#ffffff',
          padding: '12px 48px',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          '&:hover': {
            backgroundColor: '#1a1816'
          },
          mt: 4
        }}
      >
        Начнем!
      </Button>
    </Box>
  )
}

export default Onboarding

