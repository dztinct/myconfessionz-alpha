import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import LoggedInNav from './navbar/LoggedInNav'
import LoggedOutNav from './navbar/LoggedOutNav'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

  const Navbar = () => {

  // Check if user is authenticated
  const isAuthenticated = useIsAuthenticated()

  return (
    <div>
      {isAuthenticated ? <LoggedInNav/> : <LoggedOutNav/>}
    </div>
  );
};

export default Navbar;
