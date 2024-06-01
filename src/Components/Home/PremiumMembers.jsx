import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import useAxiosCommon from '../../Hooks/useAxiosCommon'

function PremiumMembers() {
    const axiosCommon = useAxiosCommon()
    const [sortOrder, setSortOrder] = useState('ascending');

    const { data } = useQuery({
        queryKey: ['premiumMembers'],
        queryFn: async () => {
            const data = await axiosCommon.get('/bioDatas')
            return data.data
        }
    })

    console.log(data)

    const handleSortOrderChange = (e) =>{
        setSortOrder(e.target.value);
    }

    const sortedData = data ? [...data].sort((a,b) => {
        if(sortOrder === 'ascending'){
            return a.age - b.age
        }else{
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
            <div className='flex justify-center items-center gap-5 flex-wrap'>
                {sortedData?.map(member => (
                    <div key={member._id} className="bg-[#FFFCF0] text-black shadow-lg rounded-lg p-6  mx-20">
                        <img src={member.profileImage} alt={`Profile of ${member.type}`} className=" lg:w-[20vw] flex items-center justify-center h-48 object-cover rounded-md mb-4" />
                        <div className=" flex flex-col w-full">
                            <h3 className="text-xl font-semibold">biodata id: {member.biodata_id}</h3>
                            <h3 className="text-xl font-semibold flex gap-2 ">Biodata Type: <span className='text-orange-400 font-semibold'>{member.biodataType}</span></h3>
                            <p className="text-black text-xl"><span className='font-semibold'> Division:</span> {member.permanentDivision}</p>
                            <p className="text-black text-xl"><span className='font-semibold'> Age:</span> <span className='text-orange-400 font-semibold'>{member.age}</span> years old</p>
                            <p className="text-black text-xl"><span className='font-semibold'> Occupation:</span> {member.occupation}</p>
                            <button className="mt-4 px-4 py-2 bg-[#c4ba8f] text-black font-semibold rounded-lg shadow hover:bg-[#b39c42]">View Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PremiumMembers