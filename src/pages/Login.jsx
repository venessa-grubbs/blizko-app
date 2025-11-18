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
  snils: '',
  identifier: '',
  password: '',
  gosPhone: ''
}

function Login() {
  const [activeTab, setActiveTab] = useState('email')
  const [emailFlowMode, setEmailFlowMode] = useState('register')
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialForm)
  const { loginWithEmail, loginWithGosuslugi, isLoading, verifyBenefitStatus, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true })
    }
  }, [user, navigate])

  const resetForm = () => {
    setFormData(initialForm)
  }

  const handleTabChange = (mode) => {
    setActiveTab(mode)
    setStep(0)
    setEmailFlowMode('register')
    resetForm()
  }

  const handleGosuslugiLogin = async () => {
    try {
      const userData = {
        email: 'user@gosuslugi.ru',
        category: formData.category,
        region: formData.region,
        snils: formData.snils,
        phone: formData.gosPhone,
        name: 'Пользователь Госуслуг'
      }
      await loginWithGosuslugi(userData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleEmailFlow = async () => {
    if (emailFlowMode !== 'register') {
      return
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

  const handlePasswordLogin = async () => {
    if (!formData.identifier || !formData.password) return
    try {
      const normalizedEmail = formData.identifier.includes('@')
        ? formData.identifier
        : `${formData.identifier.replace(/\D/g, '') || 'user'}@demo.ru`

      const userData = {
        email: normalizedEmail,
        phone: formData.identifier.startsWith('+') ? formData.identifier : '',
        category: 'pensioner',
        region: '77',
        name: normalizedEmail.split('@')[0],
        loginMethod: 'password'
      }
      await loginWithEmail(userData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Password login error:', error)
    }
  }

  const handleModeSwitch = (mode) => {
    setEmailFlowMode(mode)
    setStep(0)
    setFormData((prev) => ({
      ...initialForm,
      identifier: mode === 'login' ? prev.identifier : '',
      password: mode === 'login' ? prev.password : ''
    }))
  }

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div className="page login-page">
      <section className="page-card login-card">
        <div className="page-header">
          <h1>Авторизация</h1>
          <p>Демо-режим: используйте любые данные, SMS и Госуслуги не отправляются.</p>
        </div>

        <div className="login-tabs">
          <button
            type="button"
            className={activeTab === 'email' ? 'login-tab active' : 'login-tab'}
            onClick={() => handleTabChange('email')}
          >
            📧 Email + SMS
          </button>
          <button
            type="button"
            className={activeTab === 'gosuslugi' ? 'login-tab active' : 'login-tab'}
            onClick={() => handleTabChange('gosuslugi')}
          >
            🏛️ Госуслуги
          </button>
        </div>

        {activeTab === 'email' && (
          <div className="login-mode-switch">
            <button
              type="button"
              className={emailFlowMode === 'login' ? 'login-mode active' : 'login-mode'}
              onClick={() => handleModeSwitch('login')}
            >
              Уже есть аккаунт
            </button>
            <button
              type="button"
              className={emailFlowMode === 'register' ? 'login-mode active' : 'login-mode'}
              onClick={() => handleModeSwitch('register')}
            >
              Регистрация / SMS
            </button>
          </div>
        )}

        {activeTab === 'email' && emailFlowMode === 'login' && (
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Почта или телефон</span>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                placeholder="user@example.ru или +7..."
                required
              />
            </label>

            <label>
              <span>Пароль</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>

            <button
              type="button"
              className="primary-button"
              onClick={handlePasswordLogin}
              disabled={isLoading || !formData.identifier || !formData.password}
            >
              {isLoading ? 'Входим...' : 'Войти'}
            </button>
            <button type="button" className="ghost-button" onClick={() => handleModeSwitch('register')}>
              Зарегистрироваться заново
            </button>
          </form>
        )}

        {activeTab === 'email' && emailFlowMode === 'register' && step === 0 && (
          <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Телефон для SMS</span>
              <input
                type="tel"
                name="phone"
                placeholder="+7 XXX XXX XX XX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Категория льготника *</span>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="" disabled>
                  Выберите категорию
                </option>
                {categories.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Регион проживания *</span>
              <select name="region" value={formData.region} onChange={handleChange} required>
                <option value="" disabled>
                  Выберите регион
                </option>
                {regions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>СНИЛС (опционально)</span>
              <input
                type="text"
                name="snils"
                placeholder="XX-XXX-XX-XX"
                value={formData.snils}
                onChange={handleChange}
              />
            </label>

            <button
              type="button"
              className="primary-button"
              onClick={handleEmailFlow}
              disabled={
                isLoading ||
                !formData.email ||
                !formData.phone ||
                !formData.category ||
                !formData.region
              }
            >
              {isLoading ? 'Отправляем...' : 'Получить SMS код'}
            </button>
          </form>
        )}

        {activeTab === 'email' && emailFlowMode === 'register' && step === 1 && (
          <div className="login-confirm">
            <div className="info-banner success">
              SMS код отправлен на номер {formData.phone}
            </div>
            <label>
              <span>SMS код</span>
              <input
                type="text"
                name="smsCode"
                placeholder="Введите 4-значный код"
                value={formData.smsCode}
                onChange={handleChange}
              />
            </label>
            <div className="login-actions">
              <button type="button" className="ghost-button" onClick={() => setStep(0)}>
                Назад
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={handleEmailFlow}
                disabled={isLoading || !formData.smsCode}
              >
                {isLoading ? 'Входим...' : 'Войти'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'gosuslugi' && (
          <div className="form-grid">
            <div className="info-banner warning">
              Имитация входа через Госуслуги. Мы подставим данные автоматически.
            </div>

            <label>
              <span>Категория</span>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="" disabled>
                  Выберите категорию
                </option>
                {categories.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Регион</span>
              <select name="region" value={formData.region} onChange={handleChange}>
                <option value="" disabled>
                  Выберите регион
                </option>
                {regions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Телефон</span>
              <input
                type="tel"
                name="gosPhone"
                placeholder="+7 999 000 00 00"
                value={formData.gosPhone}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>СНИЛС</span>
              <input type="text" name="snils" value={formData.snils} onChange={handleChange} placeholder="XX-XXX-XX-XX" />
            </label>

            <button
              type="button"
              className="primary-button"
              onClick={handleGosuslugiLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Перенаправляем...' : 'Войти через Госуслуги'}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Login
