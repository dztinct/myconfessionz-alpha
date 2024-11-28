import LoggedOutFooter from './footer/LoggedOutFooter';
import LoggedInFooter from './footer/LoggedInFooter';
import { useAuthStore } from '../store/authStore';

const Footer = () => {
  const { isAuthenticated } = useAuthStore()
  return (
    <div>
      { isAuthenticated ? <LoggedInFooter/> : <LoggedOutFooter/> }
    </div>
  );
};

export default Footer;
