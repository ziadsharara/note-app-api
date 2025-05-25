// APIs
import { Router } from 'express';
import { signup, login, deleteAccount, allUsers } from './user.controller.js';
const router = Router();

// CRUD
// Sign Up
router.post('/signup', signup);

// Login
router.post('/login', login);

// delete
router.delete('/:email', deleteAccount);

// all users
router.get('/', allUsers);

export default router;
