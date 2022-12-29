
const Exam = require("../../models/Exam");

module.exports = async function mocktestResult(req, res) {
  try {
    const examId = req.params.examId;
    const subjectId = req.params.subjectId;
    const chapterId = req.params.chapterId;
    const mockTestId = req.params.mockTestId;
    const exam = await Exam.findById(examId);
    const subjects = exam.subjects;
    const subject = subjects.find(subject => subject._id == subjectId);
    if (!subject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    const chapters = subject.chapters;
    const chapter = chapters.find(chapter => chapter._id == chapterId);
    if (!chapter) {
      res.status(404).json({ message: 'Chapter not found' });
      return;
    }
    const mockTests = chapter.mockTests;
    const mockTest = mockTests.find(mockTest => mockTest._id == mockTestId);
    if (!mockTest) {
      res.status(404).json({ message: 'Mock test not found' });
      return;
    }
    const result = mockTest.result;
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
