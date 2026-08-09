import axiosConfig from '../config/axiosConfig';

export const getProducts = async (category = '') => {
  try {
    const response = await axiosConfig.get('/productos');
    let data = response.data;

    if (category && category !== 'todos' && Array.isArray(data)) {
      data = data.filter(item => item.category === category);
    }

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error al conectar con MockAPI:', error);
    return [];
  }
};

export const getProductById = async (id) => {
  const response = await axiosConfig.get(`/productos/${id}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosConfig.post('/productos', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axiosConfig.put(`/productos/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosConfig.delete(`/productos/${id}`);
  return response.data;
};