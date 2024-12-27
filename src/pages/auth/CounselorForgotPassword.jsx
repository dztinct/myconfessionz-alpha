import logo from '../../images/myconfessionz.png'
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthStoreCounselor } from '../../store/authStoreCounselor';

const CounselorForgotPassword = () => {
    // Define validation schema based on role
    const schema = yup.object().shape({
      username: yup.string().required("Username is required"),
    });
  
  const { forgotPassword, isLoading, error } = useAuthStoreCounselor()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

    // Handle login form submission
    const onSubmit = async (data, event) => {
      event.preventDefault();
      try {
        console.log(data.username)
        await forgotPassword(data.username)
        toast.success("Counselor found");
          setTimeout(() => window.location.href = '/counselor-forgot-password-question', 200); // Adding a slight delay
          // window.location.href = '/home';
      } catch (error) {
          console.error("Login error:", error);
          console.log(error || "Failed to login. Please try again.");
      }
    };

  return (
    <div className='text-center h-screen py-24 bg-black text-white mx-auto'>
        <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mt-12 animate-slide-in-left mx-auto mb-12">
            <img src={logo} alt="logo" className="w-full h-full "/>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <input type="text" id="counselor-forgot-password" 
                className=" border-2 border-red-500 mt-4 flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500"
                placeholder="Counselor Username"
                autoComplete='username'
                name="username"
                {...register("username")}
              /> 
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              <br /><br />
          <button type="submit" className="h-12 px-6 bg-bRed mt-4 rounded font-semibold text-sm text-red-100 hover:bg-red-700"
            disabled={isLoading}>
          {isLoading ? <Loader className='animate-spin mx-auto size={24}'/> : "Proceed"}
          </button>
        </form>
    </div>
  )
}

export default CounselorForgotPassword
