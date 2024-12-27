import React from 'react'
import RoomTemp from './RoomTemp'
import HomeLeftSideBar from '../../components/home/HomeLeftSideBar'
import HomeRightSideBar from '../../components/home/HomeRightSideBar'


const Rooms = () => {
    return (
        <div className='flex justify-between mt-4'>
            <HomeLeftSideBar/>
            <RoomTemp/>
            <HomeRightSideBar/>
        </div>
    )
}

export default Rooms
