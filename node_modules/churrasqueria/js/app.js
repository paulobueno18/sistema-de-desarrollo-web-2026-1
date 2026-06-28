const MENU = [
  { id:1, name:'Picanha al Carbón', desc:'Exquisito corte con yuca sancochada y ensalada regional.', detail:'Picanha seleccionada, sellada al carbón y servida con salsa de chimichurri y papas crocantes.', ingredients:'Picanha, yuca sancochada, ensalada fresca, chimichurri, sal de mar.', price:45.00, img:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%238B4513%22 width=%22400%22 height=%22300%22/%3E%3Crect fill=%22%23A0522D%22 width=%22300%22 height=%22250%22 x=%2250%22 y=%2225%22 rx=%2210%22/%3E%3Ccircle fill=%22%23D4AF37%22 cx=%22200%22 cy=%22150%22 r=%2240%22/%3E%3Ctext x=%22200%22 y=%22160%22 font-size=%2224%22 fill=%22%23fff%22 text-anchor=%22middle%22 font-family=%22Arial%22%3EPicanha%3C/text%3E%3C/svg%3E' },
  { id:2, name:'Churrasco del Patricio', desc:'El clásico de la casa, jugoso y asado a fuego lento.', detail:'Corte especial curado con hierbas, acompañado de papas rústicas y chimichurri casero.', ingredients:'Corte churrasco, papas rústicas, salsa chimichurri, ensalada de hojas.', price:38.00, img:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23A0522D%22 width=%22400%22 height=%22300%22/%3E%3Crect fill=%22%238B4513%22 width=%22300%22 height=%22250%22 x=%2250%22 y=%2225%22 rx=%2210%22/%3E%3Ccircle fill=%22%23D4AF37%22 cx=%22200%22 cy=%22150%22 r=%2240%22/%3E%3Ctext x=%22200%22 y=%22160%22 font-size=%2224%22 fill=%22%23fff%22 text-anchor=%22middle%22 font-family=%22Arial%22%3EChurrasco%3C/text%3E%3C/svg%3E' },
  { id:3, name:'Lomo Fino Amazónico', desc:'Suave lomo fino con el aroma de la selva.', detail:'Lomo fino marinado, a la brasa con especias amazónicas y guarnición de yuca dorada.', ingredients:'Lomo fino, especias amazónicas, yuca dorada, vegetales salteados.', price:42.00, img:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%238B6F47%22 width=%22400%22 height=%22300%22/%3E%3Crect fill=%22%23704214%22 width=%22300%22 height=%22250%22 x=%2250%22 y=%2225%22 rx=%2210%22/%3E%3Ccircle fill=%22%23D4AF37%22 cx=%22200%22 cy=%22150%22 r=%2240%22/%3E%3Ctext x=%22200%22 y=%22160%22 font-size=%2220%22 fill=%22%23fff%22 text-anchor=%22middle%22 font-family=%22Arial%22%3ELomo Fino%3C/text%3E%3C/svg%3E' },
  { id:4, name:'Costillas al Carbón', desc:'Bañadas en nuestra salsa artesanal secreta.', detail:'Costillas tiernas glaseadas al carbón en una salsa de la casa, con papas y ensalada criolla.', ingredients:'Costillas, salsa BBQ artesanal, papas, ensalada criolla, limón.', price:40.00, img:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23654321%22 width=%22400%22 height=%22300%22/%3E%3Crect fill=%22%23463C20%22 width=%22300%22 height=%22250%22 x=%2250%22 y=%2225%22 rx=%2210%22/%3E%3Ccircle fill=%22%23D4AF37%22 cx=%22200%22 cy=%22150%22 r=%2240%22/%3E%3Ctext x=%22200%22 y=%22160%22 font-size=%2220%22 fill=%22%23fff%22 text-anchor=%22middle%22 font-family=%22Arial%22%3ECostillas%3C/text%3E%3C/svg%3E' },
  { id:5, name:'Gran Mix del Patricio', desc:'Variedad de carnes premium, chorizos artesanales y guarniciones. Para compartir.', detail:'Una parrillada completa con cortes mixtos, chorizos artesanales, yuca y ensaladas para dos o más personas.', ingredients:'Chorizo artesanal, costillas, picanha, ensalada, yuca, salsas.', price:75.00, img:'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23704214%22 width=%22400%22 height=%22300%22/%3E%3Crect fill=%22%238B6F47%22 width=%22300%22 height=%22250%22 x=%2250%22 y=%2225%22 rx=%2210%22/%3E%3Ccircle fill=%22%23D4AF37%22 cx=%22200%22 cy=%22150%22 r=%2240%22/%3E%3Ctext x=%22200%22 y=%22160%22 font-size=%2224%22 fill=%22%23fff%22 text-anchor=%22middle%22 font-family=%22Arial%22%3EGran Mix%3C/text%3E%3C/svg%3E' }
];

const state = { cart: [] };

function $(sel){return document.querySelector(sel)}

function format(n){return n.toFixed(2)}

function renderMenu(){
  const list = $('#menu-list');
  const tpl = document.getElementById('menu-item-tpl');
  MENU.forEach(item=>{
    const frag = tpl.content.cloneNode(true);
    frag.querySelector('.item-name').textContent = item.name;
    frag.querySelector('.item-desc').textContent = item.desc;
    frag.querySelector('.item-price').textContent = format(item.price);
    const img = frag.querySelector('.item-img');
    if(img && item.img) img.src = item.img;
    const addBtn = frag.querySelector('.add');
    const sizeSel = frag.querySelector('.size-select');
    addBtn.addEventListener('click', (e)=>{ e.stopPropagation(); addToCart(item, sizeSel.value); });
    const cardEl = frag.querySelector('.menu-card');
    if(cardEl) cardEl.addEventListener('click', ()=> openDishModal(item));
    list.appendChild(frag);
  })
}

function openDishModal(item){
  const modal = $('#dish-modal');
  if(!modal) return;
  $('#dish-img').src = item.img || '';
  $('#dish-img').alt = item.name;
  $('#dish-name').textContent = item.name;
  $('#dish-desc-full').textContent = item.detail || item.desc || '';
  $('#dish-ingredients').textContent = item.ingredients ? `Ingredientes: ${item.ingredients}` : 'Ingredientes: carne, especias y guarniciones.';
  $('#dish-qty').value = 1;
  $('#dish-size').value = 'regular';
  modal.setAttribute('aria-hidden','false');
  document.getElementById('dish-close').onclick = closeDishModal;
  document.getElementById('dish-add').onclick = ()=>{
    const qty = Number($('#dish-qty').value) || 1;
    const size = $('#dish-size').value;
    for(let i=0;i<qty;i++) addToCart(item, size);
    closeDishModal();
  }
}


function closeDishModal(){
  const modal = $('#dish-modal'); if(!modal) return;
  modal.setAttribute('aria-hidden','true');
}

function addToCart(item, size){
  const extra = size === 'grande' ? 8.00 : 0;
  const price = item.price + extra;
  const existing = state.cart.find(i=>i.id===item.id && i.size===size);
  if(existing){ existing.qty += 1; existing.price = price; }
  else state.cart.push({ id:item.id, name:item.name, size, qty:1, price });
  renderCart();
}

function renderCart(){
  const itemsEl = $('#cart-items'); itemsEl.innerHTML='';
  const countEl = $('#cart-count');
  let total = 0, count=0;
  if(state.cart.length === 0){
    itemsEl.innerHTML = '<div class="cart-empty">Tu carrito está vacío. Agrega un plato para comenzar.</div>';
  } else {
    state.cart.forEach((it, idx)=>{
      const div = document.createElement('div'); div.className='cart-item';
      div.innerHTML = `
        <div class="cart-item-info">
          <span>${it.name}</span>
          <small>${it.size} · ${it.qty} unidad${it.qty === 1 ? '' : 'es'}</small>
        </div>
        <div class="cart-item-actions">
          <span>S/ ${format(it.price * it.qty)}</span>
          <div class="cart-item-buttons">
            <button data-idx="${idx}" class="btn qty-btn" data-action="minus">-</button>
            <button data-idx="${idx}" class="btn qty-btn" data-action="plus">+</button>
            <button data-idx="${idx}" class="btn remove">Eliminar</button>
          </div>
        </div>`;
      itemsEl.appendChild(div);
      total += it.price * it.qty; count += it.qty;
    });
  }
  $('#cart-total').textContent = format(total);
  countEl.textContent = count;
  document.querySelectorAll('.qty-btn').forEach(btn=> btn.addEventListener('click', e=>{
    const i = Number(e.target.dataset.idx);
    if(e.target.dataset.action === 'minus') decrementItem(i);
    else incrementItem(i);
  }));
  document.querySelectorAll('.remove').forEach(btn=> btn.addEventListener('click', e=>{
    const i = Number(e.target.dataset.idx); removeOne(i);
  }));
}

function decrementItem(index){
  const it = state.cart[index];
  if(!it) return;
  it.qty -= 1;
  if(it.qty <= 0) state.cart.splice(index, 1);
  renderCart();
}

function incrementItem(index){
  const it = state.cart[index];
  if(!it) return;
  it.qty += 1;
  renderCart();
}

function removeOne(index){
  const it = state.cart[index];
  if(!it) return;
  it.qty -=1;
  if(it.qty<=0) state.cart.splice(index,1);
  renderCart();
}

function checkout(){
  if(state.cart.length===0){ alert('El carrito está vacío'); return; }
  openCheckoutModal();
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderMenu(); renderCart();
  $('#checkout').addEventListener('click', checkout);
  $('#btn-cart').addEventListener('click', ()=>{
    const modal = $('#cart-modal');
    if(modal) modal.setAttribute('aria-hidden','false');
  });
  const cartClose = document.getElementById('cart-close');
  if(cartClose) cartClose.addEventListener('click', ()=>{
    const modal = $('#cart-modal');
    if(modal) modal.setAttribute('aria-hidden','true');
  });
})

// --- Checkout modal & payment handling ---
function openCheckoutModal(){
  const modal = $('#checkout-modal');
  const summaryEl = $('#modal-summary');
  summaryEl.innerHTML = '';
  state.cart.forEach(it=>{
    const div = document.createElement('div');
    div.textContent = `${it.qty} x ${it.name} (${it.size}) — S/ ${format(it.price*it.qty)}`;
    summaryEl.appendChild(div);
  })
  const total = state.cart.reduce((s,i)=>s+i.price*i.qty,0);
  $('#qr-total').textContent = format(total);
  // Create order on backend to get reference and QR payload. If server unavailable, simulate locally.
  fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cart: state.cart, paymentMethod: 'pending', total: format(total) })
  }).then(r=> r.json()).then(data=>{
    if(data.error){ alert('Error creando orden: ' + data.error); return; }
    state.currentOrderId = data.id;
    $('#bank-ref').textContent = data.ref;
    $('#qr-img').src = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=' + encodeURIComponent(data.qrText);
  }).catch(err=>{
    console.warn('Backend no disponible, se usa simulación local.', err);
    // simulate order locally so UX can continue
    const payload = generatePaymentPayload(total);
    state.currentOrderId = 'local-' + Date.now();
    $('#bank-ref').textContent = payload.ref;
    const qr = generateQRCodeUrl(payload);
    $('#qr-img').src = qr;
  });
  modal.setAttribute('aria-hidden','false');

  // event listeners
  document.getElementById('modal-close').onclick = closeModal;
  document.getElementById('confirm-payment').onclick = confirmPayment;
  document.getElementById('copy-bank').onclick = ()=> copyBankDetails();
  // toggle panels
  document.querySelectorAll('input[name="payment"]').forEach(r=> r.onchange = togglePaymentPanels);
}

function closeModal(){
  const modal = $('#checkout-modal'); modal.setAttribute('aria-hidden','true');
}

function togglePaymentPanels(){
  const val = document.querySelector('input[name="payment"]:checked').value;
  if(val==='qr'){
    $('#payment-qr').classList.remove('hidden');
    $('#payment-bank').classList.add('hidden');
  } else {
    $('#payment-qr').classList.add('hidden');
    $('#payment-bank').classList.remove('hidden');
  }
}

function generatePaymentPayload(total){
  // Simple payload for prototyping: ref + amount + timestamp
  const ref = 'CP-' + Date.now().toString().slice(-6);
  return { ref, total: format(total), name: 'El Rinconcito del Patricio' };
}

function generateQRCodeUrl(payload){
  const text = `TITULAR:${payload.name};REF:${payload.ref};MONTO:${payload.total}`;
  const url = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=' + encodeURIComponent(text);
  return url;
}

function copyBankDetails(){
  const details = `Banco: Banco Ejemplo\nCuenta: 123-456789-0\nTitular: El Rinconcito del Patricio\nReferencia: ${$('#bank-ref').textContent}`;
  navigator.clipboard?.writeText(details).then(()=> alert('Datos copiados al portapapeles'))
}

function confirmPayment(){
  const id = state.currentOrderId;
  if(!id){ alert('Orden no encontrada en el servidor.'); return; }
  fetch('/api/orders/' + id + '/confirm', { method: 'POST' })
    .then(r=> r.json())
    .then(res=>{
      if(res.ok){ alert('Pago confirmado. Gracias por su compra.'); state.cart = []; renderCart(); closeModal(); }
      else alert('No se pudo confirmar el pago');
    }).catch(err=>{ console.error(err); alert('Error al confirmar pago'); });
}

