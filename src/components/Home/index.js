import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="banner-container">
          <div className="content-container">
            <h1 className="content-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="description">
              Millions of people are searching for jobs, salary Information,
              company reviews. Find the job that fits Your ability and potential
            </p>
            <Link to="/jobs">
              <button className="banner-button" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
