import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { authRequired } from '../middlewares/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authRequired);

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get user by ID
router.get('/:id', getUserById);

// POST /users - Create new user
router.post('/', createUser);

// PUT /users/:id - Update user
router.put('/:id', updateUser);

// DELETE /users/:id - Delete user
router.delete('/:id', deleteUser);

export default router;
