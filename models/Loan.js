const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  remainingAmount: {
    type: Number,
    required: true
  },
  history: {
    type: String,
    default: ''
  },
  dateValue: {
    type: String,
    required: true
  }
    
});

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;