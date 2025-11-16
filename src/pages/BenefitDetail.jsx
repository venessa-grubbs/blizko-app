import React from 'react'
import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

function BenefitDetail() {
  const { id } = useParams()
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Детали льготы {id}
      </Typography>
      <Typography>Информация о льготе...</Typography>
    </Container>
  )
}

export default BenefitDetail
