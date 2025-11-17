import React, { useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BottomNavigation from '../components/common/BottomNavigation'

function Help() {
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle AI assistant question
    console.log('Question:', question)
    setQuestion('')
  }

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
          <Typography variant="h5" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Помощь
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* Instructions */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="body1" sx={{ color: '#2D2B29', mb: 1 }}>
            Вы можете задать
          </Typography>
          <Typography variant="body1" sx={{ color: '#2D2B29', mb: 1 }}>
            вопрос нашему
          </Typography>
          <Typography variant="body1" sx={{ color: '#2D2B29' }}>
            ИИ-ассистенту
          </Typography>
        </Box>

        {/* Question Input */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <TextField
            multiline
            rows={8}
            placeholder="Введите ваш вопрос..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                border: '1px solid #D9D9D9'
              }
            }}
          />

          <Button
            type="submit"
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
            Отправить вопрос
          </Button>
        </Box>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default Help

