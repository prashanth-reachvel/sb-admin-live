const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
});

const Schoollist = mongoose.model("School", schoolSchema);

module.exports = Schoollist;
