import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Backend de la churrasquería funcionando' });
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const passwordOk = await new Promise((resolve, reject) => {
    bcrypt.compare(password, admin.password, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

  if (!passwordOk) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token, admin: { id: admin.id, email: admin.email } });
});

app.post('/api/reservations', async (req, res) => {
  const { name, phone, date, time, guests } = req.body;

  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const reservation = await prisma.reservation.create({
    data: { name, phone, date, time, guests: Number(guests) }
  });

  res.status(201).json(reservation);
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  try {
    const token = authHeader.split(' ')[1];
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

app.get('/api/admin/reservations', authMiddleware, async (req, res) => {
  const reservations = await prisma.reservation.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(reservations);
});

app.get('/api/menu', async (req, res) => {
  const items = await prisma.menuItem.findMany({ orderBy: { id: 'asc' } });
  res.json(items);
});

app.patch('/api/admin/menu/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  if (price == null || isNaN(Number(price))) {
    return res.status(400).json({ message: 'Precio inválido' });
  }

  const menuItem = await prisma.menuItem.update({
    where: { id: Number(id) },
    data: { price: Number(price) }
  });

  res.json(menuItem);
});

app.post('/api/orders', async (req, res) => {
  const { customer, phone, delivery, total, items } = req.body;

  const order = await prisma.order.create({
    data: {
      customer,
      phone,
      delivery,
      total: Number(total),
      items: JSON.stringify(items)
    }
  });

  res.status(201).json(order);
});

app.get('/api/admin/orders', authMiddleware, async (req, res) => {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
