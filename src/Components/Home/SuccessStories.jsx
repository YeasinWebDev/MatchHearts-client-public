import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosCommon from '../../Hooks/useAxiosCommon';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';


function SuccessStories() {
    const axiosCommon = useAxiosCommon();
    const { data, isLoading } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const response = await axiosCommon.get('/successStories');
            return response.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className=" py-10  w-full bg-[#FEFBF0]">
            <div className='flex items-center justify-center flex-col'>
                <h2 className="text-3xl font-semibold text-center mb-4  w-full">Success Stories</h2>
                <p className="text-center text-gray-600 lg:w-[50%] mb-8  w-full">
                    Hear from couples who found their perfect match on MatchHearts. These stories are a testament to the love and happiness that our platform has helped create.
                </p>
            </div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {
                    data.map(story => (
                        <SwiperSlide key={story._id}>
                            <div key={story._id} className="bg-[#FEFBF0] text-black shadow-lg rounded-lg p-6 mx-5 flex flex-col items-center">
                                <img src={story.coupleImage} alt="Couple" className="w-[30vw] h-[30vh] object-cover  rounded-md mb-4" />
                                <div className="flex items-center mb-2">
                                    {Array(story.reviewStar).fill().map((_, i) => (
                                        <FaStar key={i} className="text-yellow-500" />
                                    ))}
                                </div>
                                <p className="text-black text-xl font-semibold mb-2">Marriage Date: {new Date(story.marriageDate).toLocaleDateString()}</p>
                                <p className="text-gray-600 text-center w-[40%] pt-5">{story.successStoryText}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default SuccessStories;
