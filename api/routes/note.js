import express from 'express';
import { addNote, allNotes, deleteNote, updateNote } from '../controllers/note.js';
import middleware from '../middleware/middleware.js';



const router = express.Router();



router.post('/add', middleware, addNote);

router.get('/all',middleware, allNotes);
router.put('/update/:id', updateNote);
router.delete('/delete/:id', deleteNote);





export default router;


