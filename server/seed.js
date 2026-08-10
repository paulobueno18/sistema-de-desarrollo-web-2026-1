import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash('admin123', 10, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  });

  await prisma.admin.upsert({
    where: { email: 'admin@churrasqueria.com' },
    update: {},
    create: {
      email: 'admin@churrasqueria.com',
      password: hashedPassword,
    },
  });

  const menuItems = [
    {
      name: 'Picanha al Carbón',
      desc: 'Exquisito corte con yuca sancochada y ensalada regional.',
      detail: 'Picanha seleccionada, sellada al carbón y servida con salsa de chimichurri y papas crocantes.',
      ingredients: 'Picanha, yuca sancochada, ensalada fresca, chimichurri, sal de mar.',
      price: 45,
      img: '/images/picanha.jpg'
    },
    {
      name: 'Churrasco del Patricio',
      desc: 'El clásico de la casa, jugoso y asado a fuego lento.',
      detail: 'Corte especial curado con hierbas, acompañado de papas rústicas y chimichurri casero.',
      ingredients: 'Corte churrasco, papas rústicas, salsa chimichurri, ensalada de hojas.',
      price: 38,
      img: '/images/churrasco.jpg'
    },
    {
      name: 'Lomo Fino Amazónico',
      desc: 'Suave lomo fino con el aroma de la selva.',
      detail: 'Lomo fino marinado, a la brasa con especias amazónicas y guarnición de yuca dorada.',
      ingredients: 'Lomo fino, especias amazónicas, yuca dorada, vegetales salteados.',
      price: 42,
      img: '/images/lomo-fino.jpg'
    },
    {
      name: 'Costillas al Carbón',
      desc: 'Bañadas en nuestra salsa artesanal secreta.',
      detail: 'Costillas tiernas glaseadas al carbón en una salsa de la casa, con papas y ensalada criolla.',
      ingredients: 'Costillas, salsa BBQ artesanal, papas, ensalada criolla, limón.',
      price: 40,
      img: '/images/costillas.jpg'
    },
    {
      name: 'Gran Mix del Patricio',
      desc: 'Variedad de carnes premium, chorizos artesanales y guarniciones. Para compartir.',
      detail: 'Una parrillada completa con cortes mixtos, chorizos artesanales, yuca y ensaladas para dos o más personas.',
      ingredients: 'Chorizo artesanal, costillas, picanha, ensalada, yuca, salsas.',
      price: 75,
      img: '/images/gran-mix.jpg'
    }
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { name: item.name },
      update: { price: item.price, desc: item.desc, detail: item.detail, ingredients: item.ingredients, img: item.img },
      create: item,
    });
  }

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
