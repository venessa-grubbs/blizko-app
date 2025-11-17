import React from 'react'
import { Container, Typography, Box, Card, CardContent, Button, Chip } from '@mui/material'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'
import BottomNavigation from '../components/common/BottomNavigation'
import benefitsData from '../data/benefits.json'

function Dashboard() {
  const { user } = useAuth()

  const activeBenefits = [
    {
      id: 1,
      title: 'Пособие на несовершеннолетнего',
      category: 'федеральные льготы'
    },
    {
      id: 2,
      title: 'Льгота 2',
      category: 'региональные льготы'
    },
    {
      id: 3,
      title: 'Льгота 3',
      category: 'федеральные льготы'
    }
  ]

  const personalizedOffers = [
    {
      id: 1,
      title: 'Скидка в магазин детской одежды',
      validUntil: 'действительно до ххлохлоох'
    },
    {
      id: 2,
      title: 'Скидка в магазин детской одежды',
      validUntil: 'действительно до ххххххх'
    }
  ]

  const favoriteCategories = ['лекарства', 'многодетным', 'инвалидам']

  if (!user) {
    return (
      <>
        <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
          <Typography variant="h5" gutterBottom>
            Для доступа к личному кабинету необходимо войти в систему
          </Typography>
          <Button 
            component={Link} 
            to="/login" 
            variant="contained" 
            sx={{ mt: 2 }}
          >
            Войти
          </Button>
        </Container>
        <BottomNavigation />
      </>
    )
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Личный кабинет
        </Typography>

        {/* Active Benefits Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Активные льготы
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activeBenefits.map((benefit) => (
              <Card
                key={benefit.id}
                sx={{
                  borderRadius: '8px',
                  border: '1px solid #D9D9D9',
                  backgroundColor: '#ffffff'
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2D2B29' }}>
                    {benefit.category}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Personalized Offers Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Персонализированные предложения
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {personalizedOffers.map((offer) => (
              <Card
                key={offer.id}
                sx={{
                  borderRadius: '8px',
                  border: '1px solid #D9D9D9',
                  backgroundColor: '#ffffff',
                  position: 'relative',
                  paddingBottom: 4
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {offer.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#2D2B29', mb: 2 }}>
                    {offer.validUntil}
                  </Typography>
                  <Button
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: '#2D2B29',
                      color: '#ffffff',
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#1a1816'
                      }
                    }}
                  >
                    Получить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Export to PDF Button */}
        <Button
          fullWidth
          sx={{
            backgroundColor: '#2D2B29',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 4,
            '&:hover': {
              backgroundColor: '#1a1816'
            }
          }}
        >
          Экспортировать в PDF
        </Button>

        {/* Favorite Categories Section */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Мои избранные категории
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {favoriteCategories.map((category, index) => (
              <Typography key={index} variant="body2" sx={{ color: '#2D2B29' }}>
                {category}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default Dashboard
