// APIs
import { Router } from 'express';
import {
  signup,
  login,
  deleteAccount,
  allUsers,
  profile,
} from './user.controller.js';
import { isAuthenticated } from './../../Middleware/auth.middleware.js';

const router = Router();

// CRUD
// Sign Up
router.post('/signup', signup);

// Login
router.post('/login', login);

// Profile
router.get('/profile', isAuthenticated, profile);

// delete
router.delete('/', isAuthenticated, deleteAccount);

// all users
router.get('/', allUsers);

export default router;
