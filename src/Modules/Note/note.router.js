import { Router } from 'express';
import {
  createNote,
  updateNote,
  allNotes,
  userNote,
} from './note.controller.js';
import { isAuthenticated } from './../../Middleware/auth.middleware.js';

const router = Router();

// create note
router.post('/', isAuthenticated, createNote);

// update
router.patch('/:id', isAuthenticated, updateNote);

// all notes
router.get('/', allNotes);

// user notes
router.get('/user/:id', userNote);

export default router;
