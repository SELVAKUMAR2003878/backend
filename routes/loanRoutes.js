const express = require('express');
const Loan = require('../models/Loan');
const router = express.Router();
/* 
// Create a new loan
router.post('/', async (req, res) => {
  try {
    const loan = new Loan(req.body);
    console.log(req.body);
    await loan.save();
    res.status(201).json(loan);
    console.log(req.body);
    console.log(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    let count = loans.length - 1;
    console.log(`COUNT:${count}`);
    res.status(200).json(loans);
    console.log(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 */


// Create a new loan
router.post('/', async (req, res) => {

  try {
    const { name, loanAmount, remainingAmount, dateValue, history } = req.body;

    // Validate that name and loanAmount are not empty
    if (!name || !loanAmount || !remainingAmount) {
      return res.status(400).json({ error: 'Name and loan amount are required' });
    }

    const loan = new Loan({ name, loanAmount, remainingAmount, dateValue, history });
    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get the count of loans
router.get('/count', async (req, res) => {
  try {
    const count = await Loan.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all loans
router.get('/', async (req, res) => {
  try {
    const loans = await Loan.find();
    count = loans.length - 1;
    console.log(`COUNT:${count}`);
    res.status(200).json(loans);
    console.log(loans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a single loan by ID
router.get('/:id', async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.Name);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.status(200).json(loan);
    console.log(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a loan amount by name
router.put('/:name', async (req, res) => {
  try {
    const { remainingAmount, history, dateValue } = req.body;
    console.log(`remainingAmount: ${remainingAmount}`);
    console.log(`history: ${history}`);
    console.log(`dateValue: ${dateValue}`);
    if (remainingAmount == null) {
      return res.status(400).json({ error: 'Remaining amount is required' });
    }

    // Find the loan by name
    const loan = await Loan.findOne({ name: req.params.name.toUpperCase() });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    // Append the new history entry to the existing history
    const updatedHistory = loan.history ? `${loan.history}\n${history}` : history;

    // Update the loan with the new remainingAmount, updatedHistory, and dateValue
    loan.remainingAmount = remainingAmount;
    loan.history = updatedHistory;
    loan.dateValue = dateValue;
    await loan.save();

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete a loan by name
router.delete('/:name', async (req, res) => {
  try {
    const loan = await Loan.findOneAndDelete({ name: req.params.name.toUpperCase() });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
var count = 0;

module.exports = count;

module.exports = router;
