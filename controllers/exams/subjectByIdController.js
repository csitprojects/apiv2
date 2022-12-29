const Exam = require('../../models/Exam');

module.exports = function subjectById(req, res){
  try {
    // Find the exam by ID
    const exam = Exam.findById(req.params.examId);

    // If the exam was not found, return a 404 status code with a message
    if (!exam) return res.status(404).send('Exam not found');

    // Find the subject by ID
    const subject = exam.subjects.id(req.params.subjectId);

    // If the subject was not found, return a 404 status code with a message
    if (!subject) return res.status(404).send('Subject not found');

    // Return the subject in the response
    res.json(subject);
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
}
