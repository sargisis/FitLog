import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (formData) => API.post('/register', formData);
export const loginUser = (formData) => API.post('/login', formData);
export const resetPassword = (formData) => API.post('/reset-password', formData);
export const mealPlan = (formData) => API.post('/meal-plan' , formData) 
export const geminiChat = (formData) => API.post('/gemini-chat' , formData)
