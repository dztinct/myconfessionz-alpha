import { useAuthStore } from '../store/authStore';
import LoggedInNav from './navbar/LoggedInNav'
import LoggedOutNav from './navbar/LoggedOutNav'

  const Navbar = () => {
    const { isAuthenticated } = useAuthStore()

  return (
    <div>
      {isAuthenticated ? <LoggedInNav/> : <LoggedOutNav/>}

    </div>
  );
};

export default Navbar;
