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
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/common/Logo'

function Login() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    benefitType: '',
    region: ''
  })
  const { loginWithEmail, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userData = {
        email: formData.login,
        name: formData.login.split('@')[0] || formData.login,
        category: formData.benefitType,
        region: formData.region
      }
      await loginWithEmail(userData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper 
        sx={{ 
          p: 4, 
          width: '100%',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Logo size={60} showText={true} />
        </Box>

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Логин *"
            name="login"
            type="text"
            value={formData.login}
            onChange={handleChange}
            required
            disabled={isLoading}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />

          <TextField
            label="Пароль *"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />

          <FormControl fullWidth disabled={isLoading}>
            <InputLabel>Тип льготника</InputLabel>
            <Select
              name="benefitType"
              value={formData.benefitType}
              label="Тип льготника"
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

          <FormControl fullWidth disabled={isLoading}>
            <InputLabel>Регион</InputLabel>
            <Select
              name="region"
              value={formData.region}
              label="Регион"
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

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !formData.login || !formData.password}
            sx={{
              backgroundColor: '#D9D9D9',
              color: '#2D2B29',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              mt: 2,
              '&:hover': {
                backgroundColor: '#C9C9C9'
              },
              '&:disabled': {
                backgroundColor: '#D9D9D9',
                color: '#999999'
              }
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'ВОЙТИ'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
