import React from 'react'
import { Grid, Typography } from '@mui/material'
import BenefitCard from './BenefitCard'

function BenefitsList({ benefits }) {
  if (benefits.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" sx={{ py: 4 }}>
        Льготы не найдены. Попробуйте изменить параметры поиска.
      </Typography>
    )
  }

  return (
    <Grid container spacing={3}>
      {benefits.map(benefit => (
        <Grid item xs={12} sm={6} md={4} key={benefit.id}>
          <BenefitCard benefit={benefit} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BenefitsList
