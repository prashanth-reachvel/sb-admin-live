const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  schoolId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
