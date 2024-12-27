import logo from '../../images/myconfessionz.png'
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthStoreCounselor } from '../../store/authStoreCounselor';

const CounselorForgotPasswordQuestion = () => {
        // Define validation schema based on question
        const schema = yup.object().shape({
            answer: yup.string().required("Answer is required"),
          });
        
        const { forgotPasswordQuestion, counselor, error, isLoading } = useAuthStoreCounselor()
      
        const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(schema),
        });
      
        const navigate = useNavigate()
      
          // Handle login form submission
          const onSubmit = async (data, event) => {
            event.preventDefault();
            try {
              console.log(data)
              await forgotPasswordQuestion(counselor.username, counselor.recovery_question, data.answer)
              toast.success("Response Correct");
                navigate('/counselor-reset-password');
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
    <p>Forgot Password (Counselor)</p>
    <p>Username - {counselor.username}</p>
    <form onSubmit={handleSubmit(onSubmit)} className='mx-8 lg:mx-96 md:mx-48'>
    <div className="flex items-center mb-3">
          <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 text-red-500 mt-4"
          {...register("recovery_question")}
          name='recovery_question'
          >
            <option value={counselor.recovery_question}>{counselor.recovery_question}</option>
          </select>
        </div>
        {errors.recovery_question && <p className="text-red-500">{errors.recovery_question.message}</p>}
        {/* Recovery Answer */}
        <div className="flex items-center mb-3">

          <input
            type="text"
            placeholder="Answer"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("answer")}
            name='answer'
          />
        </div>
        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}

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

export default CounselorForgotPasswordQuestion
