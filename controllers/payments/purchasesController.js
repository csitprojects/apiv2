const mongoose = require('mongoose');
const User = require("../../models/User");

module.exports = async function purchaseList(req, res) {
  try {
    // Check if the user is a student
    if (req.user.role !== 'student') {
      return res.status(401).send('Unauthorized');
    }

    // Check if the user is the specified student
    if (req.user.id !== req.params.studentId) {
      return res.status(401).send('Unauthorized');
    }

    // Find the student by ID
    const student = await User.findById(req.params.studentId);

    // If the student was not found, return a 404 status code with a message
    if (!student) return res.status(404).send('Student not found');

    // Return the list of purchases in the response
    res.json(student.purchases);
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
}
