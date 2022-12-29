const Exam = require('../../models/Exam');

module.exports = function examsList(req, res) {
  try {
    // Find all exams in the database
    const exams = Exam.find();

    // Return the exams in the response
    res.json(exams);
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
};
