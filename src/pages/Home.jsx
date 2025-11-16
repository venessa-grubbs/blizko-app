import React from 'react'
import { Container, Typography, Paper, Grid, Card, CardContent, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      title: "📋 Каталог льгот",
      description: "Полная база государственных и коммерческих льгот с фильтрами и поиском",
      link: "/catalog",
      buttonText: "Найти льготы"
    },
    {
      title: "👤 Личный кабинет",
      description: "Персональные рекомендации и управление вашими льготами",
      link: "/dashboard", 
      buttonText: "Войти в кабинет"
    },
    {
      title: "🎯 Для кого",
      description: "Пенсионеры, инвалиды, многодетные семьи, малоимущие и другие категории",
      link: "/catalog",
      buttonText: "Узнать больше"
    }
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Герой секция */}
      <Paper sx={{ p: 5, mb: 6, textAlign: 'center', background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', color: 'white' }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Социальные льготы для всех
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Найдите подходящие льготы, субсидии и скидки от государства и коммерческих организаций
        </Typography>
        <Button 
          component={Link} 
          to="/catalog" 
          variant="contained" 
          size="large"
          sx={{ 
            bgcolor: 'white', 
            color: '#1976d2',
            '&:hover': {
              bgcolor: '#f5f5f5'
            }
          }}
        >
          Начать поиск льгот
        </Button>
      </Paper>

      {/* Особенности */}
      <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Почему выбирают нас
      </Typography>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Box sx={{ mt: 'auto' }}>
                  <Button 
                    component={Link} 
                    to={feature.link}
                    variant="outlined" 
                    fullWidth
                  >
                    {feature.buttonText}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Категории льготников */}
      <Box sx={{ mt: 6, p: 4, bgcolor: 'background.default', borderRadius: 2 }}>
        <Typography variant="h5" component="h3" gutterBottom align="center">
          Для кого предназначены льготы
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {['Пенсионеры', 'Инвалиды', 'Многодетные семьи', 'Малоимущие', 'Ветераны', 'Студенты'].map((category) => (
            <Grid item xs={6} sm={4} md={2} key={category}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" fontWeight="medium">
                  {category}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default Home
