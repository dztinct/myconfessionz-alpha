import logo from '../../images/myconfessionz.png'
import { useEffect } from "react";
import { Country, State }  from 'country-state-city';
// LIKE
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiHandThumbUp } from "react-icons/hi2";
// COMMENT
import { BsChatSquareDots } from "react-icons/bs";
import { BsChatSquareDotsFill } from "react-icons/bs";
// SHARE
import { FaShare } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { useParams } from "react-router-dom";
import { postStore } from '../../store/postStore';

const RoomPosts = () => {
  const { post, fetchRoom } = postStore();
  const { room } = useParams();
  
  useEffect(() => {
    const fetchPosts = async () => {
      await fetchRoom(room);
    };
    fetchPosts();
  }, [fetchRoom]);



  // If no posts are available
  if (!post || post.length === 0) {
    return (
      <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg text-gray-600">No posts available</p>
      </div>
    );
  }

  return (
    <div className="my-28">
      {post.map((singlePost, idx) => (
        <section className="flex flex-row flex-wrap mx-auto" key={idx}>
          {/* Card Component */}
          <div className="transition-all duration-150 flex w-full px-4 py-1 md:w-[80%] sm:w-[80%] mx-auto">
            <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
              <section className="px-4 py-2 mt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <img
                      className="object-cover h-10 w-14 md:h-10 md:w-10 rounded-full bg-black"
                      src={logo}
                      alt="Brand-logo"
                    />
                    <div className="flex flex-col mx-2">
                      <span className="font-semibold text-gray-700 hover:underline text-sm capitalize">
                        {singlePost.user.username}, {singlePost.user.gender}, {singlePost.user.dob && (
                          <span className="">
                            {(() => {
                              const dob = new Date(singlePost.user.dob);
                              const today = new Date();
                              let age = today.getFullYear() - dob.getFullYear();
                              const monthDiff = today.getMonth() - dob.getMonth();
                              const dayDiff = today.getDate() - dob.getDate();

                              // Adjust age if the birthday hasn't occurred yet this year
                              if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                                age--;
                              }
                              return age;
                            })()}
                          </span>
                        )},&nbsp;
                        {State.getStateByCodeAndCountry(singlePost.user.state, singlePost.user.country).name}, {Country.getCountryByCode(singlePost.user.country).name} <span className="text-lg">{Country.getCountryByCode(singlePost.user.country).flag}</span>
                      </span>
                      <span className="mx-1 text-xs text-gray-600">
                        {new Date(singlePost.created_at).toDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-bRed">{singlePost.room}</p>
                </div>
              </section>
              <hr className="border-gray-300" />
              <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-red-700">
                {singlePost.post}
              </p>

              <hr className="border-gray-300" />
              <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                <div className="flex flex-row items-center">
                  <div className="text-sm text-gray-500 flex flex-row items-center mr-2">
                    <span className="w-4 h-4 mr-3 font-extrabold">< HiOutlineHandThumbUp /></span>
                    {/* <span>15</span> */}
                  </div>
                  {/* <span className="mr-2">|</span> */}
                  <div className="text-sm font-medium text-gray-500 flex flex-row items-center mr-2">
                    <span className="w-4 h-4 mr-3 font-bold"><BsChatSquareDots /></span>
                    {/* <span>25</span> */}
                  </div>
                  {/* <span className="mr-2">|</span> */}
                  <div className="text-sm font-medium text-gray-500 flex flex-row items-center">
                    <span className="w-4 h-4 mr-3 font-extrabold"><FaShare /></span>
                    {/* <span>7</span> */}
                  </div>
                </div>
                
                
                <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                  <div className="flex flex-row items-center">
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                      <span>7 likes</span>
                    </div>
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
                      <span>25 comments</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default RoomPosts;
