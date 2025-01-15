const express = require('express');
const getArchivedNotes = require('../../controllers/archivedNotesController');

const router = express.Router();

router.get('/', getArchivedNotes);

module.exports = router;