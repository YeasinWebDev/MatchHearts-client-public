import React from 'react'
import { BsPeople } from "react-icons/bs";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

function AdminDashboard() {
    const axiosSecure = useAxiosSecure()
    const {data} = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const response = await axiosSecure.get('/DashbordStats');
            return response.data;
        }
    })
  return (
    <div>
        <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>Admin Dashboard</h2>

        <div className='flex gap-3 items-center justify-center'>
            {/* 1 */}
            <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-yellow-400'>
                <span><BsPeople size={34} color='#fff'/></span>
                <div className='flex flex-col items-center'>
                    <h1 className='font-semibold text-lg'>total biodata</h1>
                    <h3 className='font-semibold text-xl'>{data?.totalBioDatas}</h3>
                </div>
            </div>

            {/* 2 */}
            <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-blue-400'>
                <span><FaMale size={34} color='#fff'/></span>
                <div className='flex flex-col items-center'>
                    <h1 className='font-semibold text-lg'>Male biodata</h1>
                    <h3 className='font-semibold text-xl'>{data?.totalBoys}</h3>
                </div>
            </div>

            {/* 3 */}
            <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-red-400'>
                <span><FaFemale size={34} color='#fff'/></span>
                <div className='flex flex-col items-center'>
                    <h1 className='font-semibold text-lg'>Female biodata</h1>
                    <h3 className='font-semibold text-xl'>{data?.totalGirls}</h3>
                </div>
            </div>

            {/* 4 */}
            <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-yellow-600'>
                <span><MdOutlineWorkspacePremium size={34} color='#fff'/></span>
                <div className='flex flex-col items-center'>
                    <h1 className='font-semibold text-lg'>Premium biodata</h1>
                    <h3 className='font-semibold text-xl'>{data?.premiumBiodata}</h3>
                </div>
            </div>

            {/* 5 */}
            <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-green-600'>
                <span><IoBarChartSharp size={34} color='#fff'/></span>
                <div className='flex flex-col items-center'>
                    <h1 className='font-semibold text-lg'>Total revenue</h1>
                    <h3 className='font-semibold text-xl'>${data?.totalRevenue}</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard