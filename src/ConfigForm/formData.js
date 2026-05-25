export const formDataConfig = [
  {
    "name": "candidateName",
    "label": "Candidate Name",
    "type": "text",
    "placeholder": "Enter candidate name",
    "required": true
  },
  {
    "name": "email",
    "label": "Email",
    "type": "email",
    "placeholder": "Enter email address",
    "required": true
  },
  {
    "name": "phone",
    "label": "Phone Number",
    "type": "tel",
    "placeholder": "Enter phone number",
    "required": true
  },
  {
    "name": "experience",
    "label": "Experience",
    "type": "text",
    "placeholder": "e.g. 5.1 Years",
    "required": false
  },
  {
    "name": "interviewTime",
    "label": "Interview Time",
    "type": "text",
    "placeholder": "09:00 AM - 09:30 AM",
    "required": false
  },
  {
    "name": "meetingDetails",
    "label": "Meeting ID / Passcode",
    "type": "textarea",
    "placeholder": "Enter meeting details",
    "required": false
  },
  {
    "name": "organizerName",
    "label": "Organizer Name",
    "type": "text",
    "placeholder": "Enter organizer name",
    "required": false
  },
  {
    "name": "codingChallenge",
    "label": "Coding Challenge",
    "type": "textarea",
    "placeholder": "Enter coding challenge",
    "required": false
  },
  {
    "name": "status",
    "label": "Status",
    "type": "select",
    "required": true,
    "options": [
      { "label": "Scheduled", "value": "scheduled" },
      { "label": "Completed", "value": "completed" },
      { "label": "Rejected", "value": "rejected" }
    ]
  },
  {
    "name": "feedback",
    "label": "Feedback",
    "type": "textarea",
    "placeholder": "Enter feedback",
    "required": false
  },
  {
    "name": "isRemote",
    "label": "Remote Interview",
    "type": "checkbox",
    "required": false
  }
]