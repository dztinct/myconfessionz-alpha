import { postStore } from "../../store/postStore";
import logo from '../../images/myconfessionz.png';
import { useState, useEffect } from "react";
import { Country, State }  from 'country-state-city';
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiHandThumbUp } from "react-icons/hi2";
import { BsChatSquareDots } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import axios from 'axios'

const HomePosts = () => {
  const [likes, setLikes] = useState({});
  const [likeCounts, setLikeCounts] = useState({}); // Tracks like counts for each post
  
  const toggleLike = (postId) => {
    setLikes((prevLikes) => {
      const isCurrentlyLiked = prevLikes[postId];
      return {
        ...prevLikes,
        [postId]: !isCurrentlyLiked,
      };
    });

    setLikeCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: likes[postId] ? prevCounts[postId] - 1 : prevCounts[postId] + 1,
    }));

  

    // Call the API to update the backend
    axios
      .post(`http://localhost:8000/api/user-like-post/${postId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error liking post:", error);
      });
  };


  const { post, allPostsHome } = postStore();
  
    useEffect(() => {
      axios
        .get("http://localhost:8000/api/user-like-post-status")
        .then((response) => {
          const likeStatus = (response.data || []).reduce((acc, post) => {
            acc[post.id] = post.isLiked; // Store like status for each post
            return acc;
          }, {});
          setLikes(likeStatus);
        })
        .catch((error) => {
          console.error("Error fetching like status:", error);
        });

        axios
        .get("http://localhost:8000/api/posts-like-count")
        .then((response) => {
          console.log("like count", response.data)
          const counts = response.data.data.reduce((acc, post) => {
            acc[post.id] = post.likeCount; // Store like count for each post
            return acc;
          }, {});
          setLikeCounts(counts);
        })
        .catch((error) => {
          console.error("Error fetching like counts:", error);
        });
    }, []);
    
  
  useEffect(() => {
    const fetchPosts = async () => {
      await allPostsHome();
    };
    fetchPosts();
  }, [allPostsHome]);


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
        <section className="flex flex-row flex-wrap mx-auto" key={singlePost.id}>
          {/* Card Component */}
          <div className="transition-all duration-150 flex w-full px-8 py-1 md:w-[80%] sm:w-[80%] mx-auto">
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
                      <span className="text-xs text-gray-600">
                        {new Date(singlePost.created_at).toDateString()} at{' '}
                        {new Date(singlePost.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
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
                    <span className="w-4 h-4 cursor-pointer">
                    <button>
                    {likes[singlePost.id]
                      ? <div className="md:flex text-bRed"><HiHandThumbUp onClick={() => toggleLike(singlePost.id)} className="text-lg md:mr-1" /><span className="hidden md:block">Like</span></div>
                      : <div className="md:flex"><HiOutlineHandThumbUp onClick={() => toggleLike(singlePost.id)} className="text-lg md:mr-1" /><span className="hidden md:block">Like</span></div>}

                    </button>
                    </span>
                  </div>
                  <a href={`/single-post/${singlePost.id}`} className="text-sm font-medium text-gray-500 flex flex-row items-center mr-2 ml-3 md:ml-10">
                    <span className="w-4 h-4 cursor-pointer"><BsChatSquareDots className="text-lg"/></span><span className="ml-2 hidden md:block">Comment</span>
                  </a>
                  <div className="text-sm font-medium text-gray-500 flex flex-row items-center ml-3 md:ml-2">
                    <span className="w-4 h-4 font-extrabold cursor-pointer"><TbShare3 className="text-lg"/></span><span className="ml-1 hidden md:block">Share</span>
                  </div>
                </div>
                                
                <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                  <div className="flex flex-row items-center">
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                      <span>
                        {likeCounts[singlePost.id] === 1
                          ? "1 like"
                          : `${likeCounts[singlePost.id] || 0} likes`}
                      </span>
                  </div>  
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
                      <span>0 comments</span>
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

export default HomePosts;






























// import { postStore } from "../../store/postStore";
// import logo from '../../images/myconfessionz.png';
// import { useState, useEffect } from "react";
// import { Country, State }  from 'country-state-city';
// import { HiOutlineHandThumbUp } from "react-icons/hi2";
// import { HiHandThumbUp } from "react-icons/hi2";
// import { BsChatSquareDots } from "react-icons/bs";
// import { TbShare3 } from "react-icons/tb";
// import axios from 'axios'

// const HomePosts = () => {
//   const [likes, setLikes] = useState({});
//   const [likeCounts, setLikeCounts] = useState({}); // Tracks like counts for each post
  
//   const toggleLike = (postId) => {
//     setLikes((prevLikes) => ({
//       ...prevLikes,
//       [postId]: !prevLikes[postId], // Toggle the like status for this post
//     }));

//     setLikeCounts((prevCounts) => ({
//       ...prevCounts,
//       [postId]: isLiked ? prevCounts[postId] - 1 : prevCounts[postId] + 1, // Increment or decrement like count
//     }));

//     // Call the API to update the backend
//     axios
//       .post(`http://localhost:8000/api/user-like-post/${postId}`)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.error("Error liking post:", error);
//       });
//   };

//   useEffect(() => {})

//   const { post, allPostsHome } = postStore();
  
//     useEffect(() => {
//       axios
//         .get("http://localhost:8000/api/user-like-post-status")
//         .then((response) => {
//           const likeStatus = response.data.reduce((acc, post) => {
//             acc[post.id] = post.isLiked; // Store like status for each post
//             return acc;
//           }, {});
//           setLikes(likeStatus);
//         })
//         .catch((error) => {
//           console.error("Error fetching like status:", error);
//         });

//         axios
//         .get("http://localhost:8000/api/posts-like-count")
//         .then((response) => {
//           const counts = response.data.reduce((acc, post) => {
//             acc[post.id] = post.likeCount; // Store like count for each post
//             return acc;
//           }, {});
//           setLikeCounts(counts);
//         })
//         .catch((error) => {
//           console.error("Error fetching like counts:", error);
//         });
//     }, []);
    
  
//   useEffect(() => {
//     const fetchPosts = async () => {
//       await allPostsHome();
//     };
//     fetchPosts();
//   }, [allPostsHome]);


//   // If no posts are available
//   if (!post || post.length === 0) {
//     return (
//       <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
//         <p className="text-lg text-gray-600">No posts available</p>
//       </div>
//     );
//   }



//   return (
//     <div className="my-28">
//       {post.map((singlePost, idx) => (
//         <section className="flex flex-row flex-wrap mx-auto" key={idx}>
//           {/* Card Component */}
//           <div className="transition-all duration-150 flex w-full px-4 py-1 md:w-[80%] sm:w-[80%] mx-auto">
//             <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
//               <section className="px-4 py-2 mt-2">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center flex-1">
//                     <img
//                       className="object-cover h-10 w-14 md:h-10 md:w-10 rounded-full bg-black"
//                       src={logo}
//                       alt="Brand-logo"
//                     />
//                     <div className="flex flex-col mx-2">
//                       <span className="font-semibold text-gray-700 hover:underline text-sm capitalize">
//                         {singlePost.user.username}, {singlePost.user.gender}, {singlePost.user.dob && (
//                           <span className="">
//                             {(() => {
//                               const dob = new Date(singlePost.user.dob);
//                               const today = new Date();
//                               let age = today.getFullYear() - dob.getFullYear();
//                               const monthDiff = today.getMonth() - dob.getMonth();
//                               const dayDiff = today.getDate() - dob.getDate();

//                               // Adjust age if the birthday hasn't occurred yet this year
//                               if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//                                 age--;
//                               }
//                               return age;
//                             })()}
//                           </span>
//                         )},&nbsp;
//                         {State.getStateByCodeAndCountry(singlePost.user.state, singlePost.user.country).name}, {Country.getCountryByCode(singlePost.user.country).name} <span className="text-lg">{Country.getCountryByCode(singlePost.user.country).flag}</span>
//                       </span>
//                       <span className="mx-1 text-xs text-gray-600">
//                         {new Date(singlePost.created_at).toDateString()}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-1 text-xs text-bRed">{singlePost.room}</p>
//                 </div>
//               </section>
//               <hr className="border-gray-300" />
//               <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-red-700">
//                 {singlePost.post}
//               </p>

//               <hr className="border-gray-300" />
//               <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
//                 <div className="flex flex-row items-center">
//                   <div className="text-sm text-gray-500 flex flex-row items-center mr-2">
//                     <span className="w-4 h-4 cursor-pointer">
//                     <button>
//                     {likes[singlePost.id]
//                       ? <div className="md:flex text-bRed"><HiHandThumbUp onClick={() => toggleLike(singlePost.id)} className="text-lg md:mr-1" /><span className="hidden md:block">Like</span></div>
//                       : <div className="md:flex"><HiOutlineHandThumbUp onClick={() => toggleLike(singlePost.id)} className="text-lg md:mr-1" /><span className="hidden md:block">Like</span></div>}

//                     </button>
//                     </span>
//                   </div>
//                   <div className="text-sm font-medium text-gray-500 flex flex-row items-center mr-2 ml-3 md:ml-10">
//                     <span className="w-4 h-4 cursor-pointer"><BsChatSquareDots className="text-lg"/></span><span className="ml-2 hidden md:block">Comment</span>
//                   </div>
//                   <div className="text-sm font-medium text-gray-500 flex flex-row items-center ml-3 md:ml-2">
//                     <span className="w-4 h-4 font-extrabold cursor-pointer"><TbShare3 className="text-lg"/></span><span className="ml-1 hidden md:block">Share</span>
//                   </div>
//                 </div>
                                
//                 <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
//                   <div className="flex flex-row items-center">
//                   <span>{likeCounts[singlePost.id] || 0} likes</span>
//                       {/* {userLikePost.map((userLikePostt, idx) => { */}
//                         {/* return(  */}
//                           {/* <div key={idx} className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2"> */}
//                           {/* {likes.count} likes */}
//                           {/* {likes[singlePost.id] ? <span>1 Like</span> : */}
//                           {/* likes[singlePost.id] === false ?  <span>{singlePost.user_likes_count} Likes</span>} */}
//                           {/* likes[singlePost.id] */}

//                             {/* {singlePost.id === userLikePostt ? (<span>{userLikePostCount} Likes</span>) : "Bye"} */}
                            
//                             {/* {userLikePostt.post_id} Likes */}
                          
//                           {/* <span>{singlePost.id == userLikePostt.post_id && userLikePostCount == 1 ? "1 Like" : singlePost.id == userLikePostt.post_id && userLikePostCount > 1 ? userLikePostCount + "Likes" : "0 Likes" }</span> */}
//                         {/* </div> */}
//                           {/* )  */}
//                         {/* })} */}

//                       {/* <span>{userLikePostCount == 1 ? '1 Like' :  userLikePostCount + ' Likes'}</span> */}
//                     <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
//                       <span>0 comments</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default HomePosts;

// This is another post for the room section, I do not want clients that are ignorant to use their ignorance to stress me because i do not want stress at all, so due to this, when i know something that i've don and tested is working but they complaining due to their own ignorance and mistakes, i just tell them subtly that it is working.

// {userLikePost.map((userLikePostt, idx) => {
//   return (
//     <div key={idx} className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
//       {/* Check if the post ID matches */}
//       {singlePost.id === userLikePostt.post_id ? (
//         // Display likes count dynamically
//         userLikePostt.likes_count === 1 ? (
//           <span>{userLikePostCount} Like</span>
//         ) : (
//           <span>{userLikePostCount} Likes</span>
//         )
//       ) : (
//         <span>0 Likes</span>
//       )}
//     </div>
//   );
// })}