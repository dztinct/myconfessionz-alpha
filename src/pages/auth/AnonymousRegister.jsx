import { useState, useEffect } from 'react';
import logo from '../../images/myconfessionz.png';
import { FaLock, FaCalendarAlt, FaVenusMars, FaFlag, FaKey, FaTheaterMasks } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Country, State } from 'country-state-city'
import { parse, isValid, format } from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { Loader } from 'lucide-react';
import { useAuthStore } from '../../store/authStore'
import toast from 'react-hot-toast';

const AnonymousRegister = () => {
  const [countries, setCountries] = useState(Country.getAllCountries())
  const [states, setStates] = useState([])

  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleCountryChange = (country) => {
      setSelectedCountry(country)
      setStates(State.getStatesOfCountry(country.isoCode))
  }

  const schema = yup.object().shape({
    username: yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
    dob: yup
    .string()
    .required("Date of birth is required")
    .test("valid-date", "Invalid date format", (value) =>
        isValid(parse(value, "yyyy-MM-dd", new Date()))
    ),
    gender: yup.string().required("Gender is required"),
    password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/\d/, "Password must contain a number"),
  
      password_confirmation: yup.string()
        .oneOf([yup.ref('password'), null], "Passwords must match")
        .required("Please confirm your password"),
    // password: yup.string().required("Password is required").min(8, "Password must be at least 6 characters"),
    // password_confirmation: yup.string()
    //   .oneOf([yup.ref('password'), null], "Passwords must match")
    //   .required("Please confirm your password"),
    country: yup.string().required("Country is required"),
    state: yup.string().when('country', {
      is: (value) => value && value.length > 0,
      then: (schema) => schema.required("State is required"),
      otherwise: (schema) => schema,
    }),
    recovery_question: yup.string().required("Recovery question is required"),
    answer: yup.string().required("Answer to recovery question is required"),
  });
  
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // log user in and redirect to homepage

  const navigate = useNavigate()

  const { signup, error, isLoading } = useAuthStore()
  // Handle registration form submission
  const onSubmit = async (data, event) => {
    event.preventDefault
    try {
      await signup(data.username, data.password, data.password_confirmation, data.state, data.country, data.recovery_question, data.answer, data.gender, data.dob)

    console.log(data)
    toast.success("Registration Successful");
    await allPosts()
    // setTimeout(() => navigate('/home'), 200); // Adding a slight delay
    setTimeout(() => window.location.href = '/home', 200); // Adding a slight delay
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen bg-black text-bRed pt-16  pb-24 px-2">
        <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mt-12 animate-slide-in-left">
            <img src={logo} alt="logo" className="w-full h-full" />
        </div>

        <div className='mt-5'>
            <span className='text-white'>Create a new <span className='text-bRed'>account</span></span>
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white rounded shadow-lg p-12 mt-12 animate-slide-in-right w-full max-w-lg">
        {/* User Instructions */}

        <p className="text-center text-xs text-red-600 mb-4">
            We urge users to input Real and Genuine Date of Birth, Gender, Country and State of Origin in this form. This will  help us in the information we give to you and other important things and as well as other users to relate well with the stories you share on this platform. Do not forget that these informations CANNOT be traced to you.
            <br /><br />    
            We will never in anyway at any time request for other personal informations such as email addresses, residential addresses, phone numbers or any of the social media platforms such as facebook usernames or links or anything related to that.
            <br /><br />
            Please note that you should be completely anonymous here unless you choose to show your identity yourself which we strongly discourage.
        </p>

        {/* Role */}
        <label htmlFor="role" className='font-semibold text-xs my-3'>Anonymous Registration</label>
        


        {/* Username */}
        <div className="flex items-center mb-3">
          <FaTheaterMasks className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Anonymous Username"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("username")}
            // name='username'
          />
        </div>
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        

        {/* Gender */}
        <div className="flex items-center mb-3">
          <FaVenusMars className="text-gray-500 mr-2" />
          <select
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("gender")}
            name='gender'
          >
            <option value="">Select Your Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

        {/* Date of Birth */}
        <div className="flex items-center mb-3">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <input
            type="date" placeholder="dd-mm-yyyy"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("dob")}
            name='dob'
          />
        </div>
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

        {/* Country */}
        <div className="flex items-center mb-3">
          <FaFlag className="text-gray-500 mr-2" />
          <select
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("country")}
            name='country'
            onChange={(e) => handleCountryChange(
              countries.find((c)=>c.isoCode === e.target.value)
          )}
      >
          <option value="">Select Country</option>
          {countries.map((country) =>(
                  <option key={country.isoCode} value={country.isoCode}>
                      {country.name}
                  </option>
              ))}
      </select>
        </div>
        {errors.country && <p className="text-red-500">{errors.country.message}</p>}

        {/* State */}
        <div className="flex items-center mb-3">
          <FaFlag className="text-gray-500 mr-2" />
          <select
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={!selectedCountry}
            {...register("state")}
            name='state'
            >
                <option value="">Select State</option>
                {states.map((state) => (
                    <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                    </option>
                ))}
            </select>
        </div>
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

        {/* Password */}
        <div className="flex items-center mb-3">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("password")}
            name='password'
          />
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {/* Confirm Password */}
        <div className="flex items-center mb-3">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Confirm Password"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("password_confirmation")}
            name='password_confirmation'
          />
        </div>
        {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}

        {/* Recovery Question */}
        <div className="flex items-center mb-3">
          <FaKey className="text-gray-500 mr-2" />
          <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("recovery_question")}
          name='recovery_question'
          >
            <option value="">Password Recovery Question</option>
            <option value="Childhood favourite movie">Childhood favourite movie</option>
            <option value="Dream holiday city">Dream holiday city</option>
            <option value="Dream car model">Dream car model</option>
            {/* <option value="primary school favorite teacher">primary school favourite teacher</option> */}
            {/* <option value="Name of your secondary school best friend">Name of your secondary school best friend</option> */}
            {/* <option value="Your childhood favourite musician name">Your childhood favourite musician name</option> */}
            {/* <option value="Your childhood favourite song title">Your childhood favourite song title</option> */}
            {/* Add more questions as needed */}
          </select>
        </div>
        {errors.recovery_question && <p className="text-red-500">{errors.recovery_question.message}</p>}
        {/* Recovery Answer */}
        <div className="flex items-center mb-3">
          <FaKey className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Answer"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("answer")}
            name='answer'
          />
        </div>
        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}
        {error && <p className="text-red-500 font-semibold">{error}</p>}


        {/* Register Button */}
        <button type="submit" className="h-12 px-6 w-full bg-bRed mt-8 rounded font-semibold text-white hover:bg-red-700" disabled={isLoading}>
          {isLoading ? <Loader className='animate-spin mx-auto size={24}'/> : "Register"}
        </button>

        <div className="flex mt-6 justify-center text-xs">
                <Link to="/login-role-choose" className="text-bRed hover:text-red-700">Already have an account</Link>
                <span className="mx-2 text-gray-300">/</span>
                <Link to="/choose-login-role" className="text-bRed hover:text-red-700">Log in</Link>
            </div>
      </form>
    </div>
  );
};

export default AnonymousRegister;