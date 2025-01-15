const express = require('express');
const getActiveNotes = require('../../controllers/activeNotesController');

const router = express.Router();

router.get('/', getActiveNotes);


module.exports = router;