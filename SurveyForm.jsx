import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SurveyForm.css';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`https://api.example.com/questions?topic=${topic}`);
      setAdditionalQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching additional questions:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

    if (!values.surveyTopic) {
      errors.surveyTopic = 'Survey Topic is required';
    }

    if (values.surveyTopic === 'Technology') {
      if (!values.favoriteProgrammingLanguage) {
        errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      }
      if (!values.yearsOfExperience) {
        errors.yearsOfExperience = 'Years of Experience is required';
      } else if (isNaN(values.yearsOfExperience) || parseInt(values.yearsOfExperience) <= 0) {
        errors.yearsOfExperience = 'Years of Experience must be a number greater than 0';
      }
    }

    if (values.surveyTopic === 'Health') {
      if (!values.exerciseFrequency) {
        errors.exerciseFrequency = 'Exercise Frequency is required';
      }
      if (!values.dietPreference) {
        errors.dietPreference = 'Diet Preference is required';
      }
    }

    if (values.surveyTopic === 'Education') {
      if (!values.highestQualification) {
        errors.highestQualification = 'Highest Qualification is required';
      }
      if (!values.fieldOfStudy) {
        errors.fieldOfStudy = 'Field of Study is required';
      }
    }

    if (!values.feedback) {
      errors.feedback = 'Feedback is required';
    } else if (values.feedback.length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters';
    }

    return errors;
  };

  return (
    <div className="form-container">
      {submitted ? (
        <div className="form-summary">
          <h2>Survey Submitted Successfully</h2>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>
          {formData.surveyTopic === 'Technology' && (
            <>
              <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
              <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
            </>
          )}
          {formData.surveyTopic === 'Health' && (
            <>
              <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
              <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
            </>
          )}
          {formData.surveyTopic === 'Education' && (
            <>
              <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
              <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
            </>
          )}
          <p><strong>Feedback:</strong> {formData.feedback}</p>
          {additionalQuestions.length > 0 && (
            <div>
              <h3>Additional Questions:</h3>
              {additionalQuestions.map((question, index) => (
                <p key={index}><strong>{question.question}</strong> {question.answer}</p>
              ))}
            </div>
          )}
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
            <label htmlFor="surveyTopic">Survey Topic</label>
            <select
              id="surveyTopic"
              name="surveyTopic"
              value={formData.surveyTopic}
              onChange={handleChange}
              className={errors.surveyTopic ? 'input-error' : ''}
            >
              <option value="">Select Topic</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            {errors.surveyTopic && <p className="error-text">{errors.surveyTopic}</p>}
          </div>

          {formData.surveyTopic === 'Technology' && (
            <>
              <div className="form-group">
                <label htmlFor="favoriteProgrammingLanguage">Favorite Programming Language</label>
                <select
                  id="favoriteProgrammingLanguage"
                  name="favoriteProgrammingLanguage"
                  value={formData.favoriteProgrammingLanguage}
                  onChange={handleChange}
                  className={errors.favoriteProgrammingLanguage ? 'input-error' : ''}
                >
                  <option value="">Select Language</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C#">C#</option>
                </select>
                {errors.favoriteProgrammingLanguage && <p className="error-text">{errors.favoriteProgrammingLanguage}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience</label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  className={errors.yearsOfExperience ? 'input-error' : ''}
                />
                {errors.yearsOfExperience && <p className="error-text">{errors.yearsOfExperience}</p>}
              </div>
            </>
          )}

          {formData.surveyTopic === 'Health' && (
            <>
              <div className="form-group">
                <label htmlFor="exerciseFrequency">Exercise Frequency</label>
                <select
                  id="exerciseFrequency"
                  name="exerciseFrequency"
                  value={formData.exerciseFrequency}
                  onChange={handleChange}
                  className={errors.exerciseFrequency ? 'input-error' : ''}
                >
                  <option value="">Select Frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Rarely">Rarely</option>
                </select>
                {errors.exerciseFrequency && <p className="error-text">{errors.exerciseFrequency}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="dietPreference">Diet Preference</label>
                <select
                  id="dietPreference"
                  name="dietPreference"
                  value={formData.dietPreference}
                  onChange={handleChange}
                  className={errors.dietPreference ? 'input-error' : ''}
                >
                  <option value="">Select Diet</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
                {errors.dietPreference && <p className="error-text">{errors.dietPreference}</p>}
              </div>
            </>
          )}

          {formData.surveyTopic === 'Education' && (
            <>
              <div className="form-group">
                <label htmlFor="highestQualification">Highest Qualification</label>
                <select
                  id="highestQualification"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                  className={errors.highestQualification ? 'input-error' : ''}
                >
                  <option value="">Select Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>
                {errors.highestQualification && <p className="error-text">{errors.highestQualification}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="fieldOfStudy">Field of Study</label>
                <input
                  type="text"
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  className={errors.fieldOfStudy ? 'input-error' : ''}
                />
                {errors.fieldOfStudy && <p className="error-text">{errors.fieldOfStudy}</p>}
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className={errors.feedback ? 'input-error' : ''}
              rows="4"
            ></textarea>
            {errors.feedback && <p className="error-text">{errors.feedback}</p>}
          </div>

          <button type="submit">Submit Survey</button>
        </form>
      )}
    </div>
  );
};

export default SurveyForm;
