import React, { useState } from 'react'
import { 
  Container, 
  Paper, 
  Box, 
  TextField, 
  Button, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BottomNavigation from '../components/common/BottomNavigation'

function Register() {
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    snils: '',
    region: '',
    benefitCategory: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      navigate('/login')
    }, 1000)
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ py: 4, pb: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ color: '#2D2B29' }}
          />
          <Typography variant="h5" component="h1" sx={{ flex: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Регистрация
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        <Paper 
          sx={{ 
            p: 3, 
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Фамилия"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <TextField
              label="Имя"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <TextField
              label="Отчество"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <TextField
              label="Эл. почта"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <TextField
              label="Моб. телефон"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <TextField
              label="СНИЛС"
              name="snils"
              value={formData.snils}
              onChange={handleChange}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Регион (выпадающий список)</InputLabel>
              <Select
                name="region"
                value={formData.region}
                label="Регион (выпадающий список)"
                onChange={handleChange}
                sx={{
                  borderRadius: '8px'
                }}
              >
                <MenuItem value="77">Москва</MenuItem>
                <MenuItem value="78">Санкт-Петербург</MenuItem>
                <MenuItem value="54">Новосибирская область</MenuItem>
                <MenuItem value="63">Самарская область</MenuItem>
                <MenuItem value="52">Нижегородская область</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Льготная категория (выпадающий список)</InputLabel>
              <Select
                name="benefitCategory"
                value={formData.benefitCategory}
                label="Льготная категория (выпадающий список)"
                onChange={handleChange}
                sx={{
                  borderRadius: '8px'
                }}
              >
                <MenuItem value="pensioner">Пенсионер</MenuItem>
                <MenuItem value="disabled_1">Инвалид I группы</MenuItem>
                <MenuItem value="disabled_2">Инвалид II группы</MenuItem>
                <MenuItem value="disabled_3">Инвалид III группы</MenuItem>
                <MenuItem value="large_family">Многодетный родитель</MenuItem>
                <MenuItem value="veteran">Ветеран</MenuItem>
                <MenuItem value="low_income">Малоимущий</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: '#2D2B29',
                color: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                mt: 2,
                '&:hover': {
                  backgroundColor: '#1a1816'
                }
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>
          </Box>
        </Paper>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default Register

