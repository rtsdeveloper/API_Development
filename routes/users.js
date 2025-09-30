import express from 'express';
import { prisma } from '../lib/prisma.js';
import { authRequired } from '../middleware/auth.js';

const userRoutes = express.Router();

userRoutes.get('/', authRequired, async (req, res) => {
  const super_admin = await prisma.super_admin.findMany();
  const response = super_admin.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt,
  }));
  res.json(response);
});

export default userRoutes;