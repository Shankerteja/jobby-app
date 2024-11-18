import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {Link} from 'react-router-dom'

const JobDetails = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    title,
    location,
    rating,
    packagePerAnnum,
    id,
  } = jobdetails
  return (
    <Link to={`/jobs/${id}`} className="each-job">
      <li className="job-card-container">
        <div className="company-details-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="company-name-container">
            <h1 className="company-name">{title}</h1>
            <p className="rating">
              {' '}
              <FaStar size={15} color="#fbbf24" /> {rating}
            </p>
          </div>
        </div>
        <div className="company-work-details">
          <div className="company-job-type">
            <div className="company-palce">
              {' '}
              <MdLocationOn
                size={15}
                color="white"
                className="location-icon"
              />{' '}
              <p className="location">{location} </p>
            </div>
            <div className="job-type">
              <MdWork size={15} color="white" className="work-icon" />{' '}
              <p className="empoly-type">{employementType}</p>
            </div>
          </div>
          <p className="job-salary">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobDetails
