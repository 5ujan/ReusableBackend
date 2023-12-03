const mongoose = require('mongoose')

const PaidJobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: 10,
    maxlength: 40,
  },
  desc: {
    type: String,
    required: [true, "Description required"],
  },
  createdBy: {
    type: String,
    required: true,
  },
  pay: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  assignedTo: {
    type: String,
    required: false
  },
  applications: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model('PaidJob', PaidJobSchema)