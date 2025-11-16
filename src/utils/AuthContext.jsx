import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Загрузка пользователя из localStorage при монтировании
  useEffect(() => {
    const savedUser = localStorage.getItem('social_benefits_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('social_benefits_user')
      }
    }
    setIsLoading(false)
  }, [])

  // Mock-авторизация через Госуслуги (имитация)
  const loginWithGosuslugi = (userData) => {
    return new Promise((resolve) => {
      setIsLoading(true)
      setTimeout(() => {
        const userWithId = {
          ...userData,
          id: Date.now(),
          isVerified: true,
          loginMethod: 'gosuslugi'
        }
        setUser(userWithId)
        localStorage.setItem('social_benefits_user', JSON.stringify(userWithId))
        setIsLoading(false)
        resolve(userWithId)
      }, 1500)
    })
  }

  // Mock-авторизация через email + SMS
  const loginWithEmail = (userData) => {
    return new Promise((resolve) => {
      setIsLoading(true)
      setTimeout(() => {
        const userWithId = {
          ...userData,
          id: Date.now(),
          isVerified: false, // Требует подтверждения через SMS
          loginMethod: 'email'
        }
        setUser(userWithId)
        localStorage.setItem('social_benefits_user', JSON.stringify(userWithId))
        setIsLoading(false)
        resolve(userWithId)
      }, 2000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('social_benefits_user')
  }

  // Mock-проверка статуса льготника через API
  const verifyBenefitStatus = async (snils) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Имитация проверки - случайный результат
        const isVerified = Math.random() > 0.3 // 70% шанс успешной проверки
        resolve({
          success: isVerified,
          message: isVerified 
            ? 'Статус льготника подтвержден' 
            : 'Требуется дополнительная проверка документов'
        })
      }, 2000)
    })
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      loginWithGosuslugi,
      loginWithEmail,
      logout,
      verifyBenefitStatus
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
