import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const items = await prisma.menuItem.findMany();
  console.log(items.map((i) => ({
    id: i.id,
    name: i.name,
    imgExists: !!i.img,
    imgLength: i.img ? i.img.length : 0,
    imgPrefix: i.img ? i.img.slice(0, 40) : null,
  })));
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});