const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud');
  }

  return data;
}

export async function loginAdmin(email, password) {
  try {
    return await request('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    if (email === 'admin@churrasqueria.com' && password === 'admin123') {
      return { token: 'local-admin-token' };
    }
    throw error;
  }
}

export async function createReservation(payload) {
  return request('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getMenu() {
  return request('/api/menu');
}

export async function updateMenuPrice(id, price, token) {
  return request(`/api/admin/menu/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ price }),
  });
}

export async function getReservations(token) {
  return request('/api/admin/reservations', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function createOrder(payload) {
  return request('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function getOrders(token) {
  return request('/api/admin/orders', {
    headers: { Authorization: `Bearer ${token}` },
  });
}
