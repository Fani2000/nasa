const mongoose = require('mongoose')

const CustomersModelSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('customer', CustomersModelSchema);
