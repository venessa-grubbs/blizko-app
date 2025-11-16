import React from 'react'
import { Container, Typography } from '@mui/material'

function Login() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Вход в систему
      </Typography>
      <Typography>Форма входа скоро появится...</Typography>
    </Container>
  )
}

export default Login
