import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaLock } from 'react-icons/fa';
import logo from '../../images/myconfessionz.png'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore';
import { Loader } from 'lucide-react';
import { FaTheaterMasks } from 'react-icons/fa'
import toast from 'react-hot-toast';

const AnonymousLogin = () => {
  // Define validation schema based on role
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("password is required")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

    // log user in and redirect to homepage
    const navigate = useNavigate()

    const { login, isLoading, error } = useAuthStore()

  // Handle login form submission
  const onSubmit = async (data, event) => {
    event.preventDefault();
    try {
        await login(data.username, data.password)
        toast.success("Login Successful");
        setTimeout(() => window.location.href = '/home', 500); // Adding a slight delay
        // setTimeout(() => navigate('/home'), 500); // Adding a slight delay
    } catch (error) {
        console.error("Login error:", error);
        console.log(error || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center w-screen pt-16 pb-24 bg-black text-bRed">
        <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mt-12 animate-slide-in-left">
            <img src={logo} alt="logo" className="w-full h-full" />
        </div>

        <div className='mt-3'>
            <span className='text-white'>Log in to</span> Myconfessionz
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white rounded shadow-lg px-8 pt-4 pb-8 mt-8 animate-slide-in-right">
        <label htmlFor="role" className="font-semibold text-xs my-3">Anonymous Login</label>



            <div className="flex items-center mb-3">
              <FaTheaterMasks className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Anonymous Username"
                {...register("username")}
                name='username'
                autoComplete='username'
                className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}


        <div className="flex items-center mb-3">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="password"
            {...register("password")}
            // name='password'
            name='password'
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

        <button type="submit" className="h-12 px-6 bg-bRed mt-4 rounded font-semibold text-sm text-red-100 hover:bg-red-700"
          disabled={isLoading}>
        {isLoading ? <Loader className='animate-spin mx-auto size={24}'/> : "Log in"}
        </button>

        <div className="flex mt-4 justify-center text-xs">
                <Link to="/anonymous-forgot-password" className="text-bRed hover:text-red-700">Forgot password</Link>
                <span className="mx-2 text-gray-300">/</span>
                <Link to="/choose-register-role" className="text-bRed hover:text-red-700">Register</Link>
            </div>

      </form>
    </div>
  );
};

export default AnonymousLogin;
