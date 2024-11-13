import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaUser, FaLock } from 'react-icons/fa';
import { MdVerifiedUser } from 'react-icons/md';
import logo from '../../images/myconfessionz.png'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [role, setRole] = useState("anonymous");

  // Define validation schema based on role
  const schema = yup.object().shape({
    username: role === "anonymous" ? yup.string().required("Username is required"): yup.string(),
    email: role === "counselor" ? yup.string().email("Invalid email").required("Email is required") : yup.string(),
    password: yup.string().required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

    // log user in and redirect to homepage
    const signIn = useSignIn();
    const navigate = useNavigate()

  // Handle login form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login-user', data);
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { data },
        auth: {
          type: "http"
        }
      });
      console.log(data)
      setTimeout(() => navigate('/home'), 200); // Adding a slight delay
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen pt-16 pb-24 bg-black text-bRed">
        <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mt-12 animate-slide-in-left">
            <img src={logo} alt="logo" className="w-full h-full" />
        </div>

        <div className='mt-3'>
            <span className='text-white'>Log in to</span> Myconfessionz
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-white rounded shadow-lg px-8 pt-4 pb-8 mt-8 animate-slide-in-right">
        <label htmlFor="role" className="font-semibold text-xs my-3">Login as</label>
        <div className="flex items-center mb-3">
          <MdVerifiedUser className="text-gray-500 mr-2" />
          <select
            id="role"
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="anonymous">Anonymous User</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>

        {role === "anonymous" ? (
          <>
            <div className="flex items-center mb-3">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Anonymous Username"
                {...register("username")}
                name='username'
                className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          </>
        ) : (
          <>
            <div className="flex items-center mb-3">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Counselor Email"
                {...register("email")}
                name='email'
                className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </>
        )}

        <div className="flex items-center mb-3">
          <FaLock className="text-gray-500 mr-2" />
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            name='password'
            className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="h-12 px-6 bg-bRed mt-4 rounded font-semibold text-sm text-red-100 hover:bg-red-700">
          Log in
        </button>

        <div className="flex mt-4 justify-center text-xs">
                <Link to="/forgot-password" className="text-bRed hover:text-red-700">Forgot Password</Link>
                <span className="mx-2 text-gray-300">/</span>
                <Link to="/register" className="text-bRed hover:text-red-700">Register</Link>
            </div>
      </form>
    </div>
  );
};

export default Login;






















// import { useState } from 'react'
// import logo from '../../images/myconfessionz.png'
// import { Link } from 'react-router-dom'
// import { FaUser, FaLock } from 'react-icons/fa';
// import { MdVerifiedUser } from "react-icons/md";
// import axios, {AxiosError}  from 'axios'
// import { useSignIn } from 'react-auth-kit'

// const Login = () => {
//     const [role, setRole] = useState("anonymous");
//     const [error, setError] = useState()

//     const signIn = useSignIn()

//     const handleRoleChange = (e) => {
//     setRole(e.target.value);
//     }

//     const onSubmit = async () => {
//         try {
//             const response = await axios.post('https://localhost:8000/api/login', values)

//             signIn({
//                 token: response.data.token,
//                 expiresIn: 3600,
//                 tokenType: "Bearer",
//                 authState: { email: values.email } || { username: values.username }
//             })


//         } catch (err) {
//             if(err && err instanceof AxiosError)
//             setError(err.response?.data.message)
//         else if(err && err instanceof Error) setError(err.message)

//         console.log("Error: ", err)
//         }
//     }

//   return (
//     <div className="flex flex-col items-center justify-center w-screen pt-16 pb-24 bg-black text-bRed">
//         <div className="w-16 h-12 lg:w-20 lg:h-20 md:w-16 md:h-16 object-cover mt-12 animate-slide-in-left">
//             <img src={logo} alt="logo" className="w-full h-full" />
//         </div>

//         <div className='mt-3'>
//             <span className='text-white'>Log in to</span> Myconfessionz
//         </div>
//         {/* Apply the animation to the form */}
//         <form className="flex flex-col bg-white rounded shadow-lg px-8 pt-4 pb-8 mt-8 animate-slide-in-right" action="">
//                 {/* <label htmlFor="role" className='font-semibold text-xs mt-3'>Login as</label>
//             <select name="role" id="role" className='border-2 p-2 my-2 rounded outline-red-500'  value={role}
//                 onChange={handleRoleChange}>
//                 <option value="anonymous">Anonymous User</option>
//                 <option value="Counselor">Counselor</option>
//             </select> */}

//             {/* Role */}
//         <label htmlFor="role" className='font-semibold text-xs my-3'>Login as</label>
//         <div className="flex items-center mb-3">
//           <MdVerifiedUser className="text-gray-500 mr-2" />
//           <select className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500" id="role"
//         value={role}
//         onChange={handleRoleChange}>
//             <option value="anonymous">Anonymous User</option>
//             <option value="counselor">Counselor</option>
//           </select>
//         </div>

            
//             {role === "anonymous" ? (
//                 <>
//             {/* <label className="font-semibold text-xs" htmlFor="username">UsernameEmail/label>
//             <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 outline-red-500" type="text" />
//              */}

//                      {/* Username */}
//         <div className="flex items-center mb-3">
//           <FaUser className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Anonymous Username"
//             className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//           />
//         </div>

//             {/* <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
//             <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500" type="password" /> */}

//                     {/* Password */}
//         <div className="flex items-center mb-3">
//           <FaLock className="text-gray-500 mr-2" />
//           <input
//             type="password"
//             placeholder="Password"
//             className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//           />
//         </div>

            
//             </>
//             ) :(
//                 <>
//                             {/* <label className="font-semibold text-xs" htmlFor="email">Email</label>
//             <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 outline-red-500" type="email" /> */}

//         <div className="flex items-center mb-3">
//           <FaUser className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Counselor Email"
//             className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//           />
//         </div>
            
//             {/* <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
//             <input className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500" type="password" />
//              */}

// <div className="flex items-center mb-3">
//           <FaLock className="text-gray-500 mr-2" />
//           <input
//             type="password"
//             placeholder="Password"
//             className="flex-grow h-12 px-4 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
//           />
//         </div>
//                 </>
//             )}
//             <button className="flex items-center justify-center h-12 px-6 w-64 bg-bRed mt-4 rounded font-semibold text-sm text-red-100 hover:bg-red-700">Log in</button>
            
//             <div className="flex mt-4 justify-center text-xs">
//                 <Link to="/forgot-password" className="text-bRed hover:text-red-700">Forgot Password</Link>
//                 <span className="mx-2 text-gray-300">/</span>
//                 <Link to="/register" className="text-bRed hover:text-red-700">Register</Link>
//             </div>
//         </form>
//     </div>
//   )
// }

// export default Login




