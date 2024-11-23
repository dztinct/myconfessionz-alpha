import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import LoggedOutFooter from './footer/LoggedOutFooter';
import LoggedInFooter from './footer/LoggedInFooter';

const Footer = () => {
    const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      {isAuthenticated ? <LoggedInFooter/> : <LoggedOutFooter/>}
    </div>
  );
};

export default Footer;
