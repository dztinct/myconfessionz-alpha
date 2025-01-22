import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { postStore } from '../../store/postStore';
import { Loader } from 'lucide-react';

const CreatePostTemp = () => {
  const schema = yup.object().shape({
    room: yup.string().required("Room is required"),
    post: yup.string().required("Confession field is required").min(6, "Confession must be at least 6 characters"),
});

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

  const { createPost, error, isLoading } = postStore()

  const onSubmit = async (data, event) => {
    event.preventDefault
    try {
      await createPost(data.room, data.post)

      console.log(data)
      toast.success("Confession shared successfully");
      // setTimeout(() => window.location.href = '/home', 200); // Adding a slight delay
      setTimeout(() => navigate('/home'), 200); // Adding a slight delay
    } catch (error) {
      console.error("Error Sharing confession:", error);
    }
  };

  return (
    <div>
        <div class="heading text-center font-bold text-2xl m-5 mt-24 text-gray-800">New Post</div>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-24'>
                <div class=" bg-bRed editor mx-auto w-80 md:w-96 lg:w-[30rem] flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg">
                    <div className="flex items-center mb-3">
                        <select className="flex-grow h-12 px-4 bg-white rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        {...register("room")}
                        name='room'
                        >
                    <option selected value="">Select Room To share In</option>
                    <option value="Love">Love</option>
                    <option value="Heartbreak">Heartbreak</option>
                    <option value="Marriage">Marriage</option>
                    <option value="Domestic Violence">Domestic Violence</option>
                    <option value="Abused">Abused</option>
                    <option value="Harassed">Harassed</option>
                    <option value="Hoe Story">Hoe Story</option>
                    <option value="Assault">Assault</option>
                    <option value="Cheating">Cheating</option>
                    <option value="Entertaining">Entertaining</option>
                    <option value="Funny">Funny</option>
                    <option value="Shocking">Shocking!</option>
                    <option value="Murder">Murder</option>
                    <option value="Sinful">Sinful</option>
                    <option value="Daily Gist">Daily Gist</option>
                    <option value="Personal Problem">Personal Problem</option>
                    <option value="Health issues">Health issues</option>
                    <option value="Politics">Politics</option>
                    <option value="Supernatural events">Supernatural events</option>
                    <option value="Ghost stories">Ghost stories</option>
                    <option value="Others">Others</option>
                        </select>
                    </div>
                    {errors.room && <p className="text-white mb-2">{errors.room.message}</p>}
                    <textarea class="description bg-white sec p-3 h-60 border border-gray-300 outline-none mb-4" spellcheck="false" placeholder="Share your confession..." {...register("post")}></textarea>
                    {errors.post && <p className="text-white mb-2">{errors.post.message}</p>}
                    {error && <p className="text-white mb-2">{error}</p>}

                    <div class="buttons flex">
                        <button type="submit" class="btn border border-white p-1 px-4 font-semibold cursor-pointer text-gray-600 text-sm bg-white hover:bg-bRed hover:text-white ml-auto rounded">
                        {isLoading ? <Loader className='animate-spin mx-auto' size={24}/> : "Share confession"}
                          </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePostTemp
