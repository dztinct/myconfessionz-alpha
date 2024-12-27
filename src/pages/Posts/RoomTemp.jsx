import rooms from '../../components/inc/rooms'

const RoomTemp = () => {
    return (
        <div className='mt-16 mb-24'>
            <div className='text-bRed text-center text-2xl my-4'>Rooms</div>
            <div className="flex mx-auto w-full items-center justfy-center">
                <ul className="flex flex-col bg-bRed p-4 md:w-[28rem] lg:w-[28rem]">
                    {rooms.map((item, index) => (
                        <a href={"/room/"+item.room}>
                            <li key={index} className="border-red-500 flex flex-row mb-2">
                                <div className="select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex flex-col rounded-md w-10 h-10 text-xl bg-gray-200 justify-center items-center mr-4">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1 pl-1 mr-16">
                                        <div className="font-medium text-bRed">{item.room}</div>
                                    </div>
                                </div>
                            </li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default RoomTemp
