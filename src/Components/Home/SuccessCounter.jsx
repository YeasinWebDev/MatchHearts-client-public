import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../Hooks/useAxiosCommon';

function SuccessCounter() {
  const axiosCommon = useAxiosCommon();
  const { data, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await axiosCommon.get('/stats');
      return response.data;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center flex-col py-20 bg-[#fff]">
      <h2 className="text-3xl  lg:text-4xl font-bold text-center mb-4">Our Success</h2>
      <p className="text-center text-gray-600 lg:w-[30%] mb-8 font-semibold">
        Discover the impact we have made through our platform. Here are some of our achievements.
      </p>
      <div className="flex justify-center items-center gap-10 flex-wrap">
        <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center">
          <h3 className="text-4xl font-bold text-orange-400">{data.totalBioDatas}</h3>
          <p className="text-xl font-semibold mt-2">Total Biodatas</p>
        </div>
        <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center">
          <h3 className="text-4xl font-bold text-orange-400">{data.totalGirls}</h3>
          <p className="text-xl font-semibold mt-2">Girl's Biodatas</p>
        </div>
        <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center">
          <h3 className="text-4xl font-bold text-orange-400">{data.totalBoys}</h3>
          <p className="text-xl font-semibold mt-2">Boy's Biodatas</p>
        </div>
        <div className="bg-white text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center">
          <h3 className="text-4xl font-bold text-orange-400">{data.totalMarriages}</h3>
          <p className="text-xl font-semibold mt-2">Marriages Completed</p>
        </div>
      </div>
    </div>
  );
}

export default SuccessCounter;
