import * as UserService from '../services/userService.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * User controller - handles HTTP requests and responses
 */

/**
 * Login user
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const result = await UserService.authenticateUser(email, password);
    return successResponse(res, result, 'Login successful');
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, error.message, 401);
  }
}

/**
 * Get all users
 */
export async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    return successResponse(res, users, 'Users retrieved successfully');
  } catch (error) {
    console.error('Get users error:', error);
    return errorResponse(res, 'Failed to retrieve users', 500);
  }
}

/**
 * Get user by ID
 */
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    return successResponse(res, user, 'User retrieved successfully');
  } catch (error) {
    console.error('Get user error:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, 404);
    }
    return errorResponse(res, 'Failed to retrieve user', 500);
  }
}

/**
 * Create new user
 */
export async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await UserService.createUser(userData);
    return successResponse(res, user, 'User created successfully', 201);
  } catch (error) {
    console.error('Create user error:', error);
    if (error.message.includes('already exists') || error.message.includes('already taken')) {
      return errorResponse(res, error.message, 409);
    }
    return errorResponse(res, 'Failed to create user', 500);
  }
}

/**
 * Update user
 */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userData = req.body;
    const user = await UserService.updateUser(id, userData);
    return successResponse(res, user, 'User updated successfully');
  } catch (error) {
    console.error('Update user error:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, 404);
    }
    return errorResponse(res, 'Failed to update user', 500);
  }
}

/**
 * Delete user
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    return successResponse(res, null, 'User deleted successfully');
  } catch (error) {
    console.error('Delete user error:', error);
    if (error.message === 'User not found') {
      return errorResponse(res, error.message, 404);
    }
    return errorResponse(res, 'Failed to delete user', 500);
  }
}
