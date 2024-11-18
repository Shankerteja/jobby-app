import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FilterGroups from '../FilterGroups'
import './index.css'
import Header from '../Header'
import JobDetails from '../JobDetails'

const apiStatusObject = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}
class Jobs extends Component {
  state = {
    jobDetailsList: [],
    jobDetailsApiStatus: apiStatusObject.initial,
    employList: [],
    salaryRange: '',
    searchInput: '',
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="white" height={50} width={50} />
    </div>
  )

  getAllJobsList = async () => {
    const {employList, salaryRange, searchInput} = this.state
    this.setState({jobDetailsApiStatus: apiStatusObject.inProgress})
    let employeId
    if (employList.length === 0) {
      employeId = ''
    } else {
      employeId = employList.join(',')
    }
    console.log(employeId)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeId}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedDataList = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employementType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetailsList: updatedDataList,
        jobDetailsApiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: apiStatusObject.failure})
    }
  }

  employmentType = employe => {
    const {id, checked} = employe
    const {employList} = this.state
    if (checked) {
      this.setState(
        prevState => ({employList: [...prevState.employList, id]}),
        this.getAllJobsList,
      )
    } else {
      const filteredList = employList.filter(eachItem => eachItem !== id)
      this.setState({employList: filteredList}, this.getAllJobsList)
    }
  }

  salaryRange = salaryRange => {
    console.log(salaryRange)
    this.setState({salaryRange}, this.getAllJobsList)
  }

  getSearchInput = event => {
    console.log(event.target.value)
    this.setState({searchInput: event.target.value})
  }

  enterClicked = event => {
    if (event.key === 'Enter') {
      this.getAllJobsList()
    }
  }

  noJobsView = () => (
    <div className="no-job-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
        className="nojob-image"
      />
      <h1 className="nojob-heading">No Jobs Found</h1>
      <p className="failure-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  successView = () => {
    const {jobDetailsList} = this.state
    const result = jobDetailsList.length !== 0
    return (
      <>
        {result ? (
          <ul className="jobs-list">
            {jobDetailsList.map(eachItem => (
              <JobDetails jobdetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        ) : (
          this.noJobsView()
        )}
      </>
    )
  }

  buttonClicked = () => {
    this.getAllJobsList()
  }

  retry = () => {
    this.getAllJobsList()
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
      <button type="button" className="failure-button" onClick={this.retry}>
        Retry
      </button>
    </div>
  )

  componentDidMount = () => {
    this.getAllJobsList()
  }

  getTheresult = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case apiStatusObject.success:
        return this.successView()
      case apiStatusObject.failure:
        return this.failureView()
      case apiStatusObject.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-ap-container">
        <Header />
        <div className="jobs-details-container">
          <FilterGroups
            employmentType={this.employmentType}
            salaryRange={this.salaryRange}
            getSearchInput={this.getSearchInput}
            enterClicked={this.enterClicked}
            buttonClickedd={this.buttonClicked}
            searchInput={searchInput}
          />

          <div className="job-details-list-container ">
            <div className="search-container-lg" data-testid="searchButton">
              <input
                className="search-input"
                placeholder="Search"
                type="search"
                onChange={this.getSearchInput}
                onKeyDown={this.enterClicked}
                aria-label="Search input"
              />
              <button
                type="button"
                aria-label="Search button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.buttonClicked}
              >
                <BsSearch size={20} color="#cbd5e1" />
              </button>
            </div>
            {this.getTheresult()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
