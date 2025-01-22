import React from 'react'
import HomeLeftSideBar from '../../components/home/HomeLeftSideBar'
import HomeRightSideBar from '../../components/home/HomeRightSideBar'
import SinglePost from './SinglePostTemp'


const CreatePost = () => {
    return (
        <div className='flex justify-between mt-4'>
            <HomeLeftSideBar/>
            <SinglePost/>
            <HomeRightSideBar/>
        </div>
    )
}

export default CreatePost
