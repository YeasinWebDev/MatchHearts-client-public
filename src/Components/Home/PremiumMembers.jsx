import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'
import { Link } from 'react-router-dom';

function PremiumMembers() {
    const axiosCommon = useAxiosCommon()
    const [sortOrder, setSortOrder] = useState('ascending');

    const { data = [], isLoading } = useQuery({
        queryKey: ['premiumMembers'],
        queryFn: async () => {
            const data = await axiosCommon.get('/bioDatas')
            return data.data
        }
    })


    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    }

    const sortedData = data ? [...data].sort((a, b) => {
        if (sortOrder === 'ascending') {
            return a.age - b.age
        } else {
            return b.age - a.age;
        }
    }) : []


    return (
        <div className='flex items-center justify-center flex-col bg-[#FEFBF0]'>
            <h2 className="text-3xl font-semibold text-center mb-4 pt-10">Meet Our Premium Members</h2>
            <p className="text-center text-gray-600 lg:w-[50%] mb-8">Discover our premium members who are actively seeking their perfect match. Each profile is carefully selected to showcase individuals ready for a meaningful connection. Explore their biodata to learn more and start your journey towards finding true love.</p>
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
                        <div className="flex justify-center items-center py-10">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-black"></div>
                        </div>
                    </div>
                    :
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mr-20 lg:mr-0'>
                        {sortedData?.slice(0, 6).map(member => (
                            <div key={member._id} className="bg-[#FFFCF0] text-black shadow-lg rounded-lg p-6 lg:w-80 w-[18rem] mx-20 relative">
                                <img src={member.profileImage} alt={`Profile of ${member.type}`} className=" lg:w-[20vw] mx-auto h-48 object-cover rounded-md mb-4" />
                                <div className=" flex flex-col  w-full">
                                    <h3 className="text-xl font-semibold absolute bg-[#302F2A] rounded-full w-10 h-10 flex items-center justify-center text-white top-2">{member.biodata_id}</h3>
                                    <h3 className="text-xl font-semibold flex gap-2 ">Biodata Type: <span className='text-orange-400 font-semibold'>{member.biodataType}</span></h3>
                                    <h3 className="text-black text-xl"><span className='font-semibold'> Division:</span> {member.permanentDivision}</h3>
                                    <h3 className="text-black text-xl"><span className='font-semibold'> Age:</span> <span className='text-orange-400 font-semibold'>{member.age}</span></h3>
                                    <h3 className="text-black text-xl whitespace-nowrap"><span className='font-semibold'> Job:</span> {member.occupation}</h3>
                                    <Link to={`/details/${member._id}`}> <button className="mt-4 px-4 py-2 bg-[#c4ba8f] text-black font-semibold rounded-lg shadow hover:bg-[#b39c42]">View Profile</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    )
}

export default PremiumMembers