import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './utils/AuthContext'
import Header from './components/common/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Catalog from './pages/Catalog'
import BenefitDetail from './pages/BenefitDetail'

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5'
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
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/benefit/:id" element={<BenefitDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
