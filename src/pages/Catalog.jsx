import React from 'react'
import { Container, Typography } from '@mui/material'

function Catalog() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог льгот
      </Typography>
      <Typography>Скдесь будут льготы...</Typography>
    </Container>
  )
}

export default Catalog
