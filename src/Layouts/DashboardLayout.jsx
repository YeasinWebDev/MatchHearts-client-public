import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Dashboard/Sidebar'

function DashboardLayout() {
  return (
    <div className=''>
      <div className=''>
        {/* sidebar */}
        <Sidebar />
      </div>
      <div className='ml-64 '>
        <Outlet className='bg-[#FEFBF0]'/>
      </div>
    </div>
  )
}

export default DashboardLayout