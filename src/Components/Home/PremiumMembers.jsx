import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

function PremiumMembers() {
    const axiosCommon = useAxiosCommon()
    const [sortOrder, setSortOrder] = useState('ascending')

    const { data = [], isLoading } = useQuery({
        queryKey: ['premiumMembers'],
        queryFn: async () => {
            const response = await axiosCommon.get('/bioDatas')
            return response.data
        }
    })

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value)
    }

    const sortedData = data ? [...data].sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.age - b.age
        } else {
            return b.age - a.age
        }
    }) : []

    useGSAP(() => {
        gsap.from('.card', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            stagger: 0.4,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.card',
                start: 'top 80%',
                end: 'bottom 60%',
            },
        })
    }, [data])

    return (
        <div className='flex items-center justify-center flex-col bg-[#fff] my-10'>
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 pt-10">Meet Our Premium Members</h2>
            <p className="text-center text-gray-600 lg:w-[60%] xl:w-[50%] mb-8 font-semibold">
                Discover our premium members who are actively seeking their perfect match. Each profile is carefully selected to showcase individuals ready for a meaningful connection
            </p>
            <div className="mb-4">
                <label htmlFor="sortOrder" className="mr-2 text-lg font-semibold">Sort by Age:</label>
                <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange} className="p-2 border rounded outline-none">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            {
                isLoading ?
                    <div className="flex justify-center items-center py-10">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-black"></div>
                    </div>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mr-20 lg:mr-0'>
                        {sortedData.slice(0, 6).map(member => (
                            <div key={member._id} className="card bg-[#f5f5f3] text-black shadow-lg rounded-lg p-6 relative w-[22rem]">
                                <img src={member.profileImage} alt={`Profile of ${member.type}`} className="lg:w-[20vw] w-full mx-auto h-48 object-cover rounded-md mb-4" />
                                <div className="flex flex-col w-full">
                                    <h3 className="text-xl font-semibold flex gap-2">Biodata Type: <span className='text-orange-400 font-semibold'>{member.biodataType}</span></h3>
                                    <h3 className="text-black text-xl"><span className='font-semibold'>Division:</span> {member.permanentDivision}</h3>
                                    <h3 className="text-black text-xl"><span className='font-semibold'>Age:</span> <span className='text-orange-400 font-semibold'>{member.age}</span></h3>
                                    <h3 className="text-black text-xl whitespace-nowrap"><span className='font-semibold'>Job:</span> {member.occupation}</h3>
                                    <Link to={`/details/${member._id}`}>
                                        <button className="mt-4 px-4 py-2 bg-[#c4ba8f] text-black font-semibold rounded-lg shadow hover:bg-[#b39c42]">
                                            View Profile
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>





            }
        </div>
    )
}

export default PremiumMembers
