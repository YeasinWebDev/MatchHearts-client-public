import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Home/Navbar'
import Footer from '../Components/Home/Footer'

function Route() {
  return (
    <>
    <div className=''>
      <Navbar />
    </div>
      <div className='w-full min-h-screen'>
      <Outlet />
      </div>
      <Footer/>
    </>
  )
}

export default Route