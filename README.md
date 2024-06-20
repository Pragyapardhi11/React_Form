# React_Form
# Basic Dynamic FormwithConditional Fields
 Objective: Build a form with dynamic fields and simple validation.
 FormType: Event Registration Form
 1.
 FormFields:
 ○ Name(Text)
 ○ Email(Email)
 ○ Age(Number)
 ○ Areyouattending with a guest? (Yes/No)
 ○ GuestName(Text, visible only if attending with a guest)
 2. Conditional Logic:
 ○ Showthe"Guest Name" field only if the "Are you attending with a guest?"
 f
 ield is answered with "Yes".
 3. Validation:
 ○ Name:Required
 ○ Email: Required and must be a valid email format
 ○ Age:Required and must be a number greater than 0
 ○ GuestName:Required if attending with a guest
 4. Submission:
 ○ Onformsubmission, display a summary of the entered data

 # Intermediate Dynamic Form with NestedConditional Logic and Multiple
 Field Types
 Objective: Build a more complex form with nested conditional fields, multiple field
 types, and enhanced validation.
 FormType: Job Application Form
 1.
 FormFields:
 ○ Full Name(Text)
 ○ Email(Email)
 ○ PhoneNumber(Number)
 ○ Applying for Position (Dropdown: Developer, Designer, Manager)
 ○ Relevant Experience (Number of years, visible if "Developer" or "Designer"
 is selected)
 ○ Portfolio URL (Text, visible if "Designer" is selected)
 ○ ManagementExperience (Text, visible if "Manager" is selected)
 ○ Additional Skills (Multiple checkboxes: JavaScript, CSS, Python, etc.)
 ○ Preferred Interview Time (Date and Time Picker)
 2. Conditional Logic:
 ○ Show"Relevant Experience" if "Developer" or "Designer" is selected.
 ○ Show"Portfolio URL" if "Designer" is selected.
 ○ Show"ManagementExperience" if "Manager" is selected.
 3. Validation:
 ○ Full Name: Required
 ○ Email: Required and must be a valid email format
 ○ PhoneNumber:Required and must be a valid number
 ○ Relevant Experience: Required if "Developer" or "Designer" is selected, and
 must be a number greater than 0
 ○ Portfolio URL: Required if "Designer" is selected, and must be a valid URL
 ○ ManagementExperience: Required if "Manager" is selected
 ○ Additional Skills: At least one skill must be selected
 ○ Preferred Interview Time: Required and must be a valid date and time
 4. Submission:
 ○ Onformsubmission, display a summary of the entered data.

# AdvancedDynamicFormwithComplexConditionalLogic,Dynamic
 Sections, and Integration with an API
 Objective: Build an advanced form with complex conditional fields, dynamic sections,
 and integration with an external API for data fetching.
 FormType: Survey Form with Dependent Questions and Dynamic Sections
 1.
 FormFields:
 ○ Full Name(Text)
 ○ Email(Email)
 ○ SurveyTopic (Dropdown: Technology, Health, Education)
 ○ Technology Section (Visible if "Technology" is selected):
 ■ Favorite Programming Language (Dropdown: JavaScript, Python,
 Java, C#)
 ■ Yearsof Experience (Number)
 ○ Health Section (Visible if "Health" is selected):
 ■ Exercise Frequency (Dropdown: Daily, Weekly, Monthly, Rarely)
 ■ DietPreference (Dropdown: Vegetarian, Vegan, Non-Vegetarian)
 ○ Education Section (Visible if "Education" is selected):
 ■ Highest Qualification (Dropdown: High School, Bachelor's, Master's,
 PhD)
 ■ Field of Study (Text)
 ○ Feedback(Textarea)
 2. Conditional Logic:
 ○ Show"Technology Section" if "Technology" is selected as the survey topic.
 ○ Show"Health Section" if "Health" is selected as the survey topic.
 ○ Show"Education Section" if "Education" is selected as the survey topic.
 ○ Fetchanddisplay additional questions based on the selected survey topic
 using an external API.
 3. Validation:
 ○ Full Name: Required
 ○ Email: Required and must be a valid email format
 ○ SurveyTopic: Required
 ○ Technology Section Fields: Required if "Technology" is selected, and
 validate accordingly
 ○ Health Section Fields: Required if "Health" is selected, and validate
 accordingly
○ Education Section Fields: Required if "Education" is selected, and validate
 accordingly
 ○ Feedback: Required and must be at least 50 characters
 4. Submission:
 ○ Onformsubmission, validate the data, fetch additional questions from an
 external API based on the survey topic, and display a summary of the
 entered data along with the additional questions
