import React from 'react'
import { Grid } from '@mui/material'
import BenefitCard from './BenefitCard'
import benefitsData from '../../data/benefits.json'

function BenefitsList() {
  return (
    <Grid container spacing={3}>
      {benefitsData.benefits.map(benefit => (
        <Grid item xs={12} sm={6} md={4} key={benefit.id}>
          <BenefitCard benefit={benefit} />
        </Grid>
      ))}
    </Grid>
  )
}

export default BenefitsList
