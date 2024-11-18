import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const apiStatusObject = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
}

class FilterGroups extends Component {
  state = {profileApiStatus: apiStatusObject.initial, profileapiStatusList: []}

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusObject.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profiledetailsList = data.profile_details
    if (response.ok === true) {
      const updatedDetails = {
        name: profiledetailsList.name,
        profileImageUrl: profiledetailsList.profile_image_url,
        shortBio: profiledetailsList.short_bio,
      }
      this.setState({
        profileapiStatusList: updatedDetails,
        profileApiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusObject.failure})
    }
  }

  getSearchInputvalue = event => {
    const {getSearchInput} = this.props
    getSearchInput(event)
  }

  componentDidMount = () => {
    this.getProfileDetails()
  }

  successProfileView = () => {
    const {profileapiStatusList} = this.state
    const {name, shortBio, profileImageUrl} = profileapiStatusList
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  profileRetry = () => {
    this.getProfileDetails()
  }

  profilefailureView = () => (
    <div className="profile-failure-view">
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.profileRetry}
      >
        Retry
      </button>
    </div>
  )

  profilerenderLoader = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" color="white" height={50} width={50} />
    </div>
  )

  renderView = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusObject.success:
        return this.successProfileView()
      case apiStatusObject.failure:
        return this.profilefailureView()
      case apiStatusObject.inProgress:
        return this.profilerenderLoader()
      default:
        return null
    }
  }

  onEnterSearchInput = event => {
    const {enterClicked} = this.props
    enterClicked(event)
  }

  clicked = () => {
    const {buttonClickedd} = this.props
    buttonClickedd()
  }

  render() {
    const {employmentType, salaryRange, searchInput} = this.props
    console.log(searchInput)
    return (
      <div className="job-filters-container">
        <div className="search-container">
          <input
            className="search-input"
            placeholder="Search"
            onChange={this.getSearchInputvalue}
            onKeyDown={this.onEnterSearchInput}
            type="search"
            value={searchInput}
            aria-label="Search input"
          />
          <button
            type="button"
            id="searchButton"
            aria-label="Search input"
            className="search-button"
            onClick={this.clicked}
          >
            <BsSearch size={20} color="#cbd5e1" />
          </button>
        </div>

        {this.renderView()}
        <hr className="line" />

        <div className="filter-section-container">
          <h1 className="section-heading">Type of Employment</h1>

          <ul className="section-options-list">
            {employmentTypesList.map(eachItem => {
              const getEmployType = event => {
                employmentType({
                  id: eachItem.employmentTypeId,
                  checked: event.target.checked,
                })
              }
              return (
                <li
                  key={`id ${eachItem.employmentTypeId}`}
                  className="employee-option"
                >
                  <input
                    type="checkbox"
                    id={`type${eachItem.employmentTypeId}`}
                    onChange={getEmployType}
                    value={eachItem.employmentTypeId}
                  />{' '}
                  <label
                    key="label"
                    className="employee-label"
                    htmlFor={`type${eachItem.employmentTypeId}`}
                  >
                    {eachItem.label}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
        <hr className="line" />
        <div className="filter-section-container">
          <h1 className="section-heading">Salary Range</h1>

          <ul className="section-options-list">
            {salaryRangesList.map(eachItem => {
              const getSalary = () => {
                salaryRange(eachItem.salaryRangeId)
              }

              return (
                <li
                  key={`id ${eachItem.salaryRangeId}`}
                  className="employee-option"
                >
                  <input
                    type="radio"
                    id={eachItem.salaryRangeId}
                    name="salary"
                    onChange={getSalary}
                  />
                  <label
                    key={eachItem.label}
                    className="employee-label"
                    htmlFor={eachItem.salaryRangeId}
                  >
                    {eachItem.label}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
export default FilterGroups
