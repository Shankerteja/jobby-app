import {Link, withRouter} from 'react-router-dom'
import {TiHome} from 'react-icons/ti'
import {FaBusinessTime} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="nav-container">
      <nav className="nav-items-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>

        <ul className="nav-links-list">
          <li className="nav-item">
            <Link to="/">
              <TiHome size={24} color="white" />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/jobs">
              <FaBusinessTime size={24} color="white" />
            </Link>
          </li>
          <li className="nav-item">
            <FiLogOut size={24} color="white" onClick={logoutButton} />
          </li>
        </ul>

        <ul className="nav-links-list-lg">
          <li className="nav-item-lg">
            <Link to="/" className="link">
              Home
            </Link>
          </li>

          <li className="nav-item-lg">
            <Link to="/jobs" className="link">
              Jobs
            </Link>
          </li>
        </ul>

        <button type="button" className="logout-button" onClick={logoutButton}>
          Logout
        </button>
      </nav>
    </div>
  )
}
export default withRouter(Header)
