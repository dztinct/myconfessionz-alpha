import { useForm } from 'react-hook-form';
import { commentStore } from "../../store/commentStore";
import { postStore } from "../../store/postStore";
import { replyStore } from "../../store/replyStore";
import logo from '../../images/myconfessionz.png';
import { useState, useEffect } from "react";
import { Country, State }  from 'country-state-city';
import { HiOutlineHandThumbUp } from "react-icons/hi2";
import { HiHandThumbUp } from "react-icons/hi2";
import { BsChatSquareDots } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import axios from 'axios'
import { useParams } from "react-router-dom";
import { Loader } from 'lucide-react';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';

const SinglePost = () => {
    const schema = yup.object().shape({
        comment: yup.string().required("the comment field is empty").min(6, "comment must be at least 6 characters"),
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });

    const schemaReply = yup.object().shape({
      reply: yup.string().required("the reply field is empty").min(6, "reply must be at least 6 characters"),
    });
    
    const { register: registerReply, handleSubmit: handleSubmitReply, reset: resetReply, formState: { errors: errorsReply } } = useForm({
      resolver: yupResolver(schemaReply),
      defaultValues: {
        reply: "", // Set default value for reply field
      },
    });


  const onSubmitReply = async (data, postId, commentId) => {
    try {
      await createReply(data.reply, postId, commentId)
      console.log(data)
      toast.success("reply shared");
      resetReply();
    } catch (error) {
      console.error("Error creating reply:", error);
    }
};

    const { createComment, error, isLoading, comment, allComments } = commentStore()
    const { createReply, errorReply, isLoadingReply, reply, allReplies } = replyStore()

    // const onSubmit = async (id) => (data, event) => {
    const onSubmit = async (data, postId) => {
        try {
          await createComment(data.comment, postId)
          console.log(data)
          toast.success("comment shared");
          reset()
          await allComments();
          // window.location.href="/"
        } catch (error) {
          console.error("Error creating comment:", error);
        }
    };



  const [likes, setLikes] = useState({});
  const [likeCounts, setLikeCounts] = useState({}); // Tracks like counts for each post
  
  const [commentLikes, setCommentLikes] = useState({});
  const [commentLikeCounts, setCommentLikeCounts] = useState({}); // Tracks like counts for each comment

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


  const toggleCommentLike = (postId, commentId) => {
    // Toggle the like status for the comment
    setCommentLikes((prevCommentLikes) => {
      const postLikes = prevCommentLikes[postId] || {}; // Get the likes for the post or an empty object
      const isCommentCurrentlyLiked = postLikes[commentId] || false; // Default to false if not set
  
      return {
        ...prevCommentLikes,
        [postId]: {
          ...postLikes,
          [commentId]: !isCommentCurrentlyLiked,
        },
      };
    });
  
    // Update the like counts for the comment
    setCommentLikeCounts((prevCounts) => {
      const currentCount = prevCounts[commentId] || 0;
      const isCommentCurrentlyLiked = commentLikes[postId]?.[commentId] || false;
    
      return {
        ...prevCounts,
        [commentId]: isCommentCurrentlyLiked ? currentCount - 1 : currentCount + 1,
      };
    });
    
  
    // Call the API to update the backend
    axios
      .post(`http://localhost:8000/api/user-like-comment/${postId}/${commentId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error liking comment:", error);
      });
  };
  
  
  
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
      // Fetch like status for comments
      axios
        .get("http://localhost:8000/api/user-like-comment-status")
        .then((response) => {
          const likeStatus = (response.data || []).reduce((acc, comment) => {
            if (!acc[comment.postId]) {
              acc[comment.postId] = {}; // Initialize if not already present
            }
            acc[comment.postId][comment.commentId] = comment.isLiked; // Store like status for each comment
            return acc;
          }, {});
          setCommentLikes(likeStatus);
        })
        .catch((error) => {
          console.error("Error fetching comment like status:", error);
        });
    
      // Fetch like counts for comments
      axios
      .get("http://localhost:8000/api/user-comment-like-count")
      .then((response) => {
        console.log("Comment like counts here:", response.data.comments);
        const counts = response.data.comments.reduce((acc, comment) => {
          acc[comment.id] = comment.comment_likes_count; // Assuming 'likes_count' is returned in the API response
          return acc;
        }, {});
        setCommentLikeCounts(counts); // Update your state with like counts
        console.log("state ",commentLikeCounts, )
      })
      .catch((error) => {
        console.error("Error fetching comment like counts:", error);
      });
    }, []);
    
    
  
    const { post, singlePost } = postStore();
    const { id } = useParams();

    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleTwo, setModalVisibleTwo] = useState(false);

    const toggleModal = () => {
      setModalVisible((prev) => !prev);
    };

    const toggleModalTwo = () => {
      setModalVisibleTwo((prev) => !prev);
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await singlePost(id);
          console.log(id);
          await allComments();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [singlePost, allComments, id]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await allReplies();
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, [allReplies]);
  
    
  // If no posts are available
  if (!post || post.length === 0) {
    return (
      <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg text-gray-600">No posts available</p>
      </div>
    );
  }

    
  // const { comment, allComments } = commentStore();

  // useEffect(() => {
  //   const fetchComments = async () => {
  //     await allComments();
  //   };
  //   fetchComments();
  // }, [allComments]);


  // // If no posts are available
  // if (!comment || comment.length === 0) {
  //   return (
  //     <div className="w-screen bg-gray-100 flex justify-center items-center">
  //       <p className="text-lg text-gray-600">No comments available</p>
  //     </div>
  //   );
  // }



  return (
    <div className="my-28">
        <section className="flex flex-row flex-wrap mx-auto">
          {/* Card Component */}
          <div className="transition-all duration-150 flex px-2 md:px-8  py-1 md:w-[88%] sm:w-[80%] mx-auto">
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
                        {post.user.username}, {post.user.gender}, {post.user.dob && (
                          <span className="">
                            {(() => {
                              const dob = new Date(post.user.dob);
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
                        {State.getStateByCodeAndCountry(post.user.state, post.user.country).name}, {Country.getCountryByCode(post.user.country).name} <span className="text-lg">{Country.getCountryByCode(post.user.country).flag}</span>
                      </span>
                      <span className="text-xs text-gray-600">
                        {new Date(post.created_at).toDateString()} at{' '}
                        {new Date(post.created_at).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        })}
              </span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-bRed">{post.room}</p>
                </div>
              </section>
              <hr className="border-gray-300" />
              <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-red-700">
                {post.post}
              </p>

              <hr className="border-gray-300" />
              <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                <div className="flex flex-row items-center">
                  <div className="text-sm text-gray-500 flex flex-row items-center mr-2">
                    <span className="w-4 h-4 cursor-pointer">
                    <button>
                    {likes[post.id]
                      ? <div className="md:flex text-bRed"><HiHandThumbUp onClick={() => toggleLike(post.id)} className="text-lg md:mr-1" /><span className="hidden md:block">Like</span></div>
                      : <div className="md:flex"><HiOutlineHandThumbUp onClick={() => toggleLike(post.id)} className="text-lg md:mr-1" /><span className="hidden md:block">Like</span></div>}

                    </button>
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-500 flex flex-row items-center mr-2 ml-3 md:ml-10">
                    <span className="w-4 h-4 cursor-pointer"><BsChatSquareDots className="text-lg"/></span><span className="ml-2 hidden md:block">Comment</span>
                  </span>
                  <div className="text-sm font-medium text-gray-500 flex flex-row items-center ml-3 md:ml-2">
                    <span className="w-4 h-4 font-extrabold cursor-pointer"><TbShare3 className="text-lg"/></span><span className="ml-1 hidden md:block">Share</span>
                  </div>
                </div>
                                
                <div className="flex items-center justify-between px-4 py-2 overflow-hidden">
                  <div className="flex flex-row items-center">
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                      <span>
                        {likeCounts[post.id] === 1
                          ? "1 like"
                          : `${likeCounts[post.id] || 0} likes`}
                      </span>
                  </div>  
                    <div className="text-xs font-medium text-gray-500 flex flex-row items-center">
                      <span>0 comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-300" />
              {/* comments starts */}
            <div className="py-2 px-4 w-full bg- text-bRed">
                <form onSubmit={handleSubmit((data) => onSubmit(data, post.id))}>
                    <div className="">
                        <div className="p-1 bg-white text-bRed">
                            <textarea name="" id="" rows="3" className="w-full outline-none border-2 border-solid border-bRed text-sm rounded p-1" {...register("comment")} placeholder='say something...'></textarea>
                        {errors.comment && <p className="text-red-700 mb-2">{errors.comment.message}</p>}
                        {error && <p className="text-red-700 mb-2">{error}</p>}
                        </div>
                    </div>
                        <button type="submit" className="w-full p-2 bg-bRed rounded">
                            {/* <IoSend className="text-white w-full text-center"/> */}
                            {isLoading ? <Loader className='animate-spin mx-auto' size={24}/> : <IoSend className="text-white w-full text-center"/>}
                            </button>
                </form>

              <hr className="border-gray-300 mt-2"/>
                <div className="my-2">comments</div>

                                                  
                {Array.isArray(comment) ?
  comment
    .filter((singleComment) => post.id === Number(singleComment.post_id))
    .map((singleComment) => (
      <div key={singleComment.id}>
        <div className="p-2 my-2 bg-red-50 text-bRed rounded">
          <div className="flex items-center flex-1">
          <img
                      className="object-cover h-10 w-11 md:h-10 md:w-10 rounded-full bg-black mr-2"
                      src={logo}
                      alt="Brand-logo"
                    />
      <div>
      <div className="font-semibold text-gray-700 text-xs capitalize -mb-2 ">
            <div>
            
              {singleComment.user.username}, {singleComment.user.gender},{' '}
              {singleComment.user.dob && (
                <span>
                  {(() => {
                    const dob = new Date(singleComment.user.dob);
                    const today = new Date();
                    let age = today.getFullYear() - dob.getFullYear();
                    const monthDiff = today.getMonth() - dob.getMonth();
                    const dayDiff = today.getDate() - dob.getDate();

                    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                      age--;
                    }
                    return age;
                  })()}
                </span>
              )}
              ,&nbsp;
              {State.getStateByCodeAndCountry(singleComment.user.state, singleComment.user.country).name},{' '}
              {Country.getCountryByCode(singleComment.user.country).name}
              <span className="text-lg">
                {Country.getCountryByCode(singleComment.user.country).flag}
              </span>
            </div>
          </div>
            <div className="mb-2">
              <span className="text-xs text-gray-600 font-light">
                {new Date(singleComment.created_at).toDateString()} at{' '}
                {new Date(singleComment.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>
      </div>
            </div>
          <div className="text-xs mt-4">{singleComment.comment}</div>
          <div className="text-xs mt-2">
            <span className="mr-4">
            <div className="text-sm text-gray-500 flex flex-row items-center mr-2">
                <span className="w-4 h-4 cursor-pointer -mr-4">
                  {/* <button> */}
                  {/* {commentLikes[post.id]?.[singleComment.id] 
                      ? (
                        <span className="md:flex text-bRed">
                          <HiHandThumbUp onClick={() => toggleCommentLike(post.id, singleComment.id)} className="text-lg md:mr-1" />
                          <span className="hidden md:block">Like</span>
                        </span>
                      ) : (
                        <span className="md:flex">
                          <HiOutlineHandThumbUp onClick={() => toggleCommentLike(post.id, singleComment.id)} className="text-lg md:mr-1" />
                          <span className="hidden md:block">Like</span>
                        </span>
                      )
                    }  */}
                
                  {/* </button>  */}
                </span>
                
                  {commentLikes[post.id]?.[singleComment.id] ? (
                    <HiHandThumbUp onClick={() => toggleCommentLike(post.id, singleComment.id) } className="text-lg md:mr-1"/>
                  ) : (
                    <HiOutlineHandThumbUp onClick={() => toggleCommentLike(post.id, singleComment.id) } className="text-lg md:mr-1"/>
                  )}
                  {/* <span className='mr-4 ml-1'>{commentLikeCounts[post.id]?.[singleComment.id] || 0}</span> */}
                  <span className='mr-4 ml-1'>{commentLikeCounts[singleComment.id] || 0}</span>
               <span className='text-xs mr-4'>
                <button onClick={toggleModal}>Reply</button>
               </span>
               <span className='text-xs'>
                <button onClick={toggleModalTwo}>view replies</button>
               </span>

               {/* REPLY SIMULATOR */}
    <div className="max-w-2xl mx-auto mt-8">
      {/* Modal toggle button */}
      {/* Main modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto mt-36"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md px-4 h-full md:h-auto">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={toggleModal}
      >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={handleSubmitReply((data)=>onSubmitReply(data, post.id, singleComment.id))}>
                <div className="font-medium text-gray-900 dark:text-white">
                  Reply user
                </div>

                <div className="p-1 bg-white text-bRed">
                            <textarea name="" id="" rows="3" className="w-full outline-none border-2 border-solid border-bRed text-sm rounded p-1" {...registerReply("reply")} placeholder='your reply...'></textarea>
                        {errorsReply.reply && <p className="text-red-700 mb-2">{errorsReply.reply.message}</p>}
                        {errorReply && <p className="text-red-700 mb-2">{errorReply}</p>}
                        </div>
                <button type="submit" className="w-full p-2 bg-bRed rounded">
                            {isLoadingReply ? <Loader className='animate-spin mx-auto' size={24}/> : <IoSend className="text-white w-full text-center"/>}
                            </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="max-w-2xl mx-auto mt-8">
      {/* Modal toggle button */}
      {/* Main modal */}
      {isModalVisibleTwo && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto mt-36"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md px-4 h-full">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={toggleModalTwo}
      >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* VIEW REPLIES */}
              <p className='mx-4 font-semibold'>All replies</p>
              {Array.isArray(reply) ?
  reply
    .filter((singleReply) => singleComment.id === Number(singleReply.comment_id) && post.id === Number(singleReply.post_id))
    .map((singleReply) => (
                  <section className="flex flex-row flex-wrap mx-auto" key={singleReply.id}>
                    {/* Card Component */}
                    <div className="transition-all duration-150 flex w-full px-8 py-1 md:w-[80%] sm:w-[80%] mx-auto">
                      <div className="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
                        <section className="px-4 py-2 mt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1">
                              <img
                                className="object-cover h-10 w-14 md:h-8 md:w-14 rounded-full bg-black"
                                src={logo}
                                alt="Brand-logo"
                              />
                              <div className="flex flex-col mx-2">
                                <span className="font-semibold text-gray-700 hover:underline text-sm capitalize">
                                  {singleReply.user.username}, {singleReply.user.gender}, {singleReply.user.dob && (
                                    <span className="">
                                      {(() => {
                                        const dob = new Date(singleReply.user.dob);
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
                                  {State.getStateByCodeAndCountry(singleReply.user.state, singleReply.user.country).name}, {Country.getCountryByCode(singleReply.user.country).name} <span className="text-lg">{Country.getCountryByCode(singleReply.user.country).flag}</span>
                                </span>
                                <span className="text-xs text-gray-600">
                                  {new Date(singleReply.created_at).toDateString()} at{' '}
                                  {new Date(singleReply.created_at).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true,
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </section>
                        <hr className="border-gray-300" />
                        <p className="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-red-700">
                          {singleReply.reply}
                        </p>
          
                        <hr className="border-gray-300" />
                      </div>
                    </div>
                  </section>
                ))
          : 
          <p className="text-lg text-gray-600">No replies available</p>
          }
            </div>
          </div>
        </div>
      )}
    </div>
            </div>
            </span>
          </div>
        </div>
      </div>
    )): 

      // <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg text-gray-600">No comments available</p>
      // </div>
    }
            </div>
            {/* comments ends */}
                </div>
            </div>
            </section>




            
        </div>
  );
};

export default SinglePost;