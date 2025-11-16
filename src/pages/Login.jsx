import React, { useState } from 'react'
import { 
  Container, 
  Paper, 
  Tabs, 
  Tab, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material'
import { useAuth } from '../utils/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [activeTab, setActiveTab] = useState(0)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    smsCode: '',
    category: '',
    region: '',
    snils: ''
  })
  const { loginWithEmail, loginWithGosuslugi, isLoading, verifyBenefitStatus } = useAuth()
  const navigate = useNavigate()

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    setStep(0)
    setFormData({
      email: '',
      phone: '',
      smsCode: '',
      category: '',
      region: '',
      snils: ''
    })
  }

  const handleGosuslugiLogin = async () => {
    try {
      const userData = {
        email: 'user@gosuslugi.ru',
        category: formData.category,
        region: formData.region,
        snils: formData.snils,
        name: 'Пользователь Госуслуг'
      }
      await loginWithGosuslugi(userData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleEmailLogin = async () => {
    if (step === 0) {
      setStep(1)
      // Здесь бы отправлялся SMS код
      return
    }

    if (step === 1) {
      try {
        const userData = {
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          region: formData.region,
          snils: formData.snils,
          name: formData.email.split('@')[0]
        }
        await loginWithEmail(userData)
        
        // Проверяем статус льготника если указан СНИЛС
        if (formData.snils) {
          await verifyBenefitStatus(formData.snils)
        }
        
        navigate('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
      }
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Вход в систему
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Mock-режим:</strong> Для демонстрации используйте любые данные. 
            Госуслуги и SMS не отправляются реально.
          </Typography>
        </Alert>

        <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 3 }}>
          <Tab label="📧 Email + SMS" />
          <Tab label="🏛️ Госуслуги" />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <Stepper activeStep={step} sx={{ mb: 4 }}>
              <Step><StepLabel>Ввод данных</StepLabel></Step>
              <Step><StepLabel>Подтверждение SMS</StepLabel></Step>
            </Stepper>

            {step === 0 ? (
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />

                <TextField
                  label="Телефон для SMS"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 XXX XXX XX XX"
                  required
                  disabled={isLoading}
                />

                <FormControl fullWidth disabled={isLoading}>
                  <InputLabel>Категория льготника *</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Категория льготника *"
                    onChange={handleChange}
                    required
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
                  <InputLabel>Регион проживания *</InputLabel>
                  <Select
                    name="region"
                    value={formData.region}
                    label="Регион проживания *"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="77">Москва</MenuItem>
                    <MenuItem value="78">Санкт-Петербург</MenuItem>
                    <MenuItem value="54">Новосибирская область</MenuItem>
                    <MenuItem value="63">Самарская область</MenuItem>
                    <MenuItem value="52">Нижегородская область</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="СНИЛС (опционально)"
                  name="snils"
                  value={formData.snils}
                  onChange={handleChange}
                  placeholder="XXX-XXX-XXX XX"
                  disabled={isLoading}
                  helperText="Для автоматической проверки статуса льготника"
                />

                <Button
                  onClick={handleEmailLogin}
                  variant="contained"
                  size="large"
                  disabled={isLoading || !formData.email || !formData.phone || !formData.category || !formData.region}
                  sx={{ py: 1.5 }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Получить SMS код'}
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Alert severity="success">
                  SMS код отправлен на номер: {formData.phone}
                </Alert>

                <TextField
                  label="SMS код"
                  name="smsCode"
                  value={formData.smsCode}
                  onChange={handleChange}
                  placeholder="Введите 4-значный код"
                  disabled={isLoading}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    onClick={() => setStep(0)}
                    variant="outlined"
                    disabled={isLoading}
                  >
                    Назад
                  </Button>
                  <Button
                    onClick={handleEmailLogin}
                    variant="contained"
                    disabled={isLoading || !formData.smsCode}
                    sx={{ flex: 1 }}
                  >
                    {isLoading ? <CircularProgress size={24} /> : 'Войти'}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Alert severity="warning">
              Имитация входа через Госуслуги. Данные будут получены из вашего профиля.
            </Alert>

            <FormControl fullWidth>
              <InputLabel>Категория льготника</InputLabel>
              <Select
                name="category"
                value={formData.category}
                label="Категория льготника"
                onChange={handleChange}
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

            <FormControl fullWidth>
              <InputLabel>Регион проживания</InputLabel>
              <Select
                name="region"
                value={formData.region}
                label="Регион проживания"
                onChange={handleChange}
              >
                <MenuItem value="77">Москва</MenuItem>
                <MenuItem value="78">Санкт-Петербург</MenuItem>
                <MenuItem value="54">Новосибирская область</MenuItem>
                <MenuItem value="63">Самарская область</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="СНИЛС"
              name="snils"
              value={formData.snils}
              onChange={handleChange}
              placeholder="Будет получен из Госуслуг"
              disabled
            />

            <Button
              onClick={handleGosuslugiLogin}
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ py: 1.5, bgcolor: '#2D7F3F', '&:hover': { bgcolor: '#256B33' } }}
            >
              {isLoading ? <CircularProgress size={24} /> : 'Войти через Госуслуги'}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  )
}

export default Login
