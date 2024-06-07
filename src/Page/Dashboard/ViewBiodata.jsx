import React, { useContext } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Auth/ContextProvider';
import { GiBodyHeight } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

function ViewBiodata() {
  const { user } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

  // get req
  const { data: response = [] } = useQuery({
    queryKey: ['dashboardBiodata', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/dashboardBiodata`, { params: { contactEmail: user?.email } });
      return response.data;
    }
  });


  const biodata = response.bioData
  const status = response.status



  const handelclick = () => {
    if (status?.biodataId === biodata?.biodata_id) {
      return toast.error('Wait for Admin Approvement')
    }

    const data = {
      name: biodata?.name,
      email: user?.email,
      biodataId: biodata?.biodata_id,
      status: 'pending'
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You want to Make your biodata premium",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.post('/makePremium', data)
        if (result.data.insertedId) {
          Swal.fire({
            title: "Requested!",
            text: "Your Request has been sent",
            icon: "success"
          });
        }
      }
    });
  }

  return (
    <div>
      <h1 className='flex items-center justify-center text-xl md:text-4xl py-10 font-bold text-[#302F2A]'>View Biodata</h1>

      <div className='flex justify-center items-center flex-col'>
        <div className=''>
          {/* left */}
          <div className='md:w-[30vw] w-full'>
            <img className='w-full object-cover rounded-xl' src={biodata?.profileImage} alt="" />
          </div>
        </div>
        {/* right */}
        <div className=''>
          <div className='flex justify-center items-center gap-2 pt-5'>
            <h1 className='md:text-4xl text-xl font-semibold'>{biodata?.name}</h1>
            <h1 className='text-orange-600 font-semibold mt-3'>({biodata?.biodataType})</h1>
          </div>
          <h1 className='font-semibold flex justify-center'>Birth: <span className='pl-3 text-orange-600'>{biodata?.dateOfBirth}</span></h1>

          <div className="flex justify-center items-center gap-2 flex-wrap py-5">
            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
              <GiBodyHeight size={30} />
              <h3 className="text-4xl font-bold text-orange-400">{biodata?.height}</h3>
            </div>
            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
              <img className='w-10' src="https://i.ibb.co/0r0hvsg/age-icon.png" alt="" />
              <h3 className="text-4xl font-bold text-orange-400">{biodata?.age}</h3>
            </div>
            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
              <img className='w-10' src="https://i.ibb.co/yPjcN8J/weight.png" alt="" />
              <h3 className="text-4xl font-bold text-orange-400">{biodata?.weight}</h3>
            </div>
            <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
              <img className='w-10' src="https://i.ibb.co/PNmW5BC/briefcase.png" alt="" />
              <h3 className="text-4xl font-bold text-orange-400">{biodata?.occupation}</h3>
            </div>
          </div>

          <div className='flex items-center justify-between flex-wrap py-10 border-b-2 px-5 md:px-0'>
            <div>
              <h1 className='font-semibold text-2xl'>Permanent Division: <span className='pl-2 text-orange-600'>{biodata?.permanentDivision}</span></h1>
              <h1 className='font-semibold text-2xl'>Present Division: <span className='pl-2 text-orange-600'>{biodata?.presentDivision}</span></h1>
            </div>
            <div>
              <h1 className='font-semibold text-2xl'>Father Name: <span className='pl-2 text-orange-600'>{biodata?.fathersName}</span></h1>
              <h1 className='font-semibold text-2xl'>Mother Name: <span className='pl-2 text-orange-600'>{biodata?.mothersName}</span></h1>
            </div>
          </div>

          <div className='border-b-2'>
            <h1 className='text-2xl font-semibold flex justify-center py-5'>Expected Partner</h1>

            <div className='flex justify-center items-center gap-10 flex-wrap py-5'>
              <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                <GiBodyHeight size={30} />
                <h3 className="text-4xl font-bold text-orange-400">{biodata?.expectedPartnerHeight}</h3>
              </div>
              <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                <img className='w-10' src="https://i.ibb.co/0r0hvsg/age-icon.png" alt="" />
                <h3 className="text-4xl font-bold text-orange-400">{biodata?.expectedPartnerAge}</h3>
              </div>
              <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center gap-2">
                <img className='w-10' src="https://i.ibb.co/yPjcN8J/weight.png" alt="" />
                <h3 className="text-4xl font-bold text-orange-400">{biodata?.expectedPartnerWeight}</h3>
              </div>
            </div>
          </div>

          <div className='py-10 flex gap-4 justify-between flex-wrap md:px-10'>
            <div className='flex justify-center flex-col'>
              <h1 className='font-semibold text-2xl'>Contact Email: <span className='pl-2 text-orange-600'>{biodata?.contactEmail}</span></h1>
              <h1 className='font-semibold text-2xl'>Mobile Number: <span className='pl-2 text-orange-600'>{biodata?.mobileNumber}</span></h1>
            </div>
            {
              status?.status === 'accepted'
                ?
                <p className='font-semibold mt-5 md:pl-10 text-lg text-orange-600'>(Your Biodata is Premium now)</p>
                :
                  <button onClick={handelclick} className='border-2 border-black p-3 rounded-xl flex items-center gap-2 font-semibold text-lg'>Make premium  <span><MdOutlineWorkspacePremium size={28} color='#EA580C' /></span></button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBiodata