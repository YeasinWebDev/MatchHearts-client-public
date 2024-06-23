import React from 'react'
import { BsPeople } from "react-icons/bs";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Helmet } from 'react-helmet';

const mapdata = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#CA8A04', '#FACC15', '#F87171', '#60A5FA', '#16A34A'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function AdminDashboard() {
    const axiosSecure = useAxiosSecure()
    const { data } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const response = await axiosSecure.get('/DashbordStats');
            return response.data;
        }
    })

    const pieChartData = [
        { name: 'Premium Biodata', value: data?.premiumBiodata },
        { name: 'Total Biodata', value: data?.totalBioDatas },
        { name: 'Total Girls', value: data?.totalGirls },
        { name: 'Total Boys', value: data?.totalBoys },
        { name: 'Total Revenue', value: data?.totalRevenue }
    ];

    return (
        <div>
            <Helmet>
                <title>MatchHearts || Admin Dashboard</title>
            </Helmet>
            <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>Admin Dashboard</h2>

            <div className='flex gap-3 items-center justify-center flex-wrap'>
                {/* 1 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-yellow-400'>
                    <span><BsPeople size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>total biodata</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalBioDatas}</h3>
                    </div>
                </div>

                {/* 2 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-blue-400'>
                    <span><FaMale size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Male biodata</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalBoys}</h3>
                    </div>
                </div>

                {/* 3 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-red-400'>
                    <span><FaFemale size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Female biodata</h1>
                        <h3 className='font-semibold text-xl'>{data?.totalGirls}</h3>
                    </div>
                </div>

                {/* 4 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-yellow-600'>
                    <span><MdOutlineWorkspacePremium size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Premium biodata</h1>
                        <h3 className='font-semibold text-xl'>{data?.premiumBiodata}</h3>
                    </div>
                </div>

                {/* 5 */}
                <div className='flex items-center justify-center gap-8 border-2 rounded-xl shadow-md w-fit px-5 py-3 bg-green-600'>
                    <span><IoBarChartSharp size={34} color='#fff' /></span>
                    <div className='flex flex-col items-center'>
                        <h1 className='font-semibold text-lg'>Total revenue</h1>
                        <h3 className='font-semibold text-xl'>${data?.totalRevenue}</h3>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', height: '400px' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AdminDashboard