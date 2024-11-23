import { Link } from 'react-router-dom'

const LoggedOutFooter = () => {
  return (
    <div>
        <nav className="fixed bottom-0 w-full bg-bRed text-white py-3 px-2 text-center">
            <div>
              Myconfessionz.com | All Rights Reserved &copy; 2022
            </div>
            <div>
              <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link>
            </div>
        </nav>
    </div>
  )
}

export default LoggedOutFooter
