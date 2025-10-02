import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as UserRepository from '../repositories/userRepository.js';

/**
 * User service - handles business logic for user operations
 */

/**
 * Authenticate user login
 */
export async function authenticateUser(email, password) {
  try {
    const user = await UserRepository.findByEmail(email);
    
    if (!user || !user.password) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        sub: user.id, 
        email: user.email, 
        role: user.role || 'ADMIN' 
      },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    // Return user data without password
    const { password: _, ...userData } = user;

    return {
      user: userData,
      token
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Get all users
 */
export async function getAllUsers() {
  try {
    return await UserRepository.findAll();
  } catch (error) {
    throw error;
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id) {
  try {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
}

/**
 * Create new user
 */
export async function createUser(userData) {
  try {
    // Check if user already exists
    const existingUser = await UserRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Check if username already exists
    if (userData.username) {
      const existingUsername = await UserRepository.findByUsername(userData.username);
      if (existingUsername) {
        throw new Error('Username already taken');
      }
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12);
    }

    return await UserRepository.create(userData);
  } catch (error) {
    throw error;
  }
}

/**
 * Update user
 */
export async function updateUser(id, userData) {
  try {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12);
    }

    return await UserRepository.updateById(id, userData);
  } catch (error) {
    throw error;
  }
}

/**
 * Delete user
 */
export async function deleteUser(id) {
  try {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return await UserRepository.deleteById(id);
  } catch (error) {
    throw error;
  }
}
