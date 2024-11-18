import './index.css'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'

const SimilarJobsCard = props => {
  const {similarJob} = props

  const {
    rating,
    location,
    title,
    companyLogourl,
    jobDescription,
    employmentType,
  } = similarJob

  return (
    <li className="similar-job-card">
      <div className="similar-job-name-rating-logo-container">
        <img
          src={companyLogourl}
          alt="similar job company logo"
          className="similar-job-logo"
        />
        <div className="similar-job-name-rating-container">
          <h1 className="similar-job-name">{title}</h1>
          <div className="simiar-job-rating">
            <FaStar size={15} color="#fbbf24" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobDescription sub-heading">Description</h1>
      <p className="description content">{jobDescription}</p>
      <div className="location-work-container">
        <div className="location-container">
          <MdLocationOn size={15} color="white" />
          <p className="location-para">{location}</p>
        </div>
        <div className="employtype-container">
          <MdWork size={15} color="white" />
          <p className="employtype-para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobsCard
