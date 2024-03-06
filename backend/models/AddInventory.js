const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  school: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
  totalAddQuantity: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
  },
  distributed: {
    type: Number,
  },
  totalBoxes: {
    type: Number,
  },
  reason: {
    type: String,
  },
  updatedDate: {
    type: Date,
  },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
