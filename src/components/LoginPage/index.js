import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  getusername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  submitClicked = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const {errorMsg, username, password, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form-container" onSubmit={this.submitClicked}>
            <div className="username-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="username-input"
                placeholder="Username: rahul"
                onChange={this.getusername}
                value={username}
              />
            </div>
            <div className="password-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="username-input"
                placeholder="Password: rahul@2021"
                onChange={this.getPassword}
                value={password}
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showError && <p className="error_msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
