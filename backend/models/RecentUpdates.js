const mongoose = require("mongoose");

const recentUpdateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  totalQuantity: {
    type: Number,
    required: true,
  },
  updatedDate: {
    type: String,
  },
  reason: {
    type: String,
  },
});

const RecentUpdate = mongoose.model("RecentUpdate", recentUpdateSchema);

module.exports = RecentUpdate;
