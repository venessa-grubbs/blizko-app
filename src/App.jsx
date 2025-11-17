import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './utils/AuthContext'
import Header from './components/common/Header'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import BenefitDetail from './pages/BenefitDetail'
import Profile from './pages/Profile'
import Help from './pages/Help'
import SubmitDocuments from './pages/SubmitDocuments'

const theme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#2D2B29', // Темно-серый/черный
    },
    secondary: {
      main: '#FAF752', // Желтый
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: {
      primary: '#2D2B29',
      secondary: '#2D2B29'
    },
    grey: {
      100: '#D9D9D9', // Светло-серый
      200: '#B3C2E4', // Светло-синий
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={
                <>
                  <Header />
                  <main style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/benefit/:id" element={<BenefitDetail />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/submit-documents/:id" element={<SubmitDocuments />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
