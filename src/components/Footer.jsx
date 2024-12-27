import LoggedOutFooter from './footer/LoggedOutFooter';
import LoggedInFooter from './footer/LoggedInFooter';
import { useAuthStore } from '../store/authStore';
import { useAuthStoreCounselor } from '../store/authStoreCounselor';

const Footer = () => {
  const { isAuthenticated } = useAuthStore()
  const isAuthenticatedCounselor = useAuthStoreCounselor((state) => state.isAuthenticated);

  if(isAuthenticated){
    return <div><LoggedInFooter/></div>
  }else if(isAuthenticatedCounselor){
    return <div><LoggedInFooter/></div>
  }else{
    return <div><LoggedOutFooter/></div>
  }

  // return (
  //   <div>
  //     { isAuthenticated ? <LoggedInFooter/> : <LoggedOutFooter/> }
  //     { isAuthenticatedCounselor ? <LoggedInFooter/> : <LoggedOutFooter/> }
  //   </div>
  // );
};

export default Footer;
