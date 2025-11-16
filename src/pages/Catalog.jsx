import React from 'react'
import { Container, Typography, Grid } from '@mui/material'
import BenefitsList from '../components/benefits/BenefitsList'

function Catalog() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог льгот
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <BenefitsList />
        </Grid>
      </Grid>
    </Container>
  )
}

export default Catalog
