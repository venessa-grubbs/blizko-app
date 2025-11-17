import React, { useState } from 'react'
import { Container, Typography, Box, TextField, Button, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BottomNavigation from '../components/common/BottomNavigation'
import { useAuth } from '../utils/AuthContext'

function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    snils: user?.snils || '',
    region: user?.region || '',
    benefitCategory: user?.category || ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
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
            Профиль
          </Typography>
          <Box sx={{ width: 40 }} />
        </Box>

        {/* Profile Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          <TextField
            label="ФИО"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
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
            disabled={!isEditing}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              }
            }}
          />

          <FormControl fullWidth disabled={!isEditing}>
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

          <FormControl fullWidth disabled={!isEditing}>
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
        </Box>

        {/* Edit Button */}
        <Button
          fullWidth
          onClick={handleEdit}
          sx={{
            backgroundColor: '#2D2B29',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 3,
            '&:hover': {
              backgroundColor: '#1a1816'
            }
          }}
        >
          Редактировать
        </Button>

        {/* Confirm Benefit Category Section */}
        <Paper
          sx={{
            p: 2,
            mb: 2,
            borderRadius: '8px',
            backgroundColor: '#D9D9D9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="body2" sx={{ flex: 1, color: '#2D2B29' }}>
            Подтвердите льготную категорию для персонализированных предложений
          </Typography>
          <Button
            sx={{
              backgroundColor: '#2D2B29',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              ml: 2,
              '&:hover': {
                backgroundColor: '#1a1816'
              }
            }}
          >
            Подтвердить
          </Button>
        </Paper>

        {/* Add Electronic Signature Section */}
        <Paper
          sx={{
            p: 2,
            borderRadius: '8px',
            backgroundColor: '#D9D9D9',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="body2" sx={{ flex: 1, color: '#2D2B29' }}>
            Добавьте электронную подпись для подачи документов через приложение
          </Typography>
          <Button
            sx={{
              backgroundColor: '#2D2B29',
              color: '#ffffff',
              borderRadius: '8px',
              textTransform: 'none',
              ml: 2,
              '&:hover': {
                backgroundColor: '#1a1816'
              }
            }}
          >
            Добавить
          </Button>
        </Paper>
      </Container>
      <BottomNavigation />
    </>
  )
}

export default Profile

