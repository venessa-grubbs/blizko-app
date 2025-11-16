import React from 'react'
import { Container, Typography, Paper, Grid, Card, CardContent, Button, Chip, Box, Alert } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import benefitsData from '../data/benefits.json'

function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Для доступа к личному кабинету необходимо войти в систему
        </Alert>
        <Button 
          component={Link} 
          to="/login" 
          variant="contained" 
          sx={{ mt: 2 }}
        >
          Войти
        </Button>
      </Container>
    )
  }

  // Фильтруем льготы по категории пользователя и региону
  const userBenefits = benefitsData.benefits.filter(benefit =>
    benefit.target_groups.some(group => group.includes(user.category.split('_')[0])) &&
    (benefit.region.includes('all') || benefit.region.includes(user.region))
  )

  const getCategoryLabel = (category) => {
    const labels = {
      pensioner: 'Пенсионер',
      disabled_1: 'Инвалид I группы',
      disabled_2: 'Инвалид II группы', 
      disabled_3: 'Инвалид III группы',
      large_family: 'Многодетный родитель',
      veteran: 'Ветеран',
      low_income: 'Малоимущий'
    }
    return labels[category] || category
  }

  const getRegionLabel = (region) => {
    const regions = {
      '77': 'Москва',
      '78': 'Санкт-Петербург',
      '54': 'Новосибирская область',
      '63': 'Самарская область',
      '52': 'Нижегородская область'
    }
    return regions[region] || region
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        👤 Личный кабинет
      </Typography>

      {/* Информация о пользователе */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>Ваш профиль</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography><strong>Имя:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            {user.phone && <Typography><strong>Телефон:</strong> {user.phone}</Typography>}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography><strong>Категория:</strong> {getCategoryLabel(user.category)}</Typography>
            <Typography><strong>Регион:</strong> {getRegionLabel(user.region)}</Typography>
            {user.snils && <Typography><strong>СНИЛС:</strong> {user.snils}</Typography>}
            <Chip 
              label={user.isVerified ? '✅ Статус подтвержден' : '⏳ Ожидает проверки'} 
              color={user.isVerified ? 'success' : 'warning'}
              size="small"
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Рекомендованные льготы */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">🎯 Персональные рекомендации</Typography>
        <Button component={Link} to="/catalog" variant="outlined">
          Все льготы
        </Button>
      </Box>

      {userBenefits.length > 0 ? (
        <Grid container spacing={3}>
          {userBenefits.slice(0, 6).map(benefit => (
            <Grid item xs={12} sm={6} md={4} key={benefit.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: '1.1rem' }}>
                    {benefit.title}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Chip 
                      label={benefit.type === 'federal' ? 'Федеральная' : 'Коммерческая'} 
                      color={benefit.type === 'federal' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: '60px' }}>
                    {benefit.requirements}
                  </Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                    📅 Срок: {benefit.valid_from} - {benefit.valid_to}
                  </Typography>
                  <Button 
                    component={Link} 
                    to={`/benefit/${benefit.id}`}
                    variant="contained" 
                    size="small"
                    fullWidth
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
          <Typography color="text.secondary" gutterBottom>
            Для вашей категории и региона пока нет рекомендованных льгот
          </Typography>
          <Button component={Link} to="/catalog" variant="contained" sx={{ mt: 2 }}>
            Посмотреть все доступные льготы
          </Button>
        </Paper>
      )}
    </Container>
  )
}

export default Dashboard
