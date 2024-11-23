import React from 'react'
import HomeLeftSideBar from '../components/home/HomeLeftSideBar'
import HomeRightSideBar from '../components/home/HomeRightSideBar'
import HomePosts from '../components/home/HomePosts'

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