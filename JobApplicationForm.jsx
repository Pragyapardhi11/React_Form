import React, { useState } from 'react';
import './JobApplicationForm.css'; // Import your CSS file

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          additionalSkills: [...formData.additionalSkills, name],
        });
      } else {
        setFormData({
          ...formData,
          additionalSkills: formData.additionalSkills.filter((skill) => skill !== name),
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }

    if (!values.applyingForPosition) {
      errors.applyingForPosition = 'Applying for Position is required';
    }

    if (values.applyingForPosition === 'Developer' || values.applyingForPosition === 'Designer') {
      if (!values.relevantExperience) {
        errors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(values.relevantExperience) || parseInt(values.relevantExperience) <= 0) {
        errors.relevantExperience = 'Relevant Experience must be a number greater than 0';
      }
    }

    if (values.applyingForPosition === 'Designer') {
      if (!values.portfolioURL) {
        errors.portfolioURL = 'Portfolio URL is required';
      } else if (!isValidUrl(values.portfolioURL)) {
        errors.portfolioURL = 'Portfolio URL is not valid';
      }
    }

    if (values.applyingForPosition === 'Manager') {
      if (!values.managementExperience) {
        errors.managementExperience = 'Management Experience is required';
      }
    }

    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = 'Please select at least one additional skill';
    }

    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (!isValidDateTime(values.preferredInterviewTime)) {
      errors.preferredInterviewTime = 'Preferred Interview Time is not valid';
    }

    return errors;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isValidDateTime = (dateTimeString) => {
    const dateTime = Date.parse(dateTimeString);
    return !isNaN(dateTime);
  };

  return (
    <div className="form-container">
      {submitted ? (
        <div className="form-summary">
          <h2>Application Submitted Successfully</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {formData.applyingForPosition}</p>
          {formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer' ? (
            <p><strong>Relevant Experience:</strong> {formData.relevantExperience}</p>
          ) : null}
          {formData.applyingForPosition === 'Designer' ? (
            <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
          ) : null}
          {formData.applyingForPosition === 'Manager' ? (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          ) : null}
          <p><strong>Additional Skills:</strong> {formData.additionalSkills.join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? 'input-error' : ''}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'input-error' : ''}
            />
            {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="applyingForPosition">Applying for Position</label>
            <select
              id="applyingForPosition"
              name="applyingForPosition"
              value={formData.applyingForPosition}
              onChange={handleChange}
              className={errors.applyingForPosition ? 'input-error' : ''}
            >
              <option value="">Select Position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
            {errors.applyingForPosition && <p className="error-text">{errors.applyingForPosition}</p>}
          </div>

          {formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer' ? (
            <div className="form-group">
              <label htmlFor="relevantExperience">Relevant Experience (years)</label>
              <input
                type="number"
                id="relevantExperience"
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                className={errors.relevantExperience ? 'input-error' : ''}
              />
              {errors.relevantExperience && <p className="error-text">{errors.relevantExperience}</p>}
            </div>
          ) : null}

          {formData.applyingForPosition === 'Designer' ? (
            <div className="form-group">
              <label htmlFor="portfolioURL">Portfolio URL</label>
              <input
                type="text"
                id="portfolioURL"
                name="portfolioURL"
                value={formData.portfolioURL}
                onChange={handleChange}
                className={errors.portfolioURL ? 'input-error' : ''}
              />
              {errors.portfolioURL && <p className="error-text">{errors.portfolioURL}</p>}
            </div>
          ) : null}

          {formData.applyingForPosition === 'Manager' ? (
            <div className="form-group">
              <label htmlFor="managementExperience">Management Experience</label>
              <textarea
                id="managementExperience"
                name="managementExperience"
                value={formData.managementExperience}
                onChange={handleChange}
                className={errors.managementExperience ? 'input-error' : ''}
              />
              {errors.managementExperience && <p className="error-text">{errors.managementExperience}</p>}
            </div>
          ) : null}

          <div className="form-group">
            <label>Additional Skills</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="JavaScript"
                  checked={formData.additionalSkills.includes('JavaScript')}
                  onChange={handleChange}
                />
                JavaScript
              </label>
              <label>
                <input
                  type="checkbox"
                  name="CSS"
                  checked={formData.additionalSkills.includes('CSS')}
                  onChange={handleChange}
                />
                CSS
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Python"
                  checked={formData.additionalSkills.includes('Python')}
                  onChange={handleChange}
                />
                Python
              </label>
              {/* Add more skills as needed */}
            </div>
            {errors.additionalSkills && <p className="error-text">{errors.additionalSkills}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="preferredInterviewTime">Preferred Interview Time</label>
            <input
              type="datetime-local"
              id="preferredInterviewTime"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
              className={errors.preferredInterviewTime ? 'input-error' : ''}
            />
            {errors.preferredInterviewTime && <p className="error-text">{errors.preferredInterviewTime}</p>}
          </div>

          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
  );
};

export default JobApplicationForm;
