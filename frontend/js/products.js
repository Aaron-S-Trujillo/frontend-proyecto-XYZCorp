const API = 'http://localhost:3000/api/products';

async function loadProducts() {
  try {
    const res = await fetch(API);
    const products = await res.json();
    const container = document.getElementById('products');
    container.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${p.imagen || 'https://via.placeholder.com/300x150'}" alt="${p.nombre}" />
        <h3>${p.nombre}</h3>
        <p>${p.descripcion || ''}</p>
        <div class="price">$${p.precio}</div>
        <div><button class="button" data-id="${p.id}">Agregar al carrito</button></div>
      `;
      container.appendChild(card);
    });
    document.querySelectorAll('.button').forEach(btn => btn.addEventListener('click', addToCart));
  } catch (err) {
    console.error(err);
  }
}

function addToCart(e) {
  const id = Number(e.currentTarget.dataset.id);
  // find product from DOM card (simpler: fetch product details)
  fetch(`${API}/${id}`).then(r=>r.json()).then(p=>{
    let cart = JSON.parse(localStorage.getItem('cart')||'[]');
    const existing = cart.find(i=>i.producto_id===p.id);
    if (existing) existing.cantidad += 1; else cart.push({producto_id: p.id, nombre: p.nombre, cantidad:1, precio_unitario: p.precio});
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.reduce((s,i)=>s+i.cantidad,0);
    alert('Producto agregado al carrito');
  });
}

document.addEventListener('DOMContentLoaded', loadProducts);
