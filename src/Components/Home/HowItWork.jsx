import React from 'react';

function HowItWork() {
  const steps = [
    {
      image: 'https://i.ibb.co/bPQ5NJH/ring.png',
      title: "Sign Up",
      description: "Create your profile in just a few steps. It's easy and free to join."
    },
    {
      image: 'https://i.ibb.co/2j4HHNC/wedding-2.png',
      title: "Find Matches",
      description: "Use our advanced search tools to find potential matches based on your preferences."
    },
    {
      image: 'https://i.ibb.co/hdkMNVX/connect.png',
      title: "Connect",
      description: "Connect with your matches and start building meaningful relationships."
    },
    {
      image: 'https://i.ibb.co/XS1rd4x/chat.png',
      title: "Communicate",
      description: "Chat and communicate with your matches to get to know them better."
    }
  ];

  return (
    <div className="flex items-center justify-center flex-col pt-20 bg-[#Fff]">
      <h2 className="text-3xl  lg:text-4xl font-bold text-center mb-4">How It Works</h2>
      <p className="text-center text-gray-600 lg:w-[40%] mb-8 font-semibold">
        Our platform is designed to make it easy for you to find your perfect match. Follow these simple steps to start your journey towards a meaningful relationship.
      </p>
      <div className="flex justify-center items-center gap-5 flex-wrap ">
        {
          steps.map((step, i) => (
            <>
              <div className="flex  items-center flex-col lg:flex-row   gap-4 p-2 lg:w-[50%] ">
                <h1 className='w-10 h-10 flex items-center justify-center rounded-full bg-black text-white'>{i + 1}</h1>
                <img className='lg:w-[10vw] w-[30vw]' src={step.image} alt="step" />
                <div className='flex flex-col items-center justify-center text-center'>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-gray-600 w-[70%] font-semibold">{step.description}</p>
                </div>
              </div>
            </>
          ))
        }
      </div>
    </div>
  );
}

export default HowItWork;
