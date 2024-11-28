import React, { useEffect, useState } from 'react';
import api from './api'; // Axios instance

// Fetch function (you can also place it in a separate file and import it)
const fetchUserProfile = async () => {
  try {
    const response = await api.get('/profile'); // Authenticated endpoint
    console.log('User Profile:', response.data.user);
    return response.data.user;
  } catch (error) {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Token might be invalid or expired.');
    } else {
      console.error('An error occurred:', error.response?.data || error.message);
    }
    throw error;
  }
};

// React Component
const UserProfile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [error, setError] = useState(''); // Handle errors

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(); // Call the function here
        setUser(userData); // Update state with user data
      } catch (err) {
        setError('Failed to fetch user profile. Please log in again.'); // Set error message
      }
    };

    getUserProfile(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return <div>{error}</div>; // Render error if any
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>Loading profile...</p> // Show loading message while fetching data
      )}
    </div>
  );
};

export default UserProfile;
