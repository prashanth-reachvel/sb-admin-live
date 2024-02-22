const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  schoolName: { type: String, required: true },
  inventoryTitle: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: String, default: Date.now },
  selectedFile: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Declined"],
    default: "Pending",
  },
});

const Request = mongoose.model("request", requestSchema);

module.exports = Request;
