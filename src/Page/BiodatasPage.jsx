import React, { useState } from 'react';
import { Drawer, Slider } from '@mui/material';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';

function BiodatasPage() {
  const axiosCommon = useAxiosCommon();
  const animatedComponents = makeAnimated();
  const [selectedOption, setSelectedOption] = useState([]);
  const [ageRange, setAgeRange] = useState([18, 65]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // option for division section
  const options = [
    { value: 'Dhaka', label: 'Dhaka' },
    { value: 'Chattagram', label: 'Chattagram' },
    { value: 'Rangpur', label: 'Rangpur' },
    { value: 'Barisal', label: 'Barisal' },
    { value: 'Khulna', label: 'Khulna' },
    { value: 'Maymansign', label: 'Maymansign' },
    { value: 'Sylhet', label: 'Sylhet' },
  ];

  const { data = [] } = useQuery({
    queryKey: ['premiumbiodatas'],
    queryFn: async () => {
      const data = await axiosCommon.get('/bioDatas');
      return data.data;
    },
  });

  // handle age range change
  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  // handle gender change
  const handleGenderChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedGenders([...selectedGenders, name]);
    } else {
      setSelectedGenders(selectedGenders.filter((gender) => gender !== name));
    }
  };

  // handle division change
  const handleDivisionChange = (selectedOptions) => {
    setSelectedOption(selectedOptions);
  };

  const filteredBiodatas = data.filter((biodata) => {
    const ageMatch = biodata.age >= ageRange[0] && biodata.age <= ageRange[1];
    const genderMatch = selectedGenders.length === 0 || selectedGenders.includes(biodata.biodataType);
    const divisionMatch =
      selectedOption.length === 0 || selectedOption.some((option) => option.value === biodata.permanentDivision);
    return ageMatch && genderMatch && divisionMatch;
  });

  return (
    <div className='w-full min-h-screen bg-[#FEFBF0] py-5'>
      <Helmet>
        <title>MatchHearts || Biodatas Page</title>
      </Helmet>
      <h1 className='flex items-center justify-center text-xl md:text-4xl py-10 font-bold text-[#302F2A]'>Biodatas</h1>
      {/* Filter Toggle Button for Mobile */}
      <div className='lg:hidden flex justify-center'>
        <button
          className='bg-[#c4ba8f] text-black font-semibold rounded-lg shadow px-4 py-2 mb-4'
          onClick={toggleDrawer(true)}
        >
          <FiFilter className='inline-block mr-2' /> Filter
        </button>
      </div>

      <div className='mx-0 md:mx-20 flex flex-col md:flex-row gap-10 justify-between'>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <div className='mt-4 top-10 w-full h-fit border-2 p-10'>
            <h1 className='text-2xl w-full text-[#302F2A] font-semibold flex justify-center border-b-2'>Filter</h1>

            {/* filter by age */}
            <div className='border-b-2 pb-2'>
              <h1 className='flex justify-center py-5 font-semibold text-xl'>By Age</h1>
              <Slider
                value={ageRange}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                min={18}
                max={100}
              />
              <div className='flex justify-between mt-2'>
                <span className='font-semibold'>{ageRange[0]}</span>
                <span className='font-semibold'>{ageRange[1]}</span>
              </div>
            </div>

            {/* filter by gender */}
            <div className='border-b-2 pb-2'>
              <h1 className='flex justify-center py-5 font-semibold text-xl'>By Gender</h1>
              <div className='flex justify-between mt-2 gap-10'>
                <span className='flex items-center justify-center gap-2'>Male <input type="checkbox" name="Male" checked={selectedGenders.includes('Male')} onChange={handleGenderChange} /></span>
                <span className='flex items-center justify-center gap-2'>Female <input type="checkbox" name="Female" checked={selectedGenders.includes('Female')} onChange={handleGenderChange} /></span>
              </div>
            </div>

            {/* filter by division */}
            <div>
              <h1 className='flex justify-center py-5 font-semibold text-xl'>By Division</h1>
              <Select
                components={animatedComponents}
                isMulti
                name="divisions"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleDivisionChange}
                value={selectedOption} 
              />
            </div>
          </div>
        </Drawer>

        {/* filter */}
        <div className={`w-full md:w-[35%] xl:w-[20%] min-h-screen rounded-xl hidden lg:block`}>
          <div className='mt-4 top-10 w-full h-fit border-2 p-10 rounded-xl'>
            <h1 className='text-2xl w-full text-[#302F2A] font-semibold flex justify-center border-b-2'>Filter</h1>

            {/* filter by age */}
            <div className='border-b-2 pb-2'>
              <h1 className='flex justify-center py-5 font-semibold text-xl'>By Age</h1>
              <Slider
                value={ageRange}
                onChange={handleAgeRangeChange}
                valueLabelDisplay="auto"
                min={18}
                max={100}
              />
              <div className='flex justify-between mt-2'>
                <span className='font-semibold'>{ageRange[0]}</span>
                <span className='font-semibold'>{ageRange[1]}</span>
              </div>
            </div>

            {/* filter by gender */}
            <div className='border-b-2 pb-2'>
              <h1 className='flex justify-center py-5 font-semibold text-xl'>By Gender</h1>
              <div className='flex justify-between mt-2 gap-10 xl:gap-0'>
                <span className='flex items-center justify-center gap-2'>Male <input type="checkbox" name="Male" onChange={handleGenderChange} /></span>
                <span className='flex items-center justify-center gap-2'>Female <input type="checkbox" name="Female" onChange={handleGenderChange} /></span>
              </div>
            </div>

            {/* filter by division */}
            <div>
              <h1 className='flex justify-center py-5 font-semibold text-xl'>By Division</h1>
              <Select
                components={animatedComponents}
                isMulti
                name="divisions"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleDivisionChange}
              />
            </div>
          </div>
        </div>

        {/* biodatas */}
        <div className='w-full md:w-[100%] xl:w-[80%]'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
            {filteredBiodatas.map((biodata) => (
              <div key={biodata._id} className="bg-[#FFFCF0] text-black shadow-lg rounded-lg p-6">
                <img src={biodata.profileImage} alt={`Profile of ${biodata.name}`} className="lg:w-[20vw] mx-auto h-48 object-cover rounded-md mb-4" />
                <div className="flex flex-col w-full">
                  <h3 className="text-xl font-semibold">Biodata Id: {biodata.biodata_id}</h3>
                  <h3 className="text-xl font-semibold flex gap-2 ">Biodata Type: <span className='text-orange-400 font-semibold'>{biodata.biodataType}</span></h3>
                  <p className="text-black text-xl"><span className='font-semibold'>Division:</span> {biodata.permanentDivision}</p>
                  <p className="text-black text-xl"><span className='font-semibold'>Age:</span> <span className='text-orange-400 font-semibold'>{biodata.age}</span> years old</p>
                  <p className="text-black text-xl"><span className='font-semibold'>Occupation:</span> {biodata.occupation}</p>
                  <Link to={`/details/${biodata._id}`}> <button className="mt-4 px-4 py-2 bg-[#c4ba8f] text-black font-semibold rounded-lg shadow hover:bg-[#b39c42]">View Profile</button></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BiodatasPage;
