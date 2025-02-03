import axios from "axios";

const API_URL = "https://django-blogapp-kna4.onrender.com";

export const register = (userData) => axios.post(`${API_URL}/register/`, userData);
export const login = (userData) => axios.post(`${API_URL}/login/`, userData);
export const getPosts = (token) => axios.get(`${API_URL}/posts/`, { headers: { Authorization: `Token ${token}` } });
export const createPost = (post, token) =>
    axios.post(`${API_URL}/posts/`, post, { headers: { Authorization: `Token ${token}` } });
export const updatePost = (postId, post, token) =>
    axios.put(`${API_URL}/posts/${postId}/`, post, { headers: { Authorization: `Token ${token}` } });
export const deletePost = (postId, token) =>
    axios.delete(`${API_URL}/posts/${postId}/`, { headers: { Authorization: `Token ${token}` } });
