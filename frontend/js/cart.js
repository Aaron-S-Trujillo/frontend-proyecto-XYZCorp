// /frontend/js/cart.js
const API_ORDERS = '/api/orders';

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  if (!cart.length) { container.innerHTML = '<p>El carrito está vacío</p>'; document.getElementById('cart-summary').innerHTML=''; return; }
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `<div style="flex:1">${item.nombre}</div><div>Cantidad: ${item.cantidad}</div><div>Precio: $${item.precio_unitario}</div>`;
    container.appendChild(row);
  });
  const total = cart.reduce((s,i)=>s + i.cantidad * i.precio_unitario, 0);
  document.getElementById('cart-summary').innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

document.getElementById('checkout-btn')?.addEventListener('click', async ()=>{
  const token = localStorage.getItem('token');
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  if (!cart.length) { alert('Carrito vacío'); return; }
  const items = cart.map(i=>({ producto_id: i.producto_id, cantidad: i.cantidad, precio_unitario: i.precio_unitario }));
  const total = cart.reduce((s,i)=>s + i.cantidad * i.precio_unitario, 0);
  try {
    const res = await fetch(API_ORDERS, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', ...(token?{ Authorization: 'Bearer ' + token }:{}) },
      body: JSON.stringify({ items, total })
    });
    const data = await res.json();
    if (res.ok) {
      alert('Pedido creado. ID: ' + data.pedidoId);
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    } else {
      alert(data.message || 'Error creando pedido');
    }
  } catch (err) {
    console.error(err);
    alert('Error en red');
  }
});

document.addEventListener('DOMContentLoaded', renderCart);
