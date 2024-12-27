import logo from '../../images/myconfessionz.png'
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthStoreCounselor } from '../../store/authStoreCounselor';

const CounselorResetPassword = () => {
    // Define validation schema based on role
    const schema = yup.object().shape({
        password: yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/\d/, "Password must contain a number"),
      
          password_confirmation: yup.string()
            .oneOf([yup.ref('password'), null], "Passwords must match")
            .required("Please confirm your password"),
    });
  
  const { counselor, resetPassword, isLoading, error } = useAuthStoreCounselor()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate()

    // Handle login form submission
    const onSubmit = async (data, event) => {
      event.preventDefault();
      try {
        console.log(data)
        await resetPassword(counselor.username, data.password, data.password_confirmation)
        toast.success("Password reset suceessful! Try Login!");

          setTimeout(() => window.location.href = '/', 500); // Adding a slight delay
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
        <p>Reset Password (Counselor)</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          
          <input type="password" id="counselor-reset-password" 
                className=" border-2 border-red-500 mt-4 flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500"
                placeholder="Enter new password"
                autoComplete='password'
                name="password"
                {...register("password")}
                /> 
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                <br />
          
          <input type="password" id="counselor-reset-password" 
                className=" border-2 border-red-500 mt-4 flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500"
                placeholder="Confirm new password"
                autoComplete='password_confirmation'
                name="password_confirmation"
                {...register("password_confirmation")}
              /> 
            {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}
            {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
              <br />
          <button type="submit" className="h-12 px-6 bg-bRed mt-4 rounded font-semibold text-sm text-red-100 hover:bg-red-700"
            disabled={isLoading}>
          {isLoading ? <Loader className='animate-spin mx-auto size={24}'/> : "Reset"}
          </button>
        </form>
    </div>
  )
}

export default CounselorResetPassword