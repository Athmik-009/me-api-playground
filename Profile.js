const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String],
  skills: [String]
});

const WorkSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String]
});

const EducationSchema = new mongoose.Schema({
  degree: String,
  institute: String,
  cgpa: String,
  year: String
});

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  enrollmentNo: String,
  dob: String,
  mobileNo: String,
  education: [EducationSchema],  // Changed to array of objects
  skills: [String],
  projects: [ProjectSchema],
  work: [WorkSchema],
  links: {
    github: String,
    linkedin: String,
  },
  achievements: [String]
});

module.exports = mongoose.model('Profile', ProfileSchema);