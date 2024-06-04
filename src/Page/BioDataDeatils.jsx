import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosCommon from '../Hooks/useAxiosCommon'
import { GiBodyHeight } from "react-icons/gi";
import { AuthContext } from '../Auth/ContextProvider';

function BioDataDeatils() {
    const { id } = useParams()
    const axiosCommon = useAxiosCommon()
    const { user } = useContext(AuthContext)

    const { data: role = [] } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const response = await axiosCommon.get(`/user`, { params: { email: user.email } });
            return response.data;
        }
    });


    const { data: Biodata = [] } = useQuery({
        queryKey: ['biodata', id],
        queryFn: async () => {
            const response = await axiosCommon.get(`/bioDatas/${id}`)
            return response.data
        }
    })

    console.log(role)

    return (
        <div>
            <div>
                <h1 className='flex items-center justify-center text-xl md:text-4xl py-10 font-bold text-[#302F2A]'>Biodata</h1>

                <div className='flex justify-center items-center flex-col'>
                    <div className=''>
                        {/* left */}
                        <div className='md:w-[30vw] w-full'>
                            <img className='w-full object-cover rounded-xl' src={Biodata?.profileImage} alt="" />
                        </div>
                    </div>
                    {/* right */}
                    <div className=''>
                        <div className='flex justify-center items-center gap-2 pt-5'>
                            <h1 className='md:text-4xl text-xl font-semibold'>{Biodata?.name}</h1>
                            <h1 className='text-orange-600 font-semibold mt-3'>({Biodata.biodataType})</h1>
                        </div>
                        <h1 className='font-semibold flex justify-center'>Birth: <span className='pl-3 text-orange-600'>{Biodata?.dateOfBirth}</span></h1>

                        <div className="flex justify-center items-center gap-10 flex-wrap py-5">
                            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                <GiBodyHeight size={30} />
                                <h3 className="text-4xl font-bold text-orange-400">{Biodata.height}</h3>
                            </div>
                            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                <img className='w-10' src="https://i.ibb.co/0r0hvsg/age-icon.png" alt="" />
                                <h3 className="text-4xl font-bold text-orange-400">{Biodata?.age}</h3>
                            </div>
                            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                <img className='w-10' src="https://i.ibb.co/yPjcN8J/weight.png" alt="" />
                                <h3 className="text-4xl font-bold text-orange-400">{Biodata?.weight}</h3>
                            </div>
                            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                <img className='w-10' src="https://i.ibb.co/PNmW5BC/briefcase.png" alt="" />
                                <h3 className="text-4xl font-bold text-orange-400">{Biodata?.occupation}</h3>
                            </div>
                        </div>

                        <div className='flex items-center justify-between flex-wrap py-10 border-b-2 px-5 md:px-0'>
                            <div>
                                <h1 className='font-semibold text-2xl'>Permanent Division: <span className='pl-2 text-orange-600'>{Biodata?.permanentDivision}</span></h1>
                                <h1 className='font-semibold text-2xl'>Present Division: <span className='pl-2 text-orange-600'>{Biodata?.presentDivision}</span></h1>
                            </div>
                            <div>
                                <h1 className='font-semibold text-2xl'>Father Name: <span className='pl-2 text-orange-600'>{Biodata?.fathersName}</span></h1>
                                <h1 className='font-semibold text-2xl'>Mother Name: <span className='pl-2 text-orange-600'>{Biodata?.mothersName}</span></h1>
                            </div>
                        </div>

                        <div className='border-b-2'>
                            <h1 className='text-2xl font-semibold flex justify-center py-5'>Expected Partner</h1>

                            <div className='flex justify-center items-center gap-10 flex-wrap py-5'>
                                <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                    <GiBodyHeight size={30} />
                                    <h3 className="text-4xl font-bold text-orange-400">{Biodata.expectedPartnerHeight}</h3>
                                </div>
                                <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                    <img className='w-10' src="https://i.ibb.co/0r0hvsg/age-icon.png" alt="" />
                                    <h3 className="text-4xl font-bold text-orange-400">{Biodata?.expectedPartnerAge}</h3>
                                </div>
                                <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                                    <img className='w-10' src="https://i.ibb.co/yPjcN8J/weight.png" alt="" />
                                    <h3 className="text-4xl font-bold text-orange-400">{Biodata?.expectedPartnerWeight}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='py-10 flex gap-4 justify-between flex-wrap px-10'>
                            <div className='flex justify-center flex-col'>
                                {role.role === 'premium' ?
                                    <>
                                        <h1 className='font-semibold text-2xl'>Contact Email: <span className='pl-2 text-orange-600'>{Biodata?.contactEmail}</span></h1>
                                        <h1 className='font-semibold text-2xl'>Mobile Number: <span className='pl-2 text-orange-600'>{Biodata?.mobileNumber}</span></h1>
                                    </>
                                    :
                                    <button className='border-2 p-2 border-black rounded-xl font-semibold'>Contact Request</button>
                                }
                            </div>
                            <button className='border-2 border-black p-3 rounded-xl'><img className='w-10' src="https://i.ibb.co/843G0Vw/wishlist.png" alt="" /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BioDataDeatils