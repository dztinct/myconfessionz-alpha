import React from 'react'
import HomeLeftSideBar from '../../components/home/HomeLeftSideBar'
import HomeRightSideBar from '../../components/home/HomeRightSideBar'
import CreatePostTemp from './CreatePostTemp'


const CreatePost = () => {
    return (
        <div className='flex justify-between mt-4'>
            <HomeLeftSideBar/>
            <CreatePostTemp/>
            <HomeRightSideBar/>
        </div>
    )
}

export default CreatePost
