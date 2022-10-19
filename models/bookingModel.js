const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    flight: {
      type: mongoose.Schema.ObjectId,
      ref: "flights",
      require: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      require: true,
    },
  
    transactionId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bookings", bookingSchema);