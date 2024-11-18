import {Component} from 'react'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobsCard from '../SimilarJobsCard'
import Header from '../Header'
import './index.css'

const apiStatusObject = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    apiStatus: apiStatusObject.initial,
    similarJobDetails: [],
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="white" height={50} width={50} />
    </div>
  )

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  jobFullDetails = async () => {
    this.setState({apiStatus: apiStatusObject.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const dataObject = await response.json()
      const formattedObject = this.getFormattedData(dataObject.job_details)
      const updatedSimilarJobData = dataObject.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        location: eachItem.location,
        title: eachItem.title,
        rating: eachItem.rating,
        jobDescription: eachItem.job_description,
        companyLogourl: eachItem.company_logo_url,
      }))

      this.setState({
        similarJobDetails: updatedSimilarJobData,
        jobDetails: formattedObject,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObject.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
    } = jobDetails
    console.log(lifeAtCompany)

    return (
      <div className="job-details-container">
        <div className="each-job-card">
          <div className="job-logo-name-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-logo-image"
            />

            <div className="company-name-rating-container">
              <h1 className="compnay-name-heading">{title}</h1>
              <div className="rating-container">
                <FaStar color="#fbbf24" size={15} />
                <p className="rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-employtype-package-container">
            <div className="location-employtype-container">
              <div className="location-container">
                <MdLocationOn color="white" size={15} />
                <p className="location-para">{location}</p>
              </div>
              <div className="employtype-container">
                <MdWork color="white" size={15} />
                <p className="employtype-para">{employmentType}</p>
              </div>
            </div>
            <p className="package-para">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-link-container">
            <h1 className="description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="website-navigation">
              Visit <FaExternalLinkAlt color="#6366f1" />
            </a>
          </div>
          <p className="description-content content">{jobDescription}</p>
          <h1 className="skills-heading sub-heading">Skills</h1>

          <ul className="skills-list-container">
            {skills.map(eachItem => {
              console.log(eachItem)
              return (
                <li className="skill-container" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              )
            })}
          </ul>
          <h1 className="life-at-company sub-heading">Life at Company</h1>
          <div className="life-at-company-lg">
            <p className="life-at-company-para content">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobDetails.map(eachItem => (
              <SimilarJobsCard similarJob={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="white" height={50} width={50} />
    </div>
  )

  retrystate = () => {
    this.jobFullDetails()
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">!Oops Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-button"
        onClick={this.retrystate}
      >
        Retry
      </button>
    </div>
  )

  getTheResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObject.success:
        return this.renderJobDetails()
      case apiStatusObject.failure:
        return this.failureView()
      case apiStatusObject.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  componentDidMount = () => {
    this.jobFullDetails()
  }

  render() {
    return (
      <div className="job-item-container">
        <Header />
        {this.getTheResult()}
      </div>
    )
  }
}
export default JobItemDetails
