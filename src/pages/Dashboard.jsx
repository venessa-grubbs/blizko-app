import React from 'react'
import { Container, Typography, Paper, Grid, Card, CardContent, Button, Chip, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import benefitsData from '../data/benefits.json'

function Dashboard() {
  // В будущем здесь будут льготы пользователя, пока показываем все
  const userBenefits = benefitsData.benefits

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        👤 Личный кабинет
      </Typography>

      {/* Приветствие */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Добро пожаловать!</Typography>
        <Typography>
          Здесь вы можете управлять своими льготами, просматривать персональные рекомендации 
          и отслеживать статус заявлений.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        {/* Блок с профилем */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Ваш профиль</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Для доступа к персональным рекомендациям войдите в систему
            </Typography>
            <Button 
              variant="outlined" 
              fullWidth
              disabled
            >
              Авторизация скоро будет
            </Button>
          </Paper>
        </Grid>

        {/* Рекомендованные льготы */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">🎯 Рекомендованные льготы</Typography>
            <Button component={Link} to="/catalog" variant="outlined">
              Все льготы
            </Button>
          </Box>

          {userBenefits.length > 0 ? (
            <Grid container spacing={3}>
              {userBenefits.slice(0, 4).map(benefit => (
                <Grid item xs={12} sm={6} key={benefit.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                        {benefit.title}
                      </Typography>
                      <Chip 
                        label={benefit.type === 'federal' ? 'Федеральная' : 'Коммерческая'} 
                        color={benefit.type === 'federal' ? 'primary' : 'secondary'}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: '40px' }}>
                        {benefit.requirements}
                      </Typography>
                      <Button 
                        component={Link} 
                        to={`/benefit/${benefit.id}`}
                        variant="contained" 
                        size="small"
                      >
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Нет рекомендованных льгот
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Dashboard
