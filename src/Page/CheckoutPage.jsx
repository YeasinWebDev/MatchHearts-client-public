import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../Auth/ContextProvider'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../Components/Payment/CheckoutForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK)
function CheckoutPage() {
  const { id } = useParams()
  const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext)

  const {data=[]} = useQuery({
    queryKey: ['checkout', id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/bioDatasbyId`, { params: { id } });
      return response.data;
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <Helmet>
        <title>MatchHearts || Checkout</title>
      </Helmet>
      <h1 className='flex items-center justify-center text-xl md:text-4xl py-10 font-bold text-[#302F2A]'>Checkout</h1>
      <div className='mx-20  flex items-center justify-center flex-col'>

        <div className='border-2 p-8 rounded-xl'>
          <div className='flex items-center  gap-3'>
            <h1 className='font-semibold text-2xl'>biodataId:</h1>
            <input type="text" className='outline-none border-2 mt-5 px-3 bg-transparent text-xl mb-5 py-2 rounded-xl w-20' value={id} readOnly />
          </div>

          <div className='flex items-center  gap-3'>
            <h1 className='font-semibold text-2xl'>Email:</h1>
            <input type="text" className='outline-none border-2 mt-5 px-3 bg-transparent text-xl mb-5 py-2 rounded-xl w-fit' value={user?.email} readOnly />
          </div>

          <div>
            <h1 className=' flex items-center justify-center text-xl md:text-2xl py-6 font-bold text-[#302F2A]'>Payment</h1>
            <div className='w-[25vw]'>
              <Elements stripe={stripePromise}>
                <CheckoutForm bioDataId={id} email={data?.contactEmail} mobile={data?.mobileNumber} name={data?.name}/>
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage