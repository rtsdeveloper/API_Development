import { prisma } from '../models/index.js';

/**
 * User repository - handles direct Prisma queries for user operations
 */

/**
 * Find user by email
 */
export async function findByEmail(email) {
  return await prisma.super_admin.findUnique({
    where: { email }
  });
}

/**
 * Find user by ID
 */
export async function findById(id) {
  return await prisma.super_admin.findUnique({
    where: { id }
  });
}

/**
 * Find user by username
 */
export async function findByUsername(username) {
  return await prisma.super_admin.findUnique({
    where: { username }
  });
}

/**
 * Get all users
 */
export async function findAll() {
  return await prisma.super_admin.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      role: true,
      createdAt: true
    }
  });
}

/**
 * Create new user
 */
export async function create(userData) {
  return await prisma.super_admin.create({
    data: userData,
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      role: true,
      createdAt: true
    }
  });
}

/**
 * Update user by ID
 */
export async function updateById(id, userData) {
  return await prisma.super_admin.update({
    where: { id },
    data: userData,
    select: {
      id: true,
      email: true,
      name: true,
      username: true,
      role: true,
      createdAt: true
    }
  });
}

/**
 * Delete user by ID
 */
export async function deleteById(id) {
  return await prisma.super_admin.delete({
    where: { id }
  });
}
