import React from 'react'
import Hero from '../Components/Home/Hero'
import PremiumMembers from '../Components/Home/PremiumMembers'
import HowItWork from '../Components/Home/HowItWork'
import SuccessCounter from '../Components/Home/SuccessCounter'
import SuccessStories from '../Components/Home/SuccessStories'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <div>
      <Helmet>
        <title>MatchHearts || Home</title>
      </Helmet>
      <Hero />
      <PremiumMembers />
      <HowItWork />
      <SuccessCounter />
      <SuccessStories />
    </div>
  )
}

export default Home