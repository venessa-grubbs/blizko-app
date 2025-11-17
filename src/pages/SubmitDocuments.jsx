import React from 'react'
import { Container, Typography, Box, Button, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import BottomNavigation from '../components/common/BottomNavigation'

function SubmitDocuments() {
  const { id } = useParams()
  const navigate = useNavigate()

  const mfcAddresses = [
    'Адрес МФЦ',
    'Адрес МФЦ',
    'Адрес МФЦ'
  ]

  const documents = [
    'Список документов и где их получить',
    'Список документов и где их получить',
    'Список документов и где их получить',
    'Список документов и где их получить'
  ]

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 2, pb: 10 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: '#2D2B29' }}
          />
          <Typography variant="h5" component="h1" sx={{ flex: 1, fontWeight: 'bold' }}>
            Подать документы
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* Map Placeholder */}
        <Box
          sx={{
            width: '100%',
            height: 200,
            backgroundColor: '#D9D9D9',
            borderRadius: '8px',
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="body2" sx={{ color: '#2D2B29' }}>
            карта с обозначенными мфц
          </Typography>
        </Box>

        {/* MFC Addresses */}
        <Box sx={{ mb: 4 }}>
          {mfcAddresses.map((address, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 1,
                gap: 1
              }}
            >
              <LocationOnIcon sx={{ color: '#2D2B29' }} />
              <Typography variant="body2" sx={{ color: '#2D2B29' }}>
                {address}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Document Package Section */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Пакет документов
        </Typography>

        <List sx={{ mb: 3 }}>
          {documents.map((doc, index) => (
            <ListItem
              key={index}
              sx={{
                border: '1px solid #D9D9D9',
                borderRadius: '8px',
                mb: 1,
                backgroundColor: '#ffffff'
              }}
            >
              <ListItemIcon>
                <CheckBoxOutlineBlankIcon sx={{ color: '#2D2B29' }} />
              </ListItemIcon>
              <ListItemText
                primary={doc}
                primaryTypographyProps={{
                  variant: 'body2',
                  sx: { color: '#2D2B29' }
                }}
              />
            </ListItem>
          ))}
        </List>

        {/* Download Documents List Button */}
        <Button
          fullWidth
          sx={{
            backgroundColor: '#2D2B29',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 2,
            '&:hover': {
              backgroundColor: '#1a1816'
            }
          }}
        >
          Скачать список Документов к подаче
        </Button>

        {/* Submit Button */}
        <Button
          fullWidth
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
          Подать
        </Button>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default SubmitDocuments

