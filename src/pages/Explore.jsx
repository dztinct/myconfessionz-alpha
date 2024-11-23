import React from 'react'
import HomeLeftSideBar from '../components/home/HomeLeftSideBar'
import HomeRightSideBar from '../components/home/HomeRightSideBar'
import ExplorePosts from '../components/ExplorePosts'

const Explore = () => {
  return (
      <div className='flex mt-4'>
      <HomeLeftSideBar/>
      <ExplorePosts/>
      <HomeRightSideBar/>
    </div>
  )
}

export default Explore