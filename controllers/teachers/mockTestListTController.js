const mongoose = require("mongoose");
const Exam = require("../../models/Exam");

async function mockTestListT(req, res) {
  try {
    // Find all exams in the database
    const exams = await Exam.find({});

    // Initialize an empty array to store the mock tests
    const mockTests = [];

    // Iterate over the exams
    for (const exam of exams) {
      // Iterate over the subjects in the exam
      for (const subject of exam.subjects) {
        // Iterate over the chapters in the subject
        for (const chapter of subject.chapters) {
          // Iterate over the mock tests in the chapter
          for (const mockTest of chapter.mockTests) {
            // If the mock test was authored by the specified teacher, add it to the array
            if (mockTest.author.toString() === req.params.teacherId) {
              mockTests.push(mockTest);
            }
          }
        }
      }
    }

    // Return the mock tests in the response
    res.json(mockTests);
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
}

module.exports = mockTestListT;
