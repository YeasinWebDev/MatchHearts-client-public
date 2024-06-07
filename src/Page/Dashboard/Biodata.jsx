import React, { useContext, useState } from 'react';
import { imageUpload } from '../../Api';
import { AuthContext } from '../../Auth/ContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Biodata() {
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const axiosSecure= useAxiosSecure()

  const divisions = [
    'Dhaka', 'Chattagram', 'Rangpur', 'Barisal',
    'Khulna', 'Maymansign', 'Sylhet'
  ];


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    

    const from = e.target
    const name = from.name.value
    const biodataType = from.biodataType.value
    const profile = from.image.files[0]
    const fathersName = from.fathersName.value
    const mothersName = from.mothersName.value
    const dateOfBirth = from.dateOfBirth.value
    const height = from.height.value
    const weight = from.weight.value
    const age = from.age.value
    const occupation = from.occupation.value
    const race = from.race.value
    const permanentDivision = from.permanentDivision.value
    const presentDivision = from.presentDivision.value
    const expectedPartnerAge = from.expectedPartnerAge.value
    const expectedPartnerHeight = from.expectedPartnerHeight.value
    const expectedPartnerWeight = from.expectedPartnerWeight.value
    const contactEmail = from.contactEmail.value
    const mobileNumber = from.mobileNumber.value

    const profileImage = await imageUpload(profile)

    const data = {
      name,
      biodataType,
      profileImage,
      fathersName,
      mothersName,
      dateOfBirth,
      height,
      weight,
      age,
      occupation,
      race,
      permanentDivision,
      presentDivision,
      expectedPartnerAge,
      expectedPartnerHeight,
      expectedPartnerWeight,
      contactEmail,
      mobileNumber
    }
    
    const result = await axiosSecure.put('/bioDatas', data)
    toast.success('Your BioData is ready')
    navigate('/dashboard/viewBiodata')
    setLoading(false)
  };

  return (
    <div className=''>
      <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center pt-10'>Add BioData</h2>
      <div className='w-[65%]  mx-auto  border-2 border-[#302F2A] px-10 mt-5 rounded-xl'>
        <form onSubmit={handleSubmit} className='w-full py-10'>
          {/* 1 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-3 items-center '>
              <label className='block font-semibold text-lg'>Name:</label>
              <input className='border-2 rounded-md outline-none border-black p-1 w-fit' type="text" name="name" required />
            </div>
            <div className='flex gap-3 items-center'>
              <label className='block font-semibold text-lg'>Biodata Type:</label>
              <select className='border-2 p-2 rounded-lg border-black' name="biodataType" required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* 2 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Father's Name:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="fathersName" />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Mother's Name:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="mothersName" />
            </div>
          </div>

          {/* 3 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label htmlFor='image' className='block font-semibold text-lg'>
                profile Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Date of Birth:</label>
              <input className='border-2 p-2' type="date" name="dateOfBirth" required />
            </div>
          </div>

          {/* 4 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Height:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="height" required />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Weight:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="weight" required />
            </div>
          </div>

          {/* 5 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Age:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="number" name="age" />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Occupation:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="occupation" required />
            </div>
          </div>

          {/* 6 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Race:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="race" required />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Permanent Division:</label>
              <select className='border-2 p-2 rounded-lg border-black' name="permanentDivision" required>
                <option value="">Select</option>
                {divisions.map(division => (
                  <option key={division}>{division}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 7 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Present Division:</label>
              <select className='border-2 p-2 rounded-lg border-black' name="presentDivision" required>
                <option value="">Select</option>
                {divisions.map(division => (
                  <option key={division} >{division}</option>
                ))}
              </select>
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Expected Partner Age:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="number" name="expectedPartnerAge" />
            </div>
          </div>

          {/* 8 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Expected Partner Height:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="expectedPartnerHeight" required />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Expected Partner Weight:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="text" name="expectedPartnerWeight" required />
            </div>
          </div>

          {/* 9 */}
          <div className='flex items-center justify-between pb-5'>
            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Contact Email:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="email" name="contactEmail" value={user?.email} readOnly />
            </div>

            <div className='flex gap-2 items-center'>
              <label className='block font-semibold text-lg'>Mobile Number:</label>
              <input className='border-2 p-2 rounded-lg border-black' type="tel" name="mobileNumber" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className='bg-[#302F2A] text-white py-2 px-3 font-semibold border-none outline-none rounded'>Save And Publish Now</button>
        </form>
      </div>
    </div>
  );
}

export default Biodata;
