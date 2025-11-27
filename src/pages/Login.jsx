import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/useAuth'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const categories = [
  ['pensioner', 'Пенсионер'],
  ['disabled_1', 'Инвалид I группы'],
  ['disabled_2', 'Инвалид II группы'],
  ['disabled_3', 'Инвалид III группы'],
  ['large_family', 'Многодетный родитель'],
  ['veteran', 'Ветеран'],
  ['low_income', 'Малоимущий']
]

const regions = [
  ['77', 'Москва'],
  ['78', 'Санкт-Петербург'],
  ['14', 'Республика Саха (Якутия)'],
  ['54', 'Новосибирская область'],
  ['63', 'Самарская область'],
  ['52', 'Нижегородская область']
]

const initialForm = {
  email: '',
  phone: '',
  smsCode: '',
  category: '',
  region: '',
  snils: ''
}

function Login() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialForm)
  const { loginWithEmail, isLoading, verifyBenefitStatus, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const handleEmailFlow = async (event) => {
    if (event) {
      event.preventDefault()
    }
    
    if (step === 0) {
      setStep(1)
      return
    }

    try {
      const userData = {
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        region: formData.region,
        snils: formData.snils,
        name: formData.email ? formData.email.split('@')[0] : 'Пользователь'
      }
      await loginWithEmail(userData)
      if (formData.snils) {
        await verifyBenefitStatus(formData.snils)
      }
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className="page login-page">
      <section className="login-card">
        <img src="/ruslogo.png" alt="БЛИЗКО" className="login-logo" />
        
        {step === 0 ? (
          <form className="login-form" onSubmit={handleEmailFlow}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="login-input"
              required
            />
            
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Телефон"
              className="login-input"
              required
            />

            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              className="login-input"
              required
            >
              <option value="" disabled>Выберите категорию</option>
              {categories.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <select 
              name="region" 
              value={formData.region} 
              onChange={handleChange} 
              className="login-input"
              required
            >
              <option value="" disabled>Выберите регион</option>
              {regions.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>

            <button
              type="submit"
              className="login-button login-button-primary"
              disabled={isLoading || !formData.email || !formData.phone || !formData.category || !formData.region}
            >
              {isLoading ? 'Отправляем...' : 'Получить SMS код'}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleEmailFlow}>
            <div className="info-banner success">
              SMS код отправлен на номер {formData.phone}
            </div>
            <input
              type="text"
              name="smsCode"
              placeholder="SMS код"
              value={formData.smsCode}
              onChange={handleChange}
              maxLength={4}
              pattern="[0-9]{4}"
              inputMode="numeric"
              className="login-input"
              required
            />
            <button
              type="submit"
              className="login-button login-button-primary"
              disabled={isLoading || !formData.smsCode || formData.smsCode.length !== 4}
            >
              {isLoading ? 'Входим...' : 'Войти'}
            </button>
            <button
              type="button"
              className="login-button login-button-secondary"
              onClick={() => setStep(0)}
            >
              Назад
            </button>
          </form>
        )}
      </section>
    </div>
  )
}

export default Login
