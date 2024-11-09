import { useState, useEffect } from 'react';
import logo from '../../images/myconfessionz.png';
import { FaUser, FaLock, FaCalendarAlt, FaVenusMars, FaFlag, FaKey } from 'react-icons/fa';
import { MdVerifiedUser, MdOutlineAlternateEmail } from "react-icons/md"
import { Link } from 'react-router-dom'
import { GiField } from "react-icons/gi"
import { FaRegImage } from "react-icons/fa6"
import { AiFillProfile } from "react-icons/ai"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Register = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState("anonymous");

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    }

  // useEffect(() => {
  //   // Fetch countries from API (replace with your actual endpoint)
  //   fetch('/api/countries')
  //     .then(res => res.json())
  //     .then(data => setCountries(data));
  // }, []);

  const handleCountryChange = (e) => {
    const countryId = e.target.value;
    setCountry(countryId);
    // Fetch states based on selected country
    fetch(`/get_states?country=${countryId}`)
      .then(res => res.json())
      .then(data => setStates(data));
  };

  // const checkNum = (e) => {
  //   const username = e.target.value;
  //   if (isNaN(username)) {
  //     setErrorMessage('Only numbers allowed (e.g., 34527)');
  //   } else {
  //     setErrorMessage('');
  //   }
  // };

  const schema = yup.object().shape({
    // username: yup.string()
    //   .when("role", {
    //     is: "anonymous",
    //     then: (schema) => schema.required("Username is required").min(4, "Username must be at least 4 characters"),
    //     otherwise: (schema) => schema
    //   }),
  
    // first_name: yup.string()
    //   .when("role", {
    //     is: "counselor",
    //     then: (schema) => schema.required("First name is required").min(2, "First name must be at least 2 characters"),
    //     otherwise: (schema) => schema
    //   }),
  
    // last_name: yup.string()
    //   .when("role", {
    //     is: "counselor",
    //     then: (schema) => schema.required("Last name is required").min(2, "Last name must be at least 2 characters"),
    //     otherwise: (schema) => schema
    //   }),
  
    // image: yup.mixed()
    //   .when("role", {
    //     is: "counselor",
    //     then: (schema) => schema.required("Profile image is required"),
    //     otherwise: (schema) => schema
    //   }),
      
    //   counseling_field: yup.string()
    //   .when("role", {
    //     is: "counselor",
    //     then: (schema) => schema.required("Counseling field is required"),
    //     otherwise: (schema) => schema
    //   }),


      // counselor specific fields
    first_name: role === "counselor" ? yup.string().required("First name is required").min(2, "First name must be at least 2 characters") : yup.string(),
    last_name: role === "counselor" ? yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters") : yup.string(),
    email: role === "counselor" ? yup.string().email("Invalid email").required("Email is required") : yup.string(),
    image: role === "counselor" ? yup.string().required("Image is required") : yup.string(),
    counseling_field: role === "counselor" ? yup.string().required("Counseling field is required") : yup.string(),
    bio: role === "counselor" ? yup.string().required("Bio is required").min(10, "Bio must be at least 10 characters") : yup.string(),
    

    // mixed fields
    username: yup.string().required("Username is required").min(4, "Username must be at least 4 characters"),
    dob: yup.date().required("Date of birth is required").max(new Date(), "Date of birth cannot be in the future"),
    gender: yup.string().required("Gender is required"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], "Passwords must match")
      .required("Please confirm your password"),
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

  // Handle registration form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', data);
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: data.email || data.username },
    });
    console.log(data)
    } catch (error) {
      console.error("Error logging in:", error);
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
        <label htmlFor="role" className='font-semibold text-xs my-3'>Register as</label>
        <div className="flex items-center mb-3">
          <MdVerifiedUser className="text-gray-500 mr-2" />
          <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" id="role"
        value={role}
        onChange={handleRoleChange}>
            <option value="anonymous">Anonymous User</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>

        {role === "anonymous" ? (
                <>
        {/* Username */}
        <div className="flex items-center mb-3">
          <FaUser className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Anonymous Username"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            // onKeyDown={checkNum}
            {...register("username")}
          />
        </div>
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        {/* Gender */}
        <div className="flex items-center mb-3">
          <FaVenusMars className="text-gray-500 mr-2" />
          <select
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("gender")}
          >
            <option value="">Select Your Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

        {/* Date of Birth */}
        <div className="flex items-center mb-3">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <input
            type="date" placeholder="dd/mm/yyyy"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("dob")}
          />
        </div>
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

        {/* Country */}
        <div className="flex items-center mb-3">
          <FaFlag className="text-gray-500 mr-2" />
          <select
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            onChange={handleCountryChange}
            {...register("country")}
          >
            <option value="">Select Your Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
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
            disabled={!states.length}
            {...register("state")}
          >
            <option value="">Select Your State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
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
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        {/* Recovery Question */}
        <div className="flex items-center mb-3">
          <FaKey className="text-gray-500 mr-2" />
          <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("recovery_question")}
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
          />
        </div>
        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}

        </>
            ) :(
                <>


                {/* Username */}
        <div className="flex items-center mb-3">
          <FaUser className="text-gray-500 mr-2" />
          <input type="text" placeholder="Counselor Username" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("username")}
          />
        </div>
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        {/* First Name */}
        <div className="flex items-center mb-3">
          <FaUser className="text-gray-500 mr-2" />
          <input type="text" placeholder="First Name" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
          {...register("first_name")}
          />
        </div>
        {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

        {/* Last Name */}
        <div className="flex items-center mb-3">
          <FaUser className="text-gray-500 mr-2" />
          <input type="text" placeholder="Last Name" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
          {...register("last_name")}
          />
        </div>
        {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

               {/* Email */}
        <div className="flex items-center mb-3">
          <MdOutlineAlternateEmail className="text-gray-500 mr-2" />
          <input type="text" placeholder="Counselor Email" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
          {...register("email")}
          />
        </div>
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* Image */}
        <div className="flex items-center mb-3">
          <FaRegImage className="text-gray-500 mr-2" />
          <input type="file" className="flex-grow h-12 p-2 w-[70%] bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
          {...register("image")}
          />
        </div>
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}

        {/* Counseling Field (for counselors only) */}
        {role === "counselor" && (
          <div className="flex items-center mb-3">
            <GiField className="text-gray-500 mr-2" />
            <input type="text" placeholder="Counseling Field" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            {...register("counseling_field")}
            />
          </div>
        )}
        {errors.counseling_field && <p className="text-red-500">{errors.counseling_field.message}</p>}

        {/* Date of Birth */}
        <div className="flex items-center mb-3">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <input type="date" placeholder="dd/mm/yyyy" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
          {...register("dob")}
          />
        </div>
        {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}

        {/* Gender */}
        <div className="flex items-center mb-3">
          <FaVenusMars className="text-gray-500 mr-2" />
          <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}

        {/* Country */}
        <div className="flex items-center mb-3">
          <FaFlag className="text-gray-500 mr-2" />
          <select onChange={handleCountryChange} className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("country")}
          >
            <option value="">Select Country</option>
            {countries.map(country => <option key={country.id} value={country.id}>{country.name}</option>)}
          </select>
        </div>
        {errors.country && <p className="text-red-500">{errors.country.message}</p>}

        {/* State */}
        <div className="flex items-center mb-3">
          <FaFlag className="text-gray-500 mr-2" />
          <select disabled={!states.length} className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("state")}
          >
            <option value="">Select State</option>
            {states.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}
          </select>
        </div>
        {errors.state && <p className="text-red-500">{errors.state.message}</p>}

                {/* Bio */}
            <div className="flex items-center mb-3">
          <AiFillProfile className="text-gray-500 mr-2" />
          <textarea placeholder="Anything you would like to share about yourself" className="flex-grow h-24 p-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("bio")}
          ></textarea>
        </div>
        {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

        {/* Password */}
        <div className="flex items-center mb-3">
          <FaLock className="text-gray-500 mr-2" />
          <input type="password" placeholder="Password" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("password")}
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
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

        {/* Recovery Question */}
        <div className="flex items-center mb-3">
          <FaKey className="text-gray-500 mr-2" />
          <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          {...register("recovery_question")}
          >
            <option value="">Recovery Question</option>
            <option value="Favorite childhood movie">Favorite childhood movie</option>
            <option value="Dream holiday city">Dream holiday city</option>
            <option value="Dream car model">Dream car model</option>
          </select>
        </div>
        {errors.recovery_question && <p className="text-red-500">{errors.recovery_question.message}</p>}

        {/* Recovery Answer */}
        <div className="flex items-center mb-3">
          <FaKey className="text-gray-500 mr-2" />
          <input type="text" placeholder="Answer" className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
          {...register("recovery_answer")}
          />
        </div>
        {errors.answer && <p className="text-red-500">{errors.answer.message}</p>}

        </>
            )}

        {/* Register Button */}
        <button type="submit" className="h-12 px-6 w-full bg-bRed mt-8 rounded font-semibold text-white hover:bg-red-700">
          Register
        </button>

        <div className="flex mt-6 justify-center text-xs">
                <Link to="/login" className="text-bRed hover:text-red-700">Already have an account</Link>
                <span className="mx-2 text-gray-300">/</span>
                <Link to="/login" className="text-bRed hover:text-red-700">Log in</Link>
            </div>
      </form>
    </div>
  );
};

export default Register;