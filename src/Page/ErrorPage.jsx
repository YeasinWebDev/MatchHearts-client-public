import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center gap-6 h-screen text-black'>
        <h1 className='text-4xl font-semibold'>404 Page Not Found</h1>
        <Link to={'/'}><button className='p-3 border-[#B18B5E] border-2 cursor-pointer rounded-xl hover:bg-[#B18B5E] hover:text-white'>Back to Home</button></Link>
    </div>
  )
}

export default ErrorPage