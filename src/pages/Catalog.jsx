import React, { useState } from 'react'
import { Container, Typography, Box, Card, CardContent, Button, Chip, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import BottomNavigation from '../components/common/BottomNavigation'
import benefitsData from '../data/benefits.json'

function Catalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('государственным')

  const filters = ['государственным', 'коммерческие', 'действующие', 'скоро веснится', 'требуются']

  const benefits = benefitsData.benefits.map((benefit, index) => ({
    ...benefit,
    title: `Льгота ${index + 1}`,
    suitable: index < 2
  }))

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ArrowBackIcon sx={{ color: '#2D2B29', mr: 1 }} />
          <Typography variant="h5" component="h1" sx={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>
            Поиск
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 2 }}>
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

        {/* Filters */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, overflowX: 'auto', pb: 1 }}>
          <FilterListIcon sx={{ color: '#2D2B29' }} />
          {filters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              onClick={() => setActiveFilter(filter)}
              sx={{
                backgroundColor: activeFilter === filter ? '#2D2B29' : '#D9D9D9',
                color: activeFilter === filter ? '#ffffff' : '#2D2B29',
                fontWeight: activeFilter === filter ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: activeFilter === filter ? '#1a1816' : '#C9C9C9'
                }
              }}
            />
          ))}
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#2D2B29' }}>
              сортировка
            </Typography>
            <CalendarTodayIcon sx={{ color: '#2D2B29', fontSize: 20 }} />
            <FilterListIcon sx={{ color: '#2D2B29', fontSize: 20 }} />
          </Box>
        </Box>

        {/* Benefits List */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {benefits.map((benefit) => (
            <Card
              key={benefit.id}
              sx={{
                borderRadius: '8px',
                border: '1px solid #D9D9D9',
                overflow: 'hidden'
              }}
            >
              {/* Image Placeholder */}
              <Box
                sx={{
                  width: '100%',
                  height: 150,
                  backgroundColor: '#D9D9D9'
                }}
              />

              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {benefit.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CalendarTodayIcon sx={{ fontSize: 16, color: '#2D2B29' }} />
                  <Typography variant="body2" sx={{ color: '#2D2B29' }}>
                    {benefit.valid_from} - {benefit.valid_to}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {benefit.suitable ? (
                    <>
                      <CheckCircleIcon sx={{ fontSize: 16, color: '#2D2B29' }} />
                      <Typography variant="body2" sx={{ color: '#2D2B29' }}>
                        подходит Вам
                      </Typography>
                    </>
                  ) : (
                    <>
                      <CancelIcon sx={{ fontSize: 16, color: '#2D2B29' }} />
                      <Typography variant="body2" sx={{ color: '#2D2B29' }}>
                        не подходит вашей категории
                      </Typography>
                    </>
                  )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    component={Link}
                    to={`/benefit/${benefit.id}`}
                    sx={{
                      backgroundColor: '#2D2B29',
                      color: '#ffffff',
                      borderRadius: '8px',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#1a1816'
                      }
                    }}
                  >
                    Подробнее
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View More Link */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography
            component={Link}
            to="#"
            sx={{
              color: '#2D2B29',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View more
          </Typography>
        </Box>

        {/* AI Assistant Section */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: '#D9D9D9',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <Typography variant="body1" sx={{ color: '#2D2B29' }}>
            Вы можете задать вопрос о льготах ИИ-ассистенту BLIZKO
          </Typography>
        </Box>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default Catalog
