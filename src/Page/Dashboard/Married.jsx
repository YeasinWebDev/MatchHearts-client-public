import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

function Married() {
  const axiosSecure = useAxiosSecure()
  const handleSubmit = (e) => {
    e.preventDefault();
    const from = e.target
    const male = from.male.value
    const female = from.female.value
    const img = from.img.value
    const reviewStar = from.reviewStar.value
    const parsInreviewStar = parseInt(reviewStar)
    const marriageDate = from.marriageDate.value
    const successStoryText = from.successStoryText.value
    console.log(img)

    const data = {
      male,
      female,
      coupleImage: img,
      reviewStar: parsInreviewStar,
      marriageDate,
      successStoryText,
    }

    const result = axiosSecure.post('/successStories', data)
      .then((res) => {
        toast.success('Story Added Successfully')
        from.reset()
      })


  }
  return (
    <div>
      <Helmet>
        <title>MatchHearts || Married</title>
      </Helmet>
      <h2 className='text-4xl font-semibold text-[#302F2A] flex items-center justify-center py-10'>Add Story</h2>
      <div className='flex items-center justify-center pt-20'>
        <form onSubmit={handleSubmit} className='border-2  px-10 py-5 rounded-xl bg-[#F2F2F2]'>
          <div className='py-2'>
            <label className='text-xl font-semibold '>Your Biodata ID:</label>
            <input name='male' className='border-2 border-black outline-none ml-2 rounded-md px-3 py-2' type="text" required />
          </div>
          <div className='py-2'>
            <label className='text-xl font-semibold '>Partner Biodata ID:</label>
            <input name='female' className='border-2 border-black outline-none ml-2 rounded-md px-3 py-2' required />
          </div>
          <div className='py-2'>
            <label className='text-xl font-semibold '>Couple Image Link:</label>
            <input name='img' className='border-2 border-black outline-none ml-2 rounded-md px-3 py-2' required />
          </div>
          <div className='py-2'>
            <label className='text-xl font-semibold '>Review Star:</label>
            <input name='reviewStar' className='border-2 border-black outline-none ml-2 rounded-md px-3 py-2' required />
          </div>
          <div className='py-2'>
            <label className='text-xl font-semibold '>Marriage Date:</label>
            <input type='date' name='marriageDate' className='border-2 border-black outline-none ml-2 rounded-md px-3 py-2' required />
          </div>
          <div className='py-2'>
            <label className='text-xl font-semibold '>Success Story Review:</label> <br />
            <textarea name='successStoryText' className='border-2 border-black outline-none rounded-md px-3 py-2 mt-3 resize-none' cols={50} rows={4} required />
          </div>
          <button type="submit" className=' bg-blue-600 px-4 py-2 text-white rounded-xl'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Married 