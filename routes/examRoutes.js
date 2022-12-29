

const express = require('express');
const router  = express.Router();

// requires for chapters
const examsList = require('../controllers/exams/examsController');
const examsById = require('../controllers/exams/examByIdController');
const subjectList = require('../controllers/exams/subjectListController');
const subjectById = require('../controllers/exams/subjectByIdController');
const chapterList = require("../controllers/exams/chapterListController");
const chapterById = require('../controllers/exams/chapterByIdController');

// requires for mock-tests
const mocktestList = require('../controllers/mock-tests/mocktestListController');
const mocktestById = require('../controllers/mock-tests/mocktestByIdController');
const mocktestSubmit = require('../controllers/mock-tests/mocktestSubmitController');
const mocktestResult = require('../controllers/mock-tests/mocktestResultController');  
const mocktestLeaderBoard = require('../controllers/mock-tests/mocktestLeaderBoardController');

//upto chapter routes
router.get('/exams', examsList);
router.get('/exams/:examId', examsById)
router.get('/exams/:examId/subjects', subjectList)
router.get('/exams/:examId/subjects/:subjectId', subjectById)
router.get('/exams/:examId/subjects/:subjectId/chapters',chapterList)  
router.get('/exams/:examId/subjects/:subjectId/chapters/:chapterId', chapterById) 


//mocktests routes
router.get('/exams/:examId/subjects/:subjectId/chapters/:chapterId/mock-tests',  mocktestList) 
router.get('/exams/:examId/subjects/:subjectId/chapters/:chapterId/mock-tests/:mocktestId', mocktestById) 
router.get('/exams/:examId/subjects/:subjectId/chapters/:chapterId/mock-tests/:mocktestId/submit', mocktestSubmit) 
router.get('/exams/:examId/subjects/:subjectId/chapters/:chapterId/mock-tests/:mocktestId/result', mocktestResult) 
router.get('/exams/:examId/subjects/:subjectId/chapters/:chapterId/mock-tests/:mocktestId/leaderboard', mocktestLeaderBoard) 

//payment
//router.post('/:examId/subjects/:subjectId/chapters/:chapterId/mock-tests/:mockTestId/purchase',mockPurchase)




module.exports = router;
