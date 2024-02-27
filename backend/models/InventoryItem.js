// models/InventoryItem.js
const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  school: {
    type: String,
  },
  title: {
    type: String,
  },
  updatedDate: {
    type: String,
  },
  totalAddQuantity: {
    type: Number,
  },
  available: {
    type: Number,
  },
  distributed: {
    type: Number,
  },
  nextShipmentDate: {
    type: Date,
  },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

module.exports = InventoryItem;
