import React from 'react'
import { Container, Typography, Paper } from '@mui/material'

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Личный кабинет
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Typography>
          Добро пожаловать! Здесь будут ваши льготы.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Dashboard
