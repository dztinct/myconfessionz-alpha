import React from 'react'
import HomeLeftSideBar from '../components/HomeLeftSideBar'
import HomeRightSideBar from '../components/HomeRightSideBar'
import HomePosts from '../components/HomePosts'

const Home = () => {
  return (
      <div className='flex mt-4'>
      <HomeLeftSideBar/>
      <HomePosts/>
      <HomeRightSideBar/>
    </div>
  )
}

export default Home