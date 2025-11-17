import React from 'react'
import { Container, Typography, Box, Card, CardContent, Button, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import BottomNavigation from '../components/common/BottomNavigation'

function Home() {
  const [searchTerm, setSearchTerm] = React.useState('')

  // Mock data for promotions
  const promotions = [
    { id: 1, title: 'Акция 1' },
    { id: 2, title: 'Акция 2' },
    { id: 3, title: 'Акция 3' }
  ]

  // Mock data for benefits
  const regionalBenefits = [
    { id: 1, title: 'Льгота 1' },
    { id: 2, title: 'Льгота 2' },
    { id: 3, title: 'Льгота 3' }
  ]

  const federalBenefits = [
    { id: 4, title: 'Льгота 4' },
    { id: 5, title: 'Льгота 5' },
    { id: 6, title: 'Льгота 6' }
  ]

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ArrowBackIcon sx={{ color: '#2D2B29', mr: 1 }} />
          <Typography variant="h5" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            Главная
          </Typography>
          <IconButton sx={{ color: '#2D2B29' }}>
            <NotificationsIcon />
          </IconButton>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #D9D9D9',
              borderRadius: '8px',
              padding: '8px 12px',
              backgroundColor: '#ffffff'
            }}
          >
            <SearchIcon sx={{ color: '#2D2B29', mr: 1 }} />
            <input
              type="text"
              placeholder="поиск по ключевому слову"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                flex: 1,
                fontSize: '1rem',
                backgroundColor: 'transparent',
                color: '#2D2B29'
              }}
            />
          </Box>
        </Box>

        {/* Promotions Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Акции и скидки от партнеров
            </Typography>
            <Typography
              component={Link}
              to="/catalog"
              sx={{
                fontSize: '0.875rem',
                color: '#2D2B29',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              посмотреть все
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                sx={{
                  minWidth: 200,
                  borderRadius: '8px',
                  border: '1px solid #D9D9D9',
                  backgroundColor: '#D9D9D9'
                }}
              >
                <CardContent sx={{ minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {promo.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* News Slider Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Новости по льготам - слайдер
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 200,
              backgroundColor: '#2D2B29',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: 2,
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D9D9D9' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2D2B29', border: '1px solid #D9D9D9' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D9D9D9' }} />
            </Box>
          </Box>
        </Box>

        {/* Regional Benefits Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Региональные льготы
            </Typography>
            <Typography
              component={Link}
              to="/catalog"
              sx={{
                fontSize: '0.875rem',
                color: '#2D2B29',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              посмотреть все
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {regionalBenefits.map((benefit) => (
              <Card
                key={benefit.id}
                sx={{
                  minWidth: 200,
                  borderRadius: '8px',
                  border: '1px solid #D9D9D9',
                  backgroundColor: '#D9D9D9'
                }}
              >
                <CardContent sx={{ minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Federal Benefits Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Федеральные льготы
            </Typography>
            <Typography
              component={Link}
              to="/catalog"
              sx={{
                fontSize: '0.875rem',
                color: '#2D2B29',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              посмотреть все
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {federalBenefits.map((benefit) => (
              <Card
                key={benefit.id}
                sx={{
                  minWidth: 200,
                  borderRadius: '8px',
                  border: '1px solid #D9D9D9',
                  backgroundColor: '#D9D9D9'
                }}
              >
                <CardContent sx={{ minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default Home
