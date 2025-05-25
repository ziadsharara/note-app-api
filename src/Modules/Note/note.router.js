import { Router } from 'express';
import {
  createNote,
  updateNote,
  allNotes,
  userNote,
} from './note.controller.js';

const router = Router();

// create note
router.post('/', createNote);

// update
router.patch('/:id', updateNote);

// all notes
router.get('/', allNotes);

// user notes
router.get('/user/:id', userNote);

export default router;
