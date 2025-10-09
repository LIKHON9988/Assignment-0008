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
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-sm">
        <img 
          src={err} 
          alt="404 Error" 
          className="mx-auto h-40 w-auto mb-6" 
        />
        
        <h3 className="text-4xl font-bold text-gray-700 mb-2">
          OPPS!! PAGE NOT FOUND
        </h3>
        <p className="text-gray-500 mb-6">
          The page you are requesting is not found on our system. Please try another page
        </p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition shadow-md"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/apps')}
            className="px-6 py-2 bg-white border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition shadow-md"
          >
            Browse Apps
          </button>
        </div>
      </div>
    </div>
  )
}
