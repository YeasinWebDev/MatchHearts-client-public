import React from 'react'
import Hero from '../Components/Home/Hero'
import PremiumMembers from '../Components/Home/PremiumMembers'
import HowItWork from '../Components/Home/HowItWork'
import SuccessCounter from '../Components/Home/SuccessCounter'
import SuccessStories from '../Components/Home/SuccessStories'

function Home() {
  return (
    <div>
      <Hero/>
      <PremiumMembers/>
      <HowItWork/>
      <SuccessCounter/>
      <SuccessStories/>
    </div>
  )
}

export default Home