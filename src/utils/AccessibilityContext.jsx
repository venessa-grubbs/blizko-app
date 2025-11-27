import React, { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext()

export function AccessibilityProvider({ children }) {
  const [isLowVisionMode, setIsLowVisionMode] = useState(() => {
    const saved = localStorage.getItem('lowVisionMode')
    return saved === 'true'
  })

  useEffect(() => {
    if (isLowVisionMode) {
      document.documentElement.classList.add('low-vision-mode')
    } else {
      document.documentElement.classList.remove('low-vision-mode')
    }
    localStorage.setItem('lowVisionMode', isLowVisionMode.toString())
  }, [isLowVisionMode])

  const toggleLowVisionMode = () => {
    setIsLowVisionMode(prev => !prev)
  }

  return (
    <AccessibilityContext.Provider value={{ isLowVisionMode, toggleLowVisionMode }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

