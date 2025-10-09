import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import err from '/assets/error-404.png'

export default function ErrorPage(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-lg">
        <div className="relative">
          <img src={err} alt="404" className="mx-auto max-w-full h-auto mb-6 transform hover:scale-105 transition-transform duration-300" />
          <div className="absolute -top-4 -right-4 bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold animate-pulse">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-800">Oops, page not found!</h1>
        <p className="text-gray-600 mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition shadow-md flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Back to Home
          </button>
          <button 
            onClick={() => navigate('/apps')}
            className="px-6 py-3 bg-white border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition shadow-md flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Browse Apps
          </button>
        </div>
      </div>
    </div>
  )
}
