import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';
import { v4 as UUIDv4 } from 'uuid';

async function main() {
  const prisma = new PrismaClient();

  const passwordHash = await bcrypt.hash('admin123', 12);

  const admin = await prisma.super_admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      id: UUIDv4(),
      email: 'admin@example.com',
      username: 'admin',
      name: 'Admin',
      password: passwordHash,
      role: 'ADMIN',
    },
  });

  console.log('Super admin ready:', admin.id);
  await prisma.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  process.exitCode = 1;
});
