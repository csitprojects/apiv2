

const mongoose = require("mongoose");
const Exam = require("../../models/Exam");

async function mocktestDelete(req, res) {
  try {
    // Check if the user is a teacher
    if (req.user.role !== "teacher") {
      return res.status(401).send("Unauthorized");
    }

    // Check if the user is the specified teacher
    if (req.user.id !== req.params.teacherId) {
      return res.status(401).send("Unauthorized");
    }

    // Find the exam by ID
    const exam = await Exam.findById(req.body.examId);

    // If the exam was not found, return a 404 status code with a message
    if (!exam) return res.status(404).send("Exam not found");

    // Find the subject by ID
    const subject = exam.subjects.id(req.body.subjectId);

    // If the subject was not found, return a 404 status code with a message
    if (!subject) return res.status(404).send("Subject not found");

    // Find the chapter by ID
    const chapter = subject.chapters.id(req.body.chapterId);

    // If the chapter was not found, return a 404 status code with a message
    if (!chapter) return res.status(404).send("Chapter not found");

    // Find the mock test by ID
    const mockTest = chapter.mockTests.id(req.params.mockTestId);

    // If the mock test was not found, return a 404 status code with a message
    if (!mockTest) return res.status(404).send("Mock test not found");

    // If the mock test was not authored by the specified teacher, return a 401 status code with a message
    if (mockTest.author.toString() !== req.params.teacherId) {
      return res.status(401).send("Unauthorized");
    }

    // Remove the mock test from the chapter
    chapter.mockTests.pull(mockTest);

    // Save the exam to the database
    await exam.save();

    // Return a 200 status code with a message
    res.send("Mock test successfully deleted");
  } catch (err) {
    // If there is an error, return a 500 status code with the error message
    res.status(500).send(err.message);
  }
}

module.exports = mocktestDelete;
