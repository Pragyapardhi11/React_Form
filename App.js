import React from 'react';
import './EventRegistrationForm.css';
import './JobApplicationForm.css';
import './SurveyForm.css';
import EventRegistrationForm from './EventRegistrationForm';
import JobApplicationForm from './JobApplicationForm';
import SurveyForm from './SurveyForm';


const App = () =>{
  return(
    <>
    <div className="App">
      {/* <h1>Event Registration</h1>
      <EventRegistrationForm /> */}
{/* 
      <h1>Job Application Form</h1>
      <JobApplicationForm />   */}

      <h1>Survey Form</h1>
      <SurveyForm />

      </div>
    </>
  );
}

export default App;
