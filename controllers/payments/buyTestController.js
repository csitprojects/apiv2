const mongoose = require("mongoose");
const Exam = require("../../models/Exam");
const User = require("../../models/User");

module.exports = async function buyTest(req, res) {
  try {
    // Check if the user is a student
    if (req.user.role !== 'student') {
      return res.status(401).send('Unauthorized');
    }

    // Check if the user is the specified student
    if (req.user.id !== req.params.studentId) {
      return res.status(401).send('Unauthorized');
    }

    // Validate the request body
    if (!req.body.examId || !req.body.subjectId || !req.body.chapterId) {
      return res.status(400).send('Invalid request body');
    }

    // Find the exam by ID
    const exam = await Exam.findById(req.body.examId);

    // If the exam was not found, return a 404 status code with a message
    if (!exam) return res.status(404).send('Exam not found');

    // Find the subject by ID
    const subject = exam.subjects.id(req.body.subjectId);

    // If the subject was not found, return a 404 status code with a message
    if (!subject) return res.status(404).send('Subject not found');

    // Find the chapter by ID
    const chapter = subject.chapters.id(req.body.chapterId);

    // If the chapter was not found, return a 404 status code with a message
    if (!chapter) return res.status(404).send('Chapter not found');

    // Find the mock test by ID
    const mockTest = chapter.mockTests.id(req.params.mockTestId);

    // If the mock test was not found, return a 404 status code with a message
    if (!mockTest) return res.status(404).send('Mock test not found');

    // Find the student by ID
    const student = await User.findById(req.params.studentId);

    // If the student was not found, return a 404 status code with a message
    if (!student) return res.status(404).send('Student not found');

    // Check if the student has already purchased the mock test
    if (student.purchases.some((purchase) => purchase.mockTest.toString() === req.params.mockTestId)) {
      return res.status(400).send('Mock test already purchased');
    }

    // Add the mock test to the student's purchases
    student.purchases.push({ mockTest: req.params.mockTestId });

    // Save the student to the database
    await student.save();

    // Return the updated student in the response
    res.json(student);
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
};
