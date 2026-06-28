const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'orders.json');
function loadOrders(){
  try{ return JSON.parse(fs.readFileSync(DATA_FILE,'utf8')) }catch(e){ return [] }
}
function saveOrders(orders){ fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2)) }

// Creacion de la order
app.post('/api/orders', (req,res)=>{
  const { cart, paymentMethod, total } = req.body;
  if(!cart || !cart.length) return res.status(400).json({ error: 'Carrito vacío' });
  const orders = loadOrders();
  const id = Date.now().toString();
  const ref = 'CP-' + id.slice(-6);
  const order = { id, ref, cart, total, paymentMethod, status: 'pending', created: new Date().toISOString() };
  orders.push(order);
  saveOrders(orders);
  const qrText = `TITULAR:Churrasquería La Parrilla;REF:${ref};MONTO:${total}`;
  res.json({ id, ref, qrText, total });
});

// Confirmacion del pago
app.post('/api/orders/:id/confirm', (req,res)=>{
  const { id } = req.params;
  const orders = loadOrders();
  const order = orders.find(o => o.id === id);
  if(!order) return res.status(404).json({ error: 'Orden no encontrada' });
  order.status = 'paid';
  order.paidAt = new Date().toISOString();
  saveOrders(orders);
  res.json({ ok: true });
});

// Get para las ordenes (optional)
app.get('/api/orders/:id', (req,res)=>{
  const { id } = req.params;
  const orders = loadOrders();
  const order = orders.find(o => o.id === id);
  if(!order) return res.status(404).json({ error: 'Orden no encontrada' });
  res.json(order);
});

// Serve frontend (parent folder)
app.use(express.static(path.join(__dirname, '..')));

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Server listening on http://localhost:${port}`));
