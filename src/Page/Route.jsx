import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Home/Navbar'

function Route() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Route