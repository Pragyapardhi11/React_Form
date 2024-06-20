import React, { useState, useEffect } from 'react';
import './EventRegistrationForm.css';

// Custom hook for form validation
function useFormValidation(values, validate) {
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    setErrors(validate(values));
  }, [values]);
  
  return [errors];
}

// Validation function
function validate(values) {
  const errors = {};
  
  if (!values.name) {
    errors.name = 'Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (values.age <= 0) {
    errors.age = 'Age must be greater than 0';
  }
  
  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = 'Guest Name is required';
  }
  
  return errors;
}

// Form component
const EventRegistrationForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: ''
  });
  
  const [errors] = useFormValidation(values, validate);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  };
  
  return (
    <div className="form-container">
      {submitted ? (
        <div className="form-summary">
          <h2>Form Summary</h2>
          <p><strong>Name:</strong> {values.name}</p>
          <p><strong>Email:</strong> {values.email}</p>
          <p><strong>Age:</strong> {values.age}</p>
          <p><strong>Attending with Guest:</strong> {values.attendingWithGuest ? 'Yes' : 'No'}</p>
          {values.attendingWithGuest && <p><strong>Guest Name:</strong> {values.guestName}</p>}
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={values.age}
              onChange={handleChange}
              className={errors.age ? 'input-error' : ''}
            />
            {errors.age && <p className="error-text">{errors.age}</p>}
          </div>
          
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="attendingWithGuest"
                checked={values.attendingWithGuest}
                onChange={handleChange}
              />
              Are you attending with a guest?
            </label>
          </div>
          
          {values.attendingWithGuest && (
            <div className="form-group">
              <label htmlFor="guestName">Guest Name</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                value={values.guestName}
                onChange={handleChange}
                className={errors.guestName ? 'input-error' : ''}
              />
              {errors.guestName && <p className="error-text">{errors.guestName}</p>}
            </div>
          )}
          
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default EventRegistrationForm;
