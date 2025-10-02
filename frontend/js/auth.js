// /frontend/js/auth.js
const API_AUTH = '/api/auth';

// login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch(API_AUTH + '/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login exitoso');
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Error en login');
      }
    } catch(err){ console.error(err); alert('Error en red'); }
  });
}

// register
const regForm = document.getElementById('register-form');
if (regForm) {
  regForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const res = await fetch(API_AUTH + '/register', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ nombre, email, password }) });
      const data = await res.json();
      if (res.ok) {
        alert('Cuenta creada. Inicia sesión.');
        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Error en registro');
      }
    } catch(err){ console.error(err); alert('Error en red'); }
  });
}
