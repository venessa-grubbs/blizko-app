import React from 'react'
import { Container, Typography, Paper, Button, Chip, Box, Alert, Divider, Grid } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import benefitsData from '../data/benefits.json'

function BenefitDetail() {
  const { id } = useParams()
  const benefit = benefitsData.benefits.find(b => b.id === id)

  if (!benefit) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Льгота не найдена!</Alert>
        <Button component={Link} to="/catalog" sx={{ mt: 2 }}>
          Вернуться в каталог
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        component={Link} 
        to="/catalog" 
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад к каталог
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {benefit.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip 
              label={benefit.type === 'federal' ? 'Федеральная' : 'Коммерческая'} 
              color={benefit.type === 'federal' ? 'primary' : 'secondary'}
            />
            <Chip label={`Срок: ${benefit.valid_from} - ${benefit.valid_to}`} variant="outlined" />
            {benefit.partner && <Chip label={`Партнер: ${benefit.partner}`} />}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>📋 Требования</Typography>
            <Typography paragraph>{benefit.requirements}</Typography>

            <Typography variant="h6" gutterBottom>👥 Для кого</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {benefit.target_groups.map(group => (
                <Chip 
                  key={group} 
                  label={
                    group === 'pensioner' ? 'Пенсионеры' :
                    group === 'disabled' ? 'Инвалиды' :
                    group === 'large_family' ? 'Многодетные' :
                    group === 'low_income' ? 'Малоимущие' : group
                  } 
                  variant="outlined" 
                  size="small"
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>🚀 Как получить</Typography>
            <Typography paragraph>{benefit.how_to_get}</Typography>

            {benefit.source_url && (
              <>
                <Typography variant="h6" gutterBottom>🔗 Источник</Typography>
                <Button 
                  href={benefit.source_url} 
                  target="_blank" 
                  variant="outlined"
                >
                  Открыть официальную информацию
                </Button>
              </>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>📄 Сохранить информацию</Typography>
          <Button variant="contained" onClick={() => window.print()}>
            Распечатать или сохранить в PDF
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default BenefitDetail
