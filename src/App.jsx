import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import AllApps from './pages/AllApps'
import AppDetails from './pages/AppDetails'
import MyInstallations from './pages/MyInstallations'
import ErrorPage from './pages/ErrorPage'

export default function App(){
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // simulate page navigation loading
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apps" element={<AllApps />} />
            <Route path="/apps/:id" element={<AppDetails />} />
            <Route path="/my-installations" element={<MyInstallations />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      )}
      <Footer />
    </div>
  )
}
