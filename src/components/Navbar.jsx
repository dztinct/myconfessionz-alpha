import { useAuthStore } from '../store/authStore';
import { useAuthStoreCounselor } from '../store/authStoreCounselor';
import LoggedInNav from './navbar/LoggedInNav'
import LoggedOutNav from './navbar/LoggedOutNav'

  const Navbar = () => {
    const { isAuthenticated } = useAuthStore()
    const isAuthenticatedCounselor = useAuthStoreCounselor((state) => state.isAuthenticated);

    if(isAuthenticated){
      return <div><LoggedInNav/></div>
    }else if(isAuthenticatedCounselor){
      return <div><LoggedInNav/></div>
    }else{
      return <div><LoggedOutNav/></div>
    }
  // return (
  //   <div>
      
  //     {isAuthenticated ? <LoggedInNav/> : <LoggedOutNav/>}
  //     {isAuthenticatedCounselor ? <LoggedInNav/> : <LoggedOutNav/>}

  //   </div>
  // );
};

export default Navbar;
