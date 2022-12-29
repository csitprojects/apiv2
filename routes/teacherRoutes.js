const express = require("express");
const router = express.Router();

const mockTestCreate = require('../controllers/teachers/mockTestCreateController');
const mockTestDelete = require('../controllers/teachers/mockTestDeleteController');
const mockTestListT = require('../controllers/teachers/mockTestListTController');
const mockTestEdit  = require('../controllers/teachers/mockTestEditController');

// GET route for retrieving the mock tests authored by a specific teacher
router.get('/teachers/:teacherId/mock-tests', mockTestListT);
router.post('/teachers/:teacherId/mock-tests/create', mockTestCreate);
router.patch('/teachers/:teacherId/mock-tests/:mockTestId/edit', mockTestEdit);
router.delete('/teachers/:teacherId/mock-tests/:mockTestId/delete', mockTestDelete );
module.exports = router;