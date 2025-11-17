import React from 'react'
import { Container, Typography, Box, Button, Chip, Paper } from '@mui/material'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BottomNavigation from '../components/common/BottomNavigation'
import benefitsData from '../data/benefits.json'

function BenefitDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const benefit = benefitsData.benefits.find(b => b.id === id)

  if (!benefit) {
    return (
      <>
        <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
          <Typography variant="h5" gutterBottom>
            Льгота не найдена!
          </Typography>
          <Button component={Link} to="/catalog" sx={{ mt: 2 }}>
            Вернуться в каталог
          </Button>
        </Container>
        <BottomNavigation />
      </>
    )
  }

  const tags = ['многодетные', 'малообеспеченные', 'СВО']

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: '#2D2B29' }}
          />
          <Typography variant="h5" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Подробнее
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* Image Placeholder */}
        <Box
          sx={{
            width: '100%',
            height: 200,
            backgroundColor: '#D9D9D9',
            borderRadius: '8px',
            mb: 2
          }}
        />

        {/* Title */}
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Пособие на несовершеннолетнего
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              sx={{
                backgroundColor: '#D9D9D9',
                color: '#2D2B29',
                borderRadius: '8px'
              }}
            />
          ))}
        </Box>

        {/* Information Box */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: '8px',
            border: '1px solid #D9D9D9',
            backgroundColor: '#ffffff'
          }}
        >
          <Typography variant="body2" sx={{ color: '#2D2B29' }}>
            информация информация информация найдите с сайтов
          </Typography>
        </Paper>

        {/* Submit Documents Button */}
        <Button
          fullWidth
          component={Link}
          to={`/submit-documents/${id}`}
          sx={{
            backgroundColor: '#2D2B29',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#1a1816'
            }
          }}
        >
          Подать документы
        </Button>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default BenefitDetail
