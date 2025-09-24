import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/products';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchProducts = () =>
  axios.get(BASE_URL, getAuthHeader()).then(res => res.data);

export const fetchProductById = (id) =>
  axios.get(`${BASE_URL}/${id}`, getAuthHeader()).then(res => res.data);

export const createProduct = (product) =>
  axios.post(BASE_URL, product, getAuthHeader()).then(res => res.data);

export const updateProduct = (id, product) =>
  axios.put(`${BASE_URL}/${id}`, product, getAuthHeader()).then(res => res.data);

export const deleteProduct = (id) =>
  axios.delete(`${BASE_URL}/${id}`, getAuthHeader()).then(res => res.data);
