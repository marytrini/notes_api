const {Router} = require('express');
const activeNotesRouter = require('./active/activeNotesRouter');
const archivedNotesRouter = require('./archived/archivedNotesRouter');
const notesRouter = require('./notes/notesRouter');

const router = Router();

router.use('/notes',notesRouter);
router.use('/archived', archivedNotesRouter);
router.use('/active', activeNotesRouter)

module.exports = router;