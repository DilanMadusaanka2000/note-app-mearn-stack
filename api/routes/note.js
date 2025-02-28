import express from 'express';
import { addNote, allNotes } from '../controllers/note.js';
import middleware from '../middleware/middleware.js';



const router = express.Router();



router.post('/add', middleware, addNote);

router.get('/all', allNotes);




export default router;

