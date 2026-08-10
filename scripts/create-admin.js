import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const admins = await prisma.admin.findMany();
  console.log('admins:', admins);

  if (admins.length === 0) {
    const hashed = await bcrypt.hash('Admin1234!', 10);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@churrasqueria.com',
        password: hashed,
      },
    });
    console.log('created admin:', { id: admin.id, email: admin.email });
  } else {
    console.log('admin user already exists.');
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
