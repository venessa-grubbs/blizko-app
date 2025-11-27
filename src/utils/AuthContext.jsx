import React, { createContext, useState } from 'react'

const readStoredUser = () => {
  if (typeof window === 'undefined') return null
  const savedUser = window.localStorage.getItem('social_benefits_user')
  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser)
  } catch (error) {
    console.error('Error parsing saved user:', error)
    window.localStorage.removeItem('social_benefits_user')
    return null
  }
}

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser())
  const [isLoading, setIsLoading] = useState(false)

  // Авторизация через Госуслуги
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
        window.localStorage.setItem('social_benefits_user', JSON.stringify(userWithId))
        setIsLoading(false)
        resolve(userWithId)
      }, 1500)
    })
  }

  // Авторизация через email + SMS
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
        window.localStorage.setItem('social_benefits_user', JSON.stringify(userWithId))
        setIsLoading(false)
        resolve(userWithId)
      }, 2000)
    })
  }


  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('social_benefits_user')
  }

  // Проверка статуса льготника через API
  const verifyBenefitStatus = async (snils) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const isVerified = Math.random() > 0.3 // 70% шанс успешной проверки
        resolve({
          success: isVerified,
          snils,
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
